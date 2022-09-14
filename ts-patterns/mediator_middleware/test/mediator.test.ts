import { ChatRoom, User } from "../mediator";

describe("mediator 단위 테스트", () => {
  test("채팅방 테스트", () => {
    const chatroom = new ChatRoom();
    const user1 = new User("Gromit", chatroom);
    const user2 = new User("Minjae", chatroom);

    expect(user1.send("Hi Minjae!")).toBe("[Gromit]: Hi Minjae!");
    expect(user2.send("Hi Gromit!")).toBe("[Minjae]: Hi Gromit!");
  });
});
