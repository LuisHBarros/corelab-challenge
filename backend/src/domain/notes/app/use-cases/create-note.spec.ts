import { FakeNoteRepository } from "@/test/fake-repositories/fake-note-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateNote } from "./create-note";
import { NoteFactory } from "@/test/factory/note-factory";

describe("Test createNote use case", () => {
	let noteRepository: FakeNoteRepository;
	let sut: CreateNote;
	beforeEach(() => {
		noteRepository = new FakeNoteRepository();
		sut = new CreateNote(noteRepository);
	});
	it("should return a note", async () => {
		const response = await sut.execute({
			title: "title",
			description: "description",
			fav: false,
			color: 1,
			file: "file",
			user_id: "user_id"
		});
		expect(response.isRight()).toBe(true);
	});
	it("should not create a note if already exists one with the same title", async () => {
		const note = NoteFactory();
		noteRepository.save(note);
		const response = await sut.execute({
			title: note.title,
			description: "description",
			fav: false,
			color: 1,
			file: "file",
			user_id: "user_id"
		});
		expect(response.isLeft()).toBe(true);
	});
});
