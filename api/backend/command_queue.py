from pytask import Queue, SQLDataType, SQLColumnConditions

COMMAND_QUEUE = Queue(
    [
        ("host", SQLDataType.TEXT, [SQLColumnConditions.NOT_NULL]),
        ("commands", SQLDataType.JSON, [SQLColumnConditions.NOT_NULL]),
        ("output", SQLDataType.JSON, []),
    ],
    path="./data/jobs.db",
)
