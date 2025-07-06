import React from "react"
import { Star } from "lucide-react"
import { TOTAL_STARS } from "../../constants/gameConstants"

interface ScoreDisplayProps {
   score: number
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
   return (
      <div className='flex items-center gap-2 text-black'>
         <Star size={20} className='fill-current' />
         <span className='font-bold text-lg'>
            {score}/{TOTAL_STARS}
         </span>
      </div>
   )
}
