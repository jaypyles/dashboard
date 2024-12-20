# STL
from pytask.job import Job
from pytask.worker import Worker

# LOCAL
from api.backend.host_manager import HOST_MAP
from api.backend.command_queue import COMMAND_QUEUE
import logging

logger = logging.getLogger(__name__)


def worker_function(job: Job):
    print(f"Running job {job.task_id}", flush=True)
    host = HOST_MAP[job.data["host"]]
    command = job.data["commands"][0]
    stdout, stderr = host.runner.dispatch(command["name"])
    job.data["output"][command["name"]] = {"stdout": stdout, "stderr": stderr}


def main():
    print("Starting Worker...", flush=True)
    worker = Worker(COMMAND_QUEUE, worker_function, logger=logger)
    worker.run()


if __name__ == "__main__":
    main()
