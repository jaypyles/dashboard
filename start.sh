#! /bin/bash

APP_LEVEL=$APP_LEVEL

if [ "$APP_LEVEL" == "PROD" ]; then
    export FRONTEND_COMMAND="npm run start"
    export BACKEND_COMMAND="pdm run python -m uvicorn api.backend.app:app --host 0.0.0.0 --port 8000
"
else
    export FRONTEND_COMMAND="npm run dev"
    export BACKEND_COMMAND="pdm run python -m uvicorn api.backend.app:app --reload --host 0.0.0.0 --port 8000"
fi

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf
