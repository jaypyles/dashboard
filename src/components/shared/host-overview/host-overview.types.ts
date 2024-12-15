export type Storage = {
  mountedOn: string;
  size: string;
  used: string;
  available: string;
  usePercent: number;
};

export type HostStatistics = {
  storage: Storage[];
  usage: number;
  cores: string;
  threads: string;
  uptime: string;
  ram_usage: string;
};
