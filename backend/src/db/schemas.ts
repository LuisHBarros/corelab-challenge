import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	session_id: text("session_id").notNull(),
	created_at: timestamp("created_at").notNull()
});

export const note = pgTable("note", {
	id: text("id").notNull().primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	fav: boolean("fav").notNull(),
	color: integer("color").notNull(),
	file: text("file"),
	created_at: timestamp("created_at").notNull(),
	user_id: text("user_id").references(() => user.id)
});

// Definindo as relações
export const userRelations = relations(user, ({ many }) => ({
	notes: many(note)
}));

export const noteRelations = relations(note, ({ one }) => ({
	user: one(user)
}));
