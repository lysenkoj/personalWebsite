export const START_GAME = "START_GAME";
export const SCORE = "SCORE";

export const startGame = game => {
  return {
    type: START_GAME,
    game
  }
}

export const score = score => {
  return {
    type: SCORE,
    score
  }
}



/*
store= {
  game: {
    score: 0
  }
}

*/


