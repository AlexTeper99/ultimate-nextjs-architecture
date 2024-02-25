"use server";
export const fetchExtraInfo = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Extra info");
    }, 1000);
  });
};
