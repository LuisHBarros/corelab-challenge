import api from "../axios";

export async function createUser() {
  const response = await api.post("/user").catch((error) => {
    console.error(error);
  });
  return response || {};
}
