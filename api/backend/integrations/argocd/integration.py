import requests
from typing import Any

from api.backend.integrations.integration import INTEGRATIONS

argocd_integration = next(
    (integration for integration in INTEGRATIONS if integration.name == "argocd"),
    None,
)


def get_auth_token() -> str:
    assert argocd_integration is not None

    payload = {
        "username": argocd_integration.config["username"],
        "password": argocd_integration.config["password"],
    }

    response = requests.post(
        f"{argocd_integration.config['url']}/api/v1/session", json=payload
    )

    return response.json()["token"]


def get_applications() -> list[dict[str, Any]]:
    assert argocd_integration is not None

    response = requests.get(
        f"{argocd_integration.config['url']}/api/v1/applications",
        headers={"Authorization": f"Bearer {get_auth_token()}"},
    )

    return response.json()["items"]


def format_application_data(application: dict[str, Any]) -> dict[str, Any]:
    metadata = application["metadata"]
    status = application["status"]

    return {
        "name": metadata["name"],
        "status": status["sync"]["status"],
    }


def get_argocd_data() -> list[dict[str, Any]]:
    applications = get_applications()

    return [format_application_data(application) for application in applications]
