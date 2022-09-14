# 💻 Mediator/Middleware

## 기본 개념

- Mediator(중재자)패턴은 컴포넌트들이 서로 직접 통신하는 대신 `중재자` 역할을 하는 객체를 통하도록 한다.
- 중재자 객체가 요청을 받아 이를 필요로 하는 객체들에게 전달하는 것이다. 중재자는 보통 객체나 함수로 구현된다.
- 해당 패턴은 공항에서 비행기의 동선을 관리하는 관제소에 비교할 수 있다. 비행기끼리 직접 통신하면 사고로 이어질 수 있겠지만 관제소에서 사오항을 전달받아 통제를 하게 되면 서로 충돌 없이 안전하게 활주로를 이용할 수 있게된다.

![스크린샷 2022-09-14 오후 5 47 26](https://user-images.githubusercontent.com/64779472/190107279-45adbd2d-3c22-43d6-b9ee-2fa657abce95.png)

- 자바스크립트 비행기를 조종할 일은 없겠지만, 종종 여러 객체들이 서로 데이터를 주고 받는 상황이 생기곤한다. 위 이미지처럼 컴포넌트가 많아질수록 통신의 횟수는 많아지며 점점 흐름을 파악하기 어려워 질 것이다.

![스크린샷 2022-09-14 오후 5 48 38](https://user-images.githubusercontent.com/64779472/190107569-64ec8bb7-e9ab-4519-9f82-3f20c22e87f3.png)

- 하지만, 객체끼리 서로 통신하게 하여 `다대다 관계`를 이루게 하는 대신, 위 이미지처럼 객체의 요청들을 모두 `Mediator(중재자)`에게 보낸다.
- Mediator(중재자)는 이런 요청들을 처리하여 이를 필요로 하는 객체에게 전달한다.

<br />

## 사용 사례와 예시 (1)

- 실무에서 이 Mediator(중재자) 패턴이 적합한 곳은 `채팅`을 구현할 때이다.
- 채팅 앱에서 사용자는 메시지를 직접 서로 주고 받지 않는다. 그 대신 `채팅 서버`에 메시지를 전송하고 서버가 각 사용자에게 메시지를 전달하는 형태이다.

```ts
class ChatRoom {
  logMessage(user: User, message: string) {
    const sender = user.getName();

    return `[${sender}]: ${message}`;
  }
}

class User {
  name: string;
  chatroom: ChatRoom;

  constructor(name: string, chatroom: ChatRoom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message: string) {
    return this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("Minjae", chatroom);
const user2 = new User("Gromit", chatroom);

user1.send("Hi there!");
user2.send("Hey!");

export { User, ChatRoom };
```

- 위 예제에서 사용자는 `ChatRoom`과 연결되는 `User`를 만들어 낼 수 있고, 각 인스턴스는 `send` 메서드를 통해 다른 사용자에게 메시지를 전송한다.

<br />

## 사용 사례와 예시 (2)

- `Express.js`는 많이 사용하는 웹 서버 프레임워크이다. 특정 라우팅 경로에 대해 콜백을 추가함으로써 요청을 처리할 수 있다.
- `/`경로로 요청했을 대 요청에 헤더를 추가해야 한다고 가정해보자. 아래와 같이 `미들웨어`를 추가하여 처리할 수 있다.

```js
const app = require("express")();

app.use("/", (req, res, next) => {
  req.headers["test-header"] = 1234;
  next();
});
```

- 위 예제에서 `next` 함수는 `요청-응답 사이클`에 걸려있는 다음 콜백을 호출한다. 즉, 아래 그림과 같이 같이 요청-응답 사이에 `콜백 체인`을 추가할 수 있다.

![스크린샷 2022-09-14 오후 8 16 38](https://user-images.githubusercontent.com/64779472/190139770-378c92d9-a73b-4f76-95e1-64457137cd55.png)

- 아래 예제는 헤더가 잘 추가되었는지 검사하는 미들웨어도 추가하였다. 이는 이전 콜백의 변경 사항을 다음 콜백에서 확인할 수 있게 한 것이다.
- 즉, 엔드포인트 `/`가 호출될 때마다 `두 개의 미들웨어 콜백이 실행`되는 것이다.
- 이러한 미들웨어 패턴은 여러 객체 간 `다대다의 통신`을 하나의 `관리 포인트(Mediator)`를 통하도록 만들어 관계를 단순하게 만들어준다.

```js
const app = require("express")();
const html = require("./data");

// 미들웨어
app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
});

app.listen(8080, function () {
  console.log("Server is running on 8080");
});
```

<br />

## 테스트

```ts
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
```
