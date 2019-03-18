import { expect } from 'chai'

import * as userApi from './api'
import { createUsersWithFaculties } from '../src/helpers/seed'

describe('users', () => {
  before(async () => {
    await createUsersWithFaculties(new Date())
  })

  describe('user(id: String!): User', () => {
    it('should return a user if user is found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'user1',
            email: 'user1@users.com',
            role: 'ADMIN'
          }
        }
      }

      const result = await userApi.user({ id: '1' })

      expect(result.body).to.eql(expectedResult)
    })

    it('should return null if user is not found', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      }

      const result = await userApi.user({ id: '42' })

      expect(result.body).to.eql(expectedResult)
    })
  })

  describe('deleteUser(id: String!): Boolean!', () => {
    it('should return an error because only admins can delete a user', async () => {
      const {
        body: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'user2',
        password: 'userresu'
      })

      const {
        body: { errors }
      } = await userApi.deleteUser({ id: '1' }, token)

      // FIX
      expect(errors[0].message).to.eql('Not authenticated as user.')
    })
  })
})
