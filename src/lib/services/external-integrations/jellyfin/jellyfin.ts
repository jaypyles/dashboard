import { getCounts, getSessions } from "./integration";

const Jellyfin = {
  sessions: getSessions,
  counts: getCounts,
};

export default Jellyfin;
