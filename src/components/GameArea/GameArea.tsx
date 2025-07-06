import React from "react"
import { Position, Collectible } from "../../types"
import { GAME_WIDTH, GAME_HEIGHT } from "../../constants/gameConstants"
import { CollectibleStars } from "./CollectibleStars"
import { TargetMarker } from "./TargetMarker"
import { Ball } from "./Ball"

interface GameAreaProps {
   ballPosition: Position
   targetPosition: Position | null
   collectibles: Collectible[]
   onAreaClick: (event: React.MouseEvent<HTMLDivElement>) => void
   isBallActive: boolean
}

export const GameArea: React.FC<GameAreaProps> = ({
   ballPosition,
   targetPosition,
   collectibles,
   onAreaClick,
   isBallActive,
}) => {
   // Calculate responsive dimensions
   const getResponsiveDimensions = () => {
      const maxWidth = Math.min(window.innerWidth * 0.9, GAME_WIDTH)
      const maxHeight = Math.min(window.innerHeight * 0.6, GAME_HEIGHT)

      // Maintain aspect ratio
      const aspectRatio = GAME_WIDTH / GAME_HEIGHT
      let width = maxWidth
      let height = width / aspectRatio

      if (height > maxHeight) {
         height = maxHeight
         width = height * aspectRatio
      }

      return { width, height }
   }

   const { width, height } = getResponsiveDimensions()
   const scaleX = width / GAME_WIDTH
   const scaleY = height / GAME_HEIGHT

   return (
      <div className='relative mb-6'>
         <div
            className='relative bg-white rounded-2xl shadow-2xl border-4 border-gray-300 overflow-hidden cursor-crosshair mx-auto'
            style={{
               width: `${width}px`,
               height: `${height}px`,
               maxWidth: "90vw",
               maxHeight: "60vh",
            }}
            onClick={onAreaClick}>
            <div className='absolute inset-0 opacity-10'>
               <div className='grid grid-cols-8 grid-rows-8 w-full h-full'>
                  {Array.from({ length: 64 }).map((_, i) => (
                     <div key={i} className='border border-gray-300'></div>
                  ))}
               </div>
            </div>

            <div
               style={{
                  transform: `scale(${scaleX}, ${scaleY})`,
                  transformOrigin: "top left",
               }}>
               <TargetMarker position={targetPosition} />
               <CollectibleStars collectibles={collectibles} />
               <Ball position={ballPosition} isActive={isBallActive} />
            </div>
         </div>
      </div>
   )
}
