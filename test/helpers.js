import request from 'supertest'
import app from '../src/index'

global.api = request(app)
