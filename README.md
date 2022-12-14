# 💻 Modern Patterns(JS)

![스크린샷 2022-08-25 오후 4 50 45](https://user-images.githubusercontent.com/64779472/186607176-4e221e21-3988-4fb4-ae15-7f5c71e0a0ab.png)

- 해당 저장소는 단순히 [patterns (번역 사이트)](https://patterns-dev-kr.github.io/) 사이트를 보며 예제를 `타입스크립트`와 `테스트(Jest)`를 직접 연습해본 레포입니다.
- [patterns (원본 사이트)](https://www.patterns.dev/)를 번역하고 정리해주신 [johnny kim](https://github.com/johnny-mh)님께 감사를 표합니다. 🙇🏻‍♂️
- 타입스크립트로 작성 된 테스트 코드 및 예제 코드에서 잘못된 부분 혹은 더 좋은 코드가 있다면 언제든 `Pull Request` 또는 `issue`로 전달해주시면 검토 후에 수정하도록 하겠습니다.

<br />

## 📁 폴더 구조

- ts-patterns: 리액트가 아닌 단순 `TypeScript`만 이용해서 디자인 패턴을 연습한 폴더입니다.
  - singleton: singleton 패턴 관련 폴더
  - proxy: proxy 패턴 관련 폴더
  - prototype: prototype 패턴 관련 폴더
- app: `리액트 + TypeScript`을 이용해서 디자인 패턴을 연습한 폴더입니다.
  - pages
    - Observer: Observer 패턴 관련 폴더
  - test-utils: 테스트를 위한 Custom Render Utils 폴더

<br />

## 🚀 디자인 패턴이란?

- 디자인 패턴은 소프트웨어를 개발하는 과정의 `반복되는 일반적인 문제들에 대해 기준이 되는 해결책`을 제공하는 중요한 개념이다. 디자인패턴은 소프트웨어의 특정 구현을 직접 제공하지는 않지만, 반복되는 문제 상황들을 최적화된 방법으로 해결하도록 돕는 컨셉들이다.
- 지난 몇 년간 웹 개발 생태계는 빠르게 변화했다. 잘 알려진 디자인패턴 중에서도 일부는 쓸모가 예전만 하지는 않지만 다른 일부는 최신 기술들과 함께 현 시대의 문제를 해결할 수 있을 만큼 발전했다.
- 페이스북의 React는 지난 5년간 엄청난 관심을 받으며 Angular, Vue, Ember, Svelte를 제치고 npm 에서 제일 많이 다운로드된 프레임웍으로 기록되어 있다. React의 인기 덕분에 디자인패턴 또한 수정되고 최적화되고, 새로 만들어지며 현대 웹 개발 생태계에 새로운 가치를 만들어냈다. React는 최신 버전에서 애플리케이션의 디자인에 중요한 역할을 하고 과거 디자인 패턴을 대체할 수 있는 `Hooks`를 소개했다.
- 현대 웹 개발은 다양한 패턴으로 발전하고 있다. 이 프로젝트는 ES2015이상 혹은 React에서 쓰이는 일반적인 디자인 패턴들의 구현, 장점 및 단점과 주의사항에 대해 다루고, 그 외에도 여러분의 웹 앱을 발전시킬 수 있는 다른 여러 패턴들에 대해서도 다룬다.

<br />

## 📃 문서 목록

### React 🙅‍♂️

- [Singleton 패턴](https://github.com/ssi02014/modern-patterns/tree/master/ts-patterns/singleton)
- [Proxy 패턴](https://github.com/ssi02014/modern-patterns/tree/master/ts-patterns/proxy)
- [Prototype 패턴](https://github.com/ssi02014/modern-patterns/tree/master/ts-patterns/prototype)
- [Mixin 패턴](https://github.com/ssi02014/modern-patterns/tree/master/ts-patterns/mixin)
- [Mediator(중재자)/Middleware 패턴](https://github.com/ssi02014/modern-patterns/tree/master/ts-patterns/mediator_middleware)

### React 🙆‍♂️

- [Observer 패턴](https://github.com/ssi02014/modern-patterns/tree/master/app/src/pages/Observer)

<br />
