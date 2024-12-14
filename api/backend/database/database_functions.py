# STL
import uuid
from typing import Any, Union, Literal, Optional

# PDM
import motor.motor_asyncio
from bson import CodecOptions, InvalidDocument
from fastapi.responses import JSONResponse
from typing_extensions import override
from bson.codec_options import TypeEncoder, TypeRegistry

# LOCAL
from api.backend.models import Job
from api.backend.configs.schema import Arg, Command


class CommandEncoder(TypeEncoder):
    @override
    def transform_python(self, value: Any):
        if isinstance(value, Command):
            return {"name": value.name, "command": value.name, "args": value.args}

        raise InvalidDocument(f"Cannot encode object: {value}, of type: {type(value)}")

    @property
    @override
    def python_type(self):
        return Command


class ArgEncoder(TypeEncoder):
    @override
    def transform_python(self, value: Any):
        if isinstance(value, Arg):
            return {"flag": value.flag, "value": value.value}

        raise InvalidDocument(f"Cannot encode object: {value}, of type: {type(value)}")

    @property
    @override
    def python_type(self):
        return Arg


command_encoder = CommandEncoder()
arg_encoder = ArgEncoder()
codec_options: CodecOptions[dict[str, Any]] = CodecOptions(
    type_registry=TypeRegistry([command_encoder, arg_encoder])
)


async def get_client():
    client: motor.motor_asyncio.AsyncIOMotorClient[dict[str, Any]] = (
        motor.motor_asyncio.AsyncIOMotorClient(
            "mongodb://root:example@manager-mongo:27017"
        )
    )
    return client


async def get_job_collection():
    client = await get_client()
    db = client["manager"].with_options(codec_options=codec_options)
    collection = db["jobs"]
    return collection


async def insert_job(job: Job):
    collection = await get_job_collection()
    dict_job = dict(job)
    dict_job.update(
        {
            "id": uuid.uuid4().hex,
            "commands": [dict(command) for command in dict_job["commands"]],
        }
    )
    _ = collection.insert_one(dict_job)


async def get_queued_job():
    collection = await get_job_collection()
    return await collection.find_one({"status": "queued"}, sort=[("time_created", 1)])


async def update_job_status(
    id: str,
    status: Union[Literal["queued"], Literal["done"], Literal["running"]],
):
    collection = await get_job_collection()

    _ = await collection.update_one({"id": id}, {"$set": {"status": status}})


async def update_job(
    id: str,
    command_name: str,
    output: Optional[dict[str, Any]] = None,
):
    collection = await get_job_collection()

    _ = await collection.update_one(
        {"id": id, "output": None}, {"$set": {"output": {}}}
    )
    result = await collection.update_one(
        {"id": id}, {"$set": {f"output.{command_name}": output}}
    )

    if result.modified_count == 0:
        raise Exception(f"Job with id {id} was not updated.")

    return {"status": "success"}


async def retrieve_jobs(host: str):
    collection = await get_job_collection()
    jobs: list[Job] = []

    async for job in collection.find({"host": host}):
        job_model = Job(
            id=job["id"],
            host=job["host"],
            status=job["status"],
            time_created=job["time_created"],
            commands=job["commands"],
            output=job["output"],
        )
        jobs.append(job_model)

    jobs_as_dicts = [
        {
            **job.model_dump(),
            "time_created": job.time_created.strftime("%B %d, %H:%M:%S %Y"),
        }
        for job in jobs
    ]

    return JSONResponse(content={"jobs": jobs_as_dicts})


async def delete_job(id: str):
    collection = await get_job_collection()
    print(f"Deleting job with id: {id}")
    _ = await collection.delete_many({"id": id})
