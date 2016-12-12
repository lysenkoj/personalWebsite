import { combineReducers } from 'redux'
import {
  START_GAME,
  SCORE
} from '../actions.jsx';

const initialGameState = {
    isPlaying: false,
    score: 0
}

export const gameReducer = (state = initialGameState, action) => {
  switch(action.type) {
    case START_GAME:
      return Object.assign({}, state, {isPLaying: action.isPlaying})
    case SCORE:
      return Object.assign({}, state, {score: action.score})
    default:
    return state;
  }
}

const rootReducer = combineReducers({
  game: gameReducer
})

export default rootReducer
