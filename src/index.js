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

export const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const eraseDatabaseOnSync = process.env.NODE_ENV === 'development'
const isTest = !!process.env.TEST_DB
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8080
const force = isTest || isProduction || eraseDatabaseOnSync

sequelize.sync({ force }).then(async () => {
  if (force) {
    createUsersWithFaculties(new Date())
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
})

const createUsersWithFaculties = async date => {
  await models.User.create(
    {
      username: 'user1',
      email: 'user1@users.com',
      password: 'userresu',
      role: 'ADMIN',
      faculty: {
        name: 'Faculty of Mathematics',
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Mathematics',
            total: 250,
            budget: 205,
            selfFinancing: 45
          },
          {
            name: 'Computer science',
            total: 160,
            budget: 105,
            selfFinancing: 55
          },
          {
            name: 'Astronomy and astrophysics',
            total: 25,
            budget: 20,
            selfFinancing: 5
          }
        ]
      }
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [
            {
              model: models.Department,
              as: 'departments'
            }
          ]
        }
      ]
    }
  )

  await models.User.create(
    {
      username: 'user2',
      email: 'user2@users.com',
      password: 'userresu',
      faculty: {
        name: 'School of Electrical Engineering',
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Electrical engineering and computer science',
            total: 500,
            budget: 400,
            selfFinancing: 100
          },
          {
            name: 'Software engineering',
            total: 175,
            budget: 30,
            selfFinancing: 145
          }
        ]
      }
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [{ model: models.Department, as: 'departments' }]
        }
      ]
    }
  )

  await models.User.create(
    {
      username: 'user3',
      email: 'user3@users.com',
      password: 'userresu',
      role: 'ADMIN',
      faculty: {
        name: 'Faculty of Organizational Sciences',
        createdAt: date.setSeconds(date.getSeconds() + 1),
        departments: [
          {
            name: 'Information systems and technology',
            total: 390,
            budget: 190,
            selfFinancing: 200
          },
          {
            name: 'Management and organization',
            total: 330,
            budget: 190,
            selfFinancing: 140
          },
          {
            name: 'Information systems and technology - distance studies',
            total: 100,
            budget: 5,
            selfFinancing: 95
          }
        ]
      }
    },
    {
      include: [
        {
          model: models.Faculty,
          as: 'faculty',
          include: [
            {
              model: models.Department,
              as: 'departments'
            }
          ]
        }
      ]
    }
  )
}
