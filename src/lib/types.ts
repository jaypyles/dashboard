export type Host = {
  name: string;
};

export type Arg = {
  flag: string;
  value?: string;
};

export type CommandOutput = {
  stderr: string;
  stdout: string;
};

export type Command = {
  id?: string;
  name: string;
  command: string;
  args: Arg[];
  type: string;
  status?: string;
  result?: CommandOutput;
};

export type QueuedCommand = {
  id?: string;
  host: string;
  commands: Command[];
  status: "queued" | "running" | "done";
  time_created: string;
  output: Map<string, CommandOutput>;
};

export type Config = {
  host: {
    name: string;
    port: number;
    hostname: string;
    username: string;
    password: string;
  };
  commands: Command[];
};

export type AddCommand = {
  host: string;
  command: Command;
};
