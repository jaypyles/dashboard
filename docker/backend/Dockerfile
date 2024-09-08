# Build python dependencies
FROM python:3.10-slim AS pybuilder

WORKDIR /project

RUN apt update && apt install -y uvicorn docker.io
RUN python -m pip --no-cache-dir install pdm
RUN pdm config python.use_venv false

COPY pyproject.toml pdm.lock /project/
COPY ./api /project/api/

RUN pdm install

# Create final image
FROM jpyles0524/doppler-python

RUN apt update && apt install -y ssh

WORKDIR /project

COPY --from=pybuilder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=pybuilder /project/ /project/
COPY --from=pybuilder /usr/local/bin /usr/local/bin

EXPOSE 8000

ARG DOPPLER_TOKEN

CMD ["doppler", "run", "-t", "$DOPPLER_TOKEN", "--", "pdm", "run", "python", "-m", "uvicorn", "api.backend.app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
