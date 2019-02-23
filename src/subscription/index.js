import { PubSub } from 'apollo-server'

import * as DEPARTMENT_EVENTS from './department'

export const EVENTS = {
  DEPARTMENT: DEPARTMENT_EVENTS
}

export default new PubSub()
