import { useState, useEffect, useCallback } from "react"
import { Position, Collectible } from "../types"
import {
   generateCollectibles,
   calculateDistance,
   clampPosition,
} from "../utils/gameUtils"
import {
   GAME_WIDTH,
   GAME_HEIGHT,
   BALL_SIZE,
   COLLECTION_DISTANCE,
   TOTAL_STARS,
} from "../constants/gameConstants"

export const useGame = () => {
   const [ballPosition, setBallPosition] = useState<Position>({
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
   })
   const [targetPosition, setTargetPosition] = useState<Position | null>(null)
   const [collectibles, setCollectibles] = useState<Collectible[]>([])
   const [score, setScore] = useState(0)
   const [showWinModal, setShowWinModal] = useState(false)

   useEffect(() => {
      setCollectibles(generateCollectibles())
   }, [])

   useEffect(() => {
      setCollectibles((prev) => {
         let newScore = score
         const updated = prev.map((collectible) => {
            if (!collectible.collected) {
               const distance = calculateDistance(
                  ballPosition,
                  collectible.position
               )

               if (distance < COLLECTION_DISTANCE) {
                  newScore++
                  return { ...collectible, collected: true }
               }
            }
            return collectible
         })

         if (newScore !== score) {
            setScore(newScore)

            if (newScore === TOTAL_STARS) {
               setShowWinModal(true)
            }
         }

         return updated
      })
   }, [ballPosition, score])

   const moveBall = useCallback((deltaX: number, deltaY: number) => {
      setBallPosition((prev) =>
         clampPosition(prev.x + deltaX, prev.y + deltaY, BALL_SIZE)
      )
   }, [])

   const teleportBall = useCallback((position: Position) => {
      setBallPosition(position)
      setTargetPosition(null)
   }, [])

   const resetGame = useCallback(() => {
      setBallPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 })
      setCollectibles(generateCollectibles())
      setScore(0)
      setShowWinModal(false)
      setTargetPosition(null)
   }, [])

   const resetPosition = useCallback(() => {
      setBallPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 })
      setTargetPosition(null)
   }, [])

   return {
      ballPosition,
      targetPosition,
      collectibles,
      score,
      showWinModal,
      setTargetPosition,
      setShowWinModal,
      moveBall,
      teleportBall,
      resetGame,
      resetPosition,
   }
}
