import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/not_found";
import { UseCaseError } from "@/core/errors/use-case-error";
import { NoteRepository } from "../repository/note-repository";

interface UpdateNoteDTO {
	color?: number;
	fav?: boolean;
	id: string;
}

type UpdateNoteResponse = Promise<Either<UseCaseError, null>>;

export class UpdateNote {
	constructor(private noteRepository: NoteRepository) {}
	async execute({ id, fav, color }: UpdateNoteDTO): UpdateNoteResponse {
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
		await this.noteRepository.save(note);
		return right(null);
	}
}
