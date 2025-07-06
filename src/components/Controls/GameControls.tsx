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
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
         <button
            onClick={onToggleVoice}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
               isListening
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
            }`}>
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            {isListening ? "Stop Listening" : "Start Voice Control"}
         </button>

         <button
            onClick={onResetPosition}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105'>
            Reset Position
         </button>

         <button
            onClick={onResetGame}
            className='flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105'>
            <RotateCcw size={20} />
            New Game
         </button>
      </div>
   )
}
