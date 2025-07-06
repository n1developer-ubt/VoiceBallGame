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
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-lg text-sm border-2 ${
               isListening
                  ? "bg-black text-white border-black hover:bg-gray-800 "
                  : "bg-white text-black border-black hover:bg-gray-100 hover:scale-105"
            }`}>
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            {isListening ? "Stop" : "Start Voice"}
         </button>

         <button
            onClick={onResetPosition}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-gray-100 text-sm'>
            Reset Position
         </button>

         <button
            onClick={onResetGame}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-semibold transition-all duration-200 shadow-lg hover:scale-105 hover:bg-gray-800 text-sm'>
            <RotateCcw size={16} />
            New Game
         </button>
      </div>
   )
}
