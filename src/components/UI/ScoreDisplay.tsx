import React from "react"
import { Star } from "lucide-react"
import { TOTAL_STARS } from "../../constants/gameConstants"

interface ScoreDisplayProps {
   score: number
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
   return (
      <div className='absolute top-4 right-4 bg-yellow-500/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-yellow-400/30'>
         <div className='flex items-center gap-2 text-yellow-300'>
            <Star size={20} className='fill-current' />
            <span className='font-bold text-lg'>
               {score}/{TOTAL_STARS}
            </span>
         </div>
      </div>
   )
}
