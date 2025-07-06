import React from "react"
import { Star, Trophy, RotateCcw } from "lucide-react"
import { TOTAL_STARS } from "../../constants/gameConstants"

interface WinModalProps {
   show: boolean
   onPlayAgain: () => void
   onClose: () => void
}

export const WinModal: React.FC<WinModalProps> = ({
   show,
   onPlayAgain,
   onClose,
}) => {
   if (!show) return null

   return (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
         <div className='bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl border-4 border-white/30 text-center max-w-md mx-4'>
            <div className='mb-6'>
               <Trophy
                  size={64}
                  className='text-white mx-auto mb-4 animate-bounce'
               />
               <h2 className='text-3xl font-bold text-white mb-2'>
                  Congratulations!
               </h2>
               <p className='text-white/90 text-lg'>
                  You collected all {TOTAL_STARS} stars!
               </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
               <button
                  onClick={onPlayAgain}
                  className='flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-gray-100'>
                  <RotateCcw size={20} />
                  Play Again
               </button>

               <button
                  onClick={onClose}
                  className='flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-orange-700 border-2 border-white/30'>
                  Continue
               </button>
            </div>
         </div>
      </div>
   )
}
