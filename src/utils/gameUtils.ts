import { Position, Collectible } from "../types"
import {
   GAME_WIDTH,
   GAME_HEIGHT,
   STAR_SIZE,
   TOTAL_STARS,
} from "../constants/gameConstants"

export const generateCollectibles = (): Collectible[] => {
   const newCollectibles: Collectible[] = []

   for (let i = 0; i < TOTAL_STARS; i++) {
      let position: Position
      let attempts = 0

      do {
         position = {
            x: Math.random() * (GAME_WIDTH - STAR_SIZE * 2) + STAR_SIZE,
            y: Math.random() * (GAME_HEIGHT - STAR_SIZE * 2) + STAR_SIZE,
         }
         attempts++
      } while (
         attempts < 50 &&
         ((Math.abs(position.x - GAME_WIDTH / 2) < 40 &&
            Math.abs(position.y - GAME_HEIGHT / 2) < 40) ||
            newCollectibles.some(
               (star) =>
                  Math.abs(star.position.x - position.x) < 30 &&
                  Math.abs(star.position.y - position.y) < 30
            ))
      )

      newCollectibles.push({
         id: i,
         position,
         collected: false,
      })
   }

   return newCollectibles
}

export const calculateDistance = (pos1: Position, pos2: Position): number => {
   return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
}

export const clampPosition = (
   x: number,
   y: number,
   ballSize: number
): Position => {
   return {
      x: Math.max(ballSize / 2, Math.min(GAME_WIDTH - ballSize / 2, x)),
      y: Math.max(ballSize / 2, Math.min(GAME_HEIGHT - ballSize / 2, y)),
   }
}
