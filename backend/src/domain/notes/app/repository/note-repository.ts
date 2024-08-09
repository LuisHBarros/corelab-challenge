import { Note } from "../../entities/note";

export interface NoteRepository {
	findById(id: string): Promise<Note | null>;
	findByUserId(userId: string): Promise<Note[]>;
	findByTitle(title: string): Promise<Note | null>;
	save(note: Note): Promise<void>;
	update(note: Note): Promise<void>;
	remove(note: Note): Promise<void>;
}
