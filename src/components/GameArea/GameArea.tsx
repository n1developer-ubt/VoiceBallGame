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
   return (
      <div className='relative mb-6'>
         <div
            className='relative bg-white rounded-2xl shadow-2xl border-4 border-gray-300 overflow-hidden cursor-crosshair'
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={onAreaClick}>
            <div className='absolute inset-0 opacity-10'>
               <div className='grid grid-cols-8 grid-rows-8 w-full h-full'>
                  {Array.from({ length: 64 }).map((_, i) => (
                     <div key={i} className='border border-gray-300'></div>
                  ))}
               </div>
            </div>

            <TargetMarker position={targetPosition} />
            <CollectibleStars collectibles={collectibles} />
            <Ball position={ballPosition} isActive={isBallActive} />
         </div>
      </div>
   )
}
