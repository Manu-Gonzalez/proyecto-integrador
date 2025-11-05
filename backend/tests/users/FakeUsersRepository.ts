import { randomUUID } from "crypto";
import { TestUser } from "./TestUser";

type TestUserCreate = Omit<TestUser, "id" | "createdAt">;

export class FakeUsersRepository {
  private users: TestUser[];

  constructor(users?: TestUser[]) {
    this.users = users ?? [];
  }

  getByUsername(username: string) {
    return Promise.resolve(
      this.users.find((user) => user.username === username)
    );
  }

  create(user: TestUserCreate) {
    const newUser = {
      ...user,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }
}
