export const fetchAndSet = async (url: string, setter: (arg: any) => void) => {
  const response = await fetch(url);
  const json = await response.json();
  setter(json);
};

export const fetchAndSetWithPayload = async (
  url: string,
  setter: (arg: any) => void,
  payload: any
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
