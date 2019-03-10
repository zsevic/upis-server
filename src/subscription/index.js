import { PubSub } from 'apollo-server'

import * as FACULTY_EVENTS from './faculty'

export const EVENTS = {
  FACULTY: FACULTY_EVENTS
}

export default new PubSub()
