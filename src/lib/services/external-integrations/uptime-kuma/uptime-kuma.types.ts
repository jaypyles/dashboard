export type Status = {
  msg: string;
  ping: number;
};

export type UptimeKumaData = {
  uptime: { [key: string]: Status };
};
