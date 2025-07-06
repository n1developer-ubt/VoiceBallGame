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
      <div className='space-y-4'>
         <div className='bg-gray-100 rounded-xl p-4 border border-gray-300'>
            <h3 className='font-semibold text-black mb-2 flex items-center gap-2'>
               <Volume2 size={16} />
               Voice Status
            </h3>
            <p className='text-gray-700 text-sm'>
               Status:{" "}
               <span
                  className={`font-semibold ${
                     isListening ? "text-black" : "text-gray-500"
                  }`}>
                  {isListening ? "Listening" : "Not Listening"}
               </span>
            </p>
            {lastCommand && (
               <p className='text-gray-700 mt-1 text-sm'>
                  Last:{" "}
                  <span className='font-mono text-black font-semibold'>
                     "{lastCommand}"
                  </span>
               </p>
            )}
            {targetPosition && (
               <p className='text-gray-700 mt-1 text-sm'>
                  Target:{" "}
                  <span className='font-mono text-gray-600'>
                     ({Math.round(targetPosition.x)},{" "}
                     {Math.round(targetPosition.y)})
                  </span>
               </p>
            )}
         </div>

         <div className='bg-gray-100 rounded-xl p-4 border border-gray-300'>
            <h3 className='font-semibold text-black mb-2'>Ball Position</h3>
            <p className='text-gray-700 text-sm'>
               X:{" "}
               <span className='font-mono text-black font-semibold'>
                  {Math.round(ballPosition.x)}
               </span>
            </p>
            <p className='text-gray-700 text-sm'>
               Y:{" "}
               <span className='font-mono text-black font-semibold'>
                  {Math.round(ballPosition.y)}
               </span>
            </p>
         </div>
      </div>
   )
}
