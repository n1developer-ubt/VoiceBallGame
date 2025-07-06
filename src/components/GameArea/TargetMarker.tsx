import React from "react"
import { Target } from "lucide-react"
import { Position } from "../../types"

interface TargetMarkerProps {
   position: Position | null
}

export const TargetMarker: React.FC<TargetMarkerProps> = ({ position }) => {
   if (!position) return null

   return (
      <div
         className='absolute transition-all duration-300 ease-out pointer-events-none'
         style={{
            left: position.x - 12,
            top: position.y - 12,
         }}>
         <Target
            size={24}
            className='text-red-400 animate-pulse drop-shadow-lg'
         />
         <div className='absolute inset-0 bg-red-400/20 rounded-full animate-ping'></div>
      </div>
   )
}
