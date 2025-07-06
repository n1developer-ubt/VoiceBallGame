import React from "react"
import { Position } from "../../types"
import { BALL_SIZE } from "../../constants/gameConstants"

interface BallProps {
   position: Position
   isActive: boolean
}

export const Ball: React.FC<BallProps> = ({ position, isActive }) => {
   return (
      <div
         className='absolute w-5 h-5 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg transition-all duration-75 ease-out border-2 border-white/50 pointer-events-none'
         style={{
            left: position.x - BALL_SIZE / 2,
            top: position.y - BALL_SIZE / 2,
            transform: `scale(${isActive ? 1.2 : 1})`,
         }}>
         <div className='absolute inset-1 bg-white/50 rounded-full'></div>
      </div>
   )
}
