import { AddCommand, Config } from "./types";

export const fetchAndSet = async (url: string, setter: (arg: any) => void) => {
  const response = await fetch(url);
  const json = await response.json();
  setter(json);
};

export const fetchAndSetWithPayload = async (
  url: string,
  setter: (arg: any) => void,
  payload: any,
) => {
  console.log(payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json();
  console.log(json);
  setter(json);
};

export const getCommandQueue = async (host: string) => {
  const response = await fetch(`/api/${host}/command/command-queue`);
  const json = await response.json();
  return json["jobs"];
};

export const getConfigForPublicUse = async (host: string) => {
  const response = await fetch(`/api/config/${host}`);
  const json = await response.json();
  return json;
};

export const editOrMakeConifg = async (body: Config) => {
  const response = await fetch(`/api/config/edit`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};

export const addCommand = async (body: AddCommand) => {
  const response = await fetch(`/api/config/add-command`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};

export const deleteCommand = async (body: AddCommand) => {
  const response = await fetch(`/api/config/delete-command`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};

export const deleteJob = async (host: string, id: string) => {
  const response = await fetch(`/api/${host}/job/${id}`, {
    method: "DELETE",
  });
  const json = await response.json();
  return json;
};

export const getContainerCount = async (host: string) => {
  const response = await fetch(`/api/${host}/docker/containers`);
  const json = await response.json();
  return json;
};
