export interface Note {
  id: string;
  title: string;
  description: string;
  fav: boolean;
  color: number;
  file: string | null;
  user_id: string;
}

export interface User {
  session_id: string;
  user_id: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface FileUploadResponse {
  message: string;
}
