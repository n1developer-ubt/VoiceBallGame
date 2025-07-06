import { useState, useEffect, useCallback } from "react"

export const useKeyboard = (
   onMove: (deltaX: number, deltaY: number) => void,
   moveSpeed: number
) => {
   const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set())

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         setKeysPressed((prev) => new Set(prev.add(event.key)))
      }

      const handleKeyUp = (event: KeyboardEvent) => {
         setKeysPressed((prev) => {
            const newSet = new Set(prev)
            newSet.delete(event.key)
            return newSet
         })
      }

      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)

      return () => {
         window.removeEventListener("keydown", handleKeyDown)
         window.removeEventListener("keyup", handleKeyUp)
      }
   }, [])

   useEffect(() => {
      const interval = setInterval(() => {
         let deltaX = 0
         let deltaY = 0

         if (keysPressed.has("ArrowLeft")) deltaX -= moveSpeed
         if (keysPressed.has("ArrowRight")) deltaX += moveSpeed
         if (keysPressed.has("ArrowUp")) deltaY -= moveSpeed
         if (keysPressed.has("ArrowDown")) deltaY += moveSpeed

         if (deltaX !== 0 || deltaY !== 0) {
            onMove(deltaX, deltaY)
         }
      }, 16)

      return () => clearInterval(interval)
   }, [keysPressed, onMove, moveSpeed])

   return { keysPressed }
}
