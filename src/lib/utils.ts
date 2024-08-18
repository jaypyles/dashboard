export const fetchAndSet = async (url: string, setter: (arg: any) => void) => {
  const response = await fetch(url);
  const json = await response.json();
  setter(json);
};
