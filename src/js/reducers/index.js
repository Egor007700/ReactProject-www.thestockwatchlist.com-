import {combineReducers} from 'redux'
import common from './common'
import user from './user'
import chart from './chart'

export default combineReducers({
  common,
  user,
  chart,
})

