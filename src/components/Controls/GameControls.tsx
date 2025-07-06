import React from "react"
import { Mic, MicOff, RotateCcw } from "lucide-react"

interface GameControlsProps {
   isListening: boolean
   onToggleVoice: () => void
   onResetPosition: () => void
   onResetGame: () => void
}

export const GameControls: React.FC<GameControlsProps> = ({
   isListening,
   onToggleVoice,
   onResetPosition,
   onResetGame,
}) => {
   return (
      <div className='flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-3'>
         <button
            onClick={onToggleVoice}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold shadow-lg text-xs sm:text-sm border-2 transition-all duration-200 ${
               isListening
                  ? "bg-black text-white border-black hover:bg-gray-800 animate-pulse"
                  : "bg-white text-black border-black hover:bg-gray-100 hover:scale-105"
            }`}>
            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            <span className='hidden sm:inline'>
               {isListening ? "Stop Voice" : "Start Voice"}
            </span>
            <span className='sm:hidden'>{isListening ? "Stop" : "Voice"}</span>
         </button>

         <button
            onClick={onResetPosition}
            className='flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-gray-100 text-xs sm:text-sm'>
            <span className='hidden sm:inline'>Reset Position</span>
            <span className='sm:hidden'>Reset</span>
         </button>

         <button
            onClick={onResetGame}
            className='flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-gray-800 text-xs sm:text-sm'>
            <RotateCcw size={14} />
            <span className='hidden sm:inline'>New Game</span>
            <span className='sm:hidden'>New</span>
         </button>
      </div>
   )
}
