import axios from "axios";
import { setupCache, buildWebStorage } from "axios-cache-interceptor";
import { AddCommand, Config } from "./types";
import { AxiosCacheInstance } from "axios-cache-interceptor";
export const apiGet = async (url: string, options?: object) => {
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

export const fetchAndSet = async (
  url: string,
  setter: (arg: any) => void,
  axios?: AxiosCacheInstance
) => {
  if (axios) {
    const response = await axios.get(url);
    setter(response.data);
    return;
  }

  const response = await fetch(url);
  const json = await response.json();
  setter(json);
};

export const fetchAndSetWithPayload = async (
  url: string,
  setter: (arg: any) => void,
  payload: any,
  axios?: AxiosCacheInstance
) => {
  if (axios) {
    const response = await axios.get(url);
    setter(response.data);
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json();
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

export const createClientSideCacheApi = (name?: string) => {
  let cacheName = "axios-cache:";

  if (name) {
    cacheName = `${name}-${cacheName} `;
  }

  return setupCache(
    axios.create({
      baseURL: `/api`,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    {
      ttl: 30 * 1000,
      storage: buildWebStorage(localStorage, cacheName),
    }
  );
};
