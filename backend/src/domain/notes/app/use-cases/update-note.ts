import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { NoteRepository } from "../repository/note-repository";
import { Note } from "../../entities/note";

interface UpdateNoteDTO {
	color?: number;
	fav?: boolean;
	id: string;
	file?: string;
}

type UpdateNoteResponse = Promise<Either<UseCaseError, Note>>;

export class UpdateNote {
	constructor(private noteRepository: NoteRepository) {}
	async execute({ id, fav, color, file }: UpdateNoteDTO): UpdateNoteResponse {
		const note = await this.noteRepository.findById(id);
		if (!note) {
			return left(new ResourceNotFoundError("Note not found"));
		}

		if (fav !== undefined) {
			note.fav = fav;
		}
		if (color !== undefined) {
			note.color = color;
		}
		if (file !== undefined) {
			note.file = file;
		}
		await this.noteRepository.update(note);

		return right(note);
	}
}
