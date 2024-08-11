import { z } from "zod";

export const CreateNoteSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	fav: z.boolean(),
	color: z.number(),
	file: z.string().nullable(),
	user_id: z.string().uuid("Invalid user ID format")
});

export const UpdateNoteSchema = CreateNoteSchema.extend({
	id: z.string().uuid("Invalid note ID format")
});

export const NoteIdSchema = z.object({
	id: z.string().uuid("Invalid note ID format")
});

export const UserIdSchema = z.object({
	user_id: z.string().uuid("Invalid user ID format")
});

export const fileUploadSchema = z.object({
	filename: z.string().min(1, "Filename is required"),
	mimetype: z.enum([
		"image/jpeg",
		"image/png",
		"text/plain", // Para arquivos .txt
		"application/pdf" // Para arquivos .pdf
	])
});
