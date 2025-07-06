import React from "react"
import { TOTAL_STARS } from "../../constants/gameConstants"

export const Instructions: React.FC = () => {
   return (
      <div className='bg-gray-100 rounded-xl p-4 border border-gray-300'>
         <h3 className='font-semibold text-black mb-2'>How to Play</h3>
         <div className='text-gray-700 text-xs space-y-1'>
            <p>• Use arrow keys to move</p>
            <p>
               • Say: <strong>"Up", "Down", "Left", "Right"</strong>
            </p>
            <p>
               • Click game area, then say <strong>"Go"</strong> to teleport
            </p>
            <p>
               • Collect all <strong>{TOTAL_STARS} stars</strong> to win
            </p>
            <p>• Allow microphone access when prompted</p>
         </div>
      </div>
   )
}
