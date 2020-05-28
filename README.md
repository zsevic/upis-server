# upis-server

> GraphQL API for [Upis](https://github.com/zsevic/upis)

See demo: [https://upis.herokuapp.com/graphql](https://upis.herokuapp.com/graphql)

## Features

- GraphQL queries, mutations and subscriptions
- Node.js with Express and Apollo Server
  - cursor-based pagination
- PostgreSQL database with Sequelize
  - entities: users, faculties, departments
- Authentication
  - powered by JWT
  - sign in
- Authorization
  - protected endpoint (verify valid session)
  - protected resolvers (session-based, permission-based, role-based)
- Performance optimizations
  - Batching
- API testing
- Eslint setup
- Git hooks for commit

### Setup

```bash
git clone https://github.com/zsevic/upis-server
cd upis-server
cp .env.sample .env # change values
npm i
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Testing

```bash
npm test
```

### Documentation

- `npm run dev`
- open [http://localhost:8080/graphql](http://localhost:8080/graphql) and click on `schema`

### Technologies used

- Node.js, Express, Apollo, PostgreSQL
