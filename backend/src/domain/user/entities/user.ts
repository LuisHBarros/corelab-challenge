import { Entity } from "@/core/entity";

export interface UserProps {
	session_id: string;
}

export class User extends Entity<UserProps> {
	public get sessionId(): string {
		return this.props.session_id;
	}

	public static create(props: UserProps): User {
		return new User(props);
	}
}
