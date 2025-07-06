import React from "react"
import { Volume2 } from "lucide-react"
import { Position } from "../../types"

interface StatusDisplayProps {
   isListening: boolean
   lastCommand: string
   targetPosition: Position | null
   ballPosition: Position
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
   isListening,
   lastCommand,
   targetPosition,
   ballPosition,
}) => {
   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
         <div className='bg-white/20 rounded-xl p-4 backdrop-blur-sm'>
            <h3 className='font-semibold text-white mb-2 flex items-center gap-2'>
               <Volume2 size={16} />
               Voice Status
            </h3>
            <p className='text-white/80'>
               Status:{" "}
               <span
                  className={`font-semibold ${
                     isListening ? "text-green-300" : "text-red-300"
                  }`}>
                  {isListening ? "Listening" : "Not Listening"}
               </span>
            </p>
            {lastCommand && (
               <p className='text-white/80 mt-1'>
                  Last:{" "}
                  <span className='font-mono text-yellow-300'>
                     "{lastCommand}"
                  </span>
               </p>
            )}
            {targetPosition && (
               <p className='text-white/80 mt-1'>
                  Target:{" "}
                  <span className='font-mono text-red-300'>
                     ({Math.round(targetPosition.x)},{" "}
                     {Math.round(targetPosition.y)})
                  </span>
               </p>
            )}
         </div>

         <div className='bg-white/20 rounded-xl p-4 backdrop-blur-sm'>
            <h3 className='font-semibold text-white mb-2'>Ball Position</h3>
            <p className='text-white/80'>
               X:{" "}
               <span className='font-mono text-blue-300'>
                  {Math.round(ballPosition.x)}
               </span>
            </p>
            <p className='text-white/80'>
               Y:{" "}
               <span className='font-mono text-blue-300'>
                  {Math.round(ballPosition.y)}
               </span>
            </p>
         </div>
      </div>
   )
}
