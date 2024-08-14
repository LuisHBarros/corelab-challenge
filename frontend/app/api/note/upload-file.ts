import { FileUploadResponse } from "@/app/@types/types";
import api from "../axios";

export async function uploadFile(
  formData: FormData
): Promise<FileUploadResponse> {
  try {
    const response = await api.post<FileUploadResponse>(
      "/notes/file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    throw error;
  }
}
