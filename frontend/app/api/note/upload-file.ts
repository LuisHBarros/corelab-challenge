import { FileUploadResponse } from "@/app/@types/types";
import FormData from "form-data";
import fs from "fs";
import api from "../axios";

export async function uploadFile(
  filePath: string
): Promise<FileUploadResponse> {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  try {
    const response = await api.post<FileUploadResponse>("/notes/file", form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    throw error;
  }
}
