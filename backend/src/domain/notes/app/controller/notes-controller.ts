import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DrizzleNoteRepository } from "../repository/drizzle/note-repository";
import { CreateNote } from "../use-cases/create-note";
import { DeleteNote } from "../use-cases/delete-note";
import { GetNote } from "../use-cases/get-note";
import { GetNoteByUser } from "../use-cases/get-note-by-user";
import { UpdateNote } from "../use-cases/update-note";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import {
	CreateNoteSchema,
	UpdateNoteSchema,
	NoteIdSchema,
	UserIdSchema,
	fileUploadSchema
} from "./validations-schemas";
import path from "path";
import fs from "fs";
import { pipeline } from "stream/promises";
import { Note } from "../../entities/note";

export class NotesController {
	// Initialize repositories and use cases
	noteRepository = new DrizzleNoteRepository();
	createNote = new CreateNote(this.noteRepository);
	getNotes = new GetNote(this.noteRepository);
	getNoteByUser = new GetNoteByUser(this.noteRepository);
	updateNote = new UpdateNote(this.noteRepository);
	deleteNote = new DeleteNote(this.noteRepository);

	// Create a new note
	async create(
		req: FastifyRequest<{ Body: z.infer<typeof CreateNoteSchema> }>,
		reply: FastifyReply
	) {
		// Validate request body
		const validationResult = CreateNoteSchema.safeParse(req.body);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Execute use case and respond accordingly
		const response = await this.createNote.execute(req.body);
		if (response.isLeft()) {
			return reply.status(400).send(response.value);
		}
		return reply.status(201).send(response.value as Note);
	}

	// Get a note by ID
	async get(
		req: FastifyRequest<{ Params: z.infer<typeof NoteIdSchema> }>,
		reply: FastifyReply
	) {
		// Validate request parameters
		const validationResult = NoteIdSchema.safeParse(req.params);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Execute use case and respond accordingly
		const response = await this.getNotes.execute({ id: req.params.id });
		if (response.isLeft()) {
			return reply.status(404).send(response.value);
		}
		return reply.status(200).send(response.value as Note);
	}

	// Get notes by user ID
	async getByUser(
		req: FastifyRequest<{ Params: z.infer<typeof UserIdSchema> }>,
		reply: FastifyReply
	) {
		// Validate request parameters
		const validationResult = UserIdSchema.safeParse(req.params);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Execute use case and respond accordingly
		const response = await this.getNoteByUser.execute({
			user_id: req.params.user_id
		});
		if (response.isLeft()) {
			return reply.status(404).send(response.value);
		}
		return reply.status(200).send(response.value);
	}

	// Update a note
	async update(
		req: FastifyRequest<{ Body: z.infer<typeof UpdateNoteSchema> }>,
		reply: FastifyReply
	) {
		// Validate request body
		const validationResult = UpdateNoteSchema.safeParse(req.body);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Execute use case and respond accordingly
		const response = await this.updateNote.execute({
			id: req.body.id,
			fav: req.body.fav,
			color: req.body.color,
			file: req.body.file || undefined
		});
		if (response.isLeft()) {
			return reply.status(404).send(response.value);
		}
		return reply.status(200).send(response.value);
	}

	// Delete a note
	async delete(
		req: FastifyRequest<{ Params: z.infer<typeof NoteIdSchema> }>,
		reply: FastifyReply
	) {
		// Validate request parameters
		const validationResult = NoteIdSchema.safeParse(req.params);
		if (!validationResult.success) {
			return reply.status(400).send(validationResult.error.errors);
		}

		// Execute use case and respond accordingly
		const response = await this.deleteNote.execute({ id: req.params.id });
		if (response.isLeft()) {
			return reply.status(404).send(response.value);
		}
		return reply.status(204).send();
	}

	// Handle file upload
	async uploadFile(req: FastifyRequest, reply: FastifyReply) {
		// @ts-expect-error - This is a workaround to get the __dirname variable
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);
		const data = await req.file();
		if (!data) {
			return reply.status(400).send({ message: "No file uploaded" });
		}

		// Validate the uploaded file using Zod
		try {
			fileUploadSchema.parse({
				filename: data.filename,
				mimetype: data.mimetype
			});
		} catch (error) {
			return reply.status(400).send({ message: "Invalid file upload", error });
		}

		// Generate a unique filename and save the file
		const filename = new Date().getTime() + data.filename;
		const filePath = join(__dirname, "../../../../../uploads", filename);
		await pipeline(data.file, fs.createWriteStream(filePath));

		return reply
			.status(200)
			.send({ message: "File uploaded successfully " + filePath });
	}

	// Retrieve a file
	async getFile(
		req: FastifyRequest<{ Params: { filename: string } }>,
		reply: FastifyReply
	) {
		const filename = req.params.filename;

		// Log filename for debugging
		console.log("Received filename:", filename);

		if (!filename) {
			return reply.status(400).send({ message: "Filename is required" });
		}

		// Determine file path and validate existence
		const filePath = path.join(
			"/home/luis/documents/corelab-challenge/backend/uploads",
			filename
		);

		if (!fs.existsSync(filePath)) {
			return reply.status(404).send({ message: "File not found" });
		}

		// Set appropriate content type based on file extension
		const ext = path.extname(filename).toLowerCase();
		let contentType = "application/octet-stream";
		if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
		if (ext === ".png") contentType = "image/png";
		if (ext === ".gif") contentType = "image/gif";

		reply.header("Content-Type", contentType);
		reply.status(200);
		reply.send(fs.createReadStream(filePath));
	}
}
