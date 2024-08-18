export type Host = {
  name: string;
};

export type Arg = {
  flag: string;
  value?: string;
};

export type Command = {
  name: string;
  command: string;
  args: Arg[];
  type: string;
};
