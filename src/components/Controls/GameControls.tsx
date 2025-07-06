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
      <div className='flex flex-col gap-3'>
         <button
            onClick={onToggleVoice}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg text-sm ${
               isListening
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
            }`}>
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            {isListening ? "Stop" : "Start Voice"}
         </button>

         <button
            onClick={onResetPosition}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 text-sm'>
            Reset Position
         </button>

         <button
            onClick={onResetGame}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 text-sm'>
            <RotateCcw size={16} />
            New Game
         </button>
      </div>
   )
}
