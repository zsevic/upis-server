import http from 'http'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import DataLoader from 'dataloader'
import 'dotenv/config'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'

const app = express()

app.use(cors())

// console.log(process.env.SECRET)

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      }
    }

    if (req) {
      const me = await getMe(req)

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      }
    }
  }
})

server.applyMiddleware({
  app,
  path: '/graphql'
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

// const eraseDatabaseOnSync = true
const isTest = !!process.env.TEST_DB
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8080

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsersWithMessages(new Date())
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:{port}/graphql`)
  })
})

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'user1',
      email: 'user1@users.com',
      password: 'userresu',
      role: 'ADMIN',
      messages: [
        {
          text: 'message1',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  )

  await models.User.create(
    {
      username: 'user2',
      email: 'user2@users.com',
      password: 'userresu',
      messages: [
        {
          text: 'message2',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: 'message3',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  )
}
