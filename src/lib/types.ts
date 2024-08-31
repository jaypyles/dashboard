export type Host = {
  name: string;
};

export type Arg = {
  flag: string;
  value?: string;
};

type CommandOutput = {
  stderr: string;
  stdout: string;
};

export type Command = {
  name: string;
  command: string;
  args: Arg[];
  type: string;
  status: string;
  result?: CommandOutput;
};

export type QueuedCommand = {
  host: string;
  commands: Command[];
  status: "queued" | "running" | "done";
  time_created: string;
  output: Map<string, CommandOutput>;
};
