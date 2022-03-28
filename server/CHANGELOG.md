# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.5](https://github.com/samuelsilvadev/auth-with-graphql/compare/server@v0.0.4...server@v0.0.5) (2022-03-28)

### Features

- **server:** validate if email already exists before sign up ([365f872](https://github.com/samuelsilvadev/auth-with-graphql/commit/365f8724bbbb62a73f8441af3b9c8777e32d7985))

### [0.0.4](https://github.com/samuelsilvadev/auth-with-graphql/compare/server@v0.0.3...server@v0.0.4) (2022-03-22)

### Features

- **server:** create sign up mutation ([6c09418](https://github.com/samuelsilvadev/auth-with-graphql/commit/6c09418c6fe15167d949791505a31aa722efe2a0))
- **server:** improve error handling when user is not valid ([46b0dfb](https://github.com/samuelsilvadev/auth-with-graphql/commit/46b0dfb400b2c4f07e93d9f9e819f4c16ee3012a))

### Bug Fixes

- **server:** always sign out from the last active session ([8063a3a](https://github.com/samuelsilvadev/auth-with-graphql/commit/8063a3a092dc5a508790ed5c75670ea84a482dac))
- **server:** compare `validUntil` from session with `now` time` ([e38ffee](https://github.com/samuelsilvadev/auth-with-graphql/commit/e38ffee12a88121b8fba36620ed80d74c6ff797e))

### [0.0.3](https://github.com/samuelsilvadev/auth-with-graphql/compare/server@v0.0.2...server@v0.0.3) (2022-03-18)

### Bug Fixes

- **server:** always get last attempt of user session to validate if a session is still valid ([b791fea](https://github.com/samuelsilvadev/auth-with-graphql/commit/b791fea3a7f4cc12705ad8c05ea05bd4eefd304a))

### [0.0.2](https://github.com/samuelsilvadev/auth-with-graphql/compare/server@v0.0.1...server@v0.0.2) (2022-03-14)

### Features

- **server:** create `signIn` mutation ([bbece86](https://github.com/samuelsilvadev/auth-with-graphql/commit/bbece8630e2cf436df7427e217b1223ac0f504d0))
- **server:** create `signOut` mutation ([4893b89](https://github.com/samuelsilvadev/auth-with-graphql/commit/4893b89f3f64a8aa33dc83eff69631a61a54131f))
- **server:** create query to get logged user ([debc4f2](https://github.com/samuelsilvadev/auth-with-graphql/commit/debc4f28793b03f0a48a614b8023fb97976ec777))
- **server:** hash password to avoid having plain password saved ([615fa45](https://github.com/samuelsilvadev/auth-with-graphql/commit/615fa45677a396518b0d91d2b5eaa165902f9c98))

### 0.0.1 (2022-03-13)

### Features

- **server:** create get user by id query ([103a388](https://github.com/samuelsilvadev/auth-with-graphql/commit/103a388f173be6d706fda4fbb2c4ff41177d6887))
- **server:** create mutation to save user ([0e33750](https://github.com/samuelsilvadev/auth-with-graphql/commit/0e33750587162a8dd69679ecef1f42f632332475))
