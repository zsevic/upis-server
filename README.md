# graphql-pgsql-starter

> modular GraphQL boilerplate powered by Node.js, Express, Apollo Server and PostgreSQL

### :sparkles: Features

- GraphQL queries, mutations and subscriptions
- Node.js with Express and Apollo Server
  - cursor-based pagination
- PostgreSQL database with Sequelize
  - entities: users, messages
- Authentication
  - powered by JWT
  - sign up, sign in
- Authorization
  - protected endpoint (verify valid session)
  - protected resolvers (session-based, permission-based, role-based)
- Performance optimizations
  - Batching
- E2E testing
- Git hooks for commit

### :wrench: Setup

```bash
git clone https://github.com/zsevic/graphql-starter
cp .env.sample .env # change values
npm i
npm test
npm start
```

### :books: Documentation

- `npm start`
- open [http://localhost:8080/graphql](http://localhost:8080/graphql) and click on `schema`
