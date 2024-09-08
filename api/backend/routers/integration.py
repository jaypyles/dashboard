# STL
import logging

# PDM
from fastapi import APIRouter

# LOCAL
from api.backend.constants import KUMA_SITES
from api.backend.integrations import get_uptime

LOG = logging.getLogger(__name__)

integration_router = APIRouter()

@integration_router.get('/api/integrations/uptime')
async def get_site_uptime():
    return {val: get_uptime(key) for key, val in KUMA_SITES.items()}

