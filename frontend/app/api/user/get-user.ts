import api from "../axios";

export async function getUser(session_id: string) {
  const response = await api
    .get(`/user?sessionId=${session_id}`)
    .catch((error) => {
      console.error(error);
    });
  return response || {};
}
