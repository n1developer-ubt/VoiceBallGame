import React from "react"
import { TOTAL_STARS } from "../../constants/gameConstants"

export const Instructions: React.FC = () => {
   return (
      <div className='mt-6 bg-white/10 rounded-xl p-4 backdrop-blur-sm'>
         <h3 className='font-semibold text-white mb-2'>How to Play</h3>
         <div className='text-white/80 text-sm space-y-1'>
            <p>• Use arrow keys to move the ball around</p>
            <p>
               • Click "Start Voice Control" and say:{" "}
               <strong>"Up", "Down", "Left", or "Right"</strong>
            </p>
            <p>
               • <strong>NEW:</strong> Click anywhere on the game area to set a
               target, then say <strong>"Go"</strong> to teleport there
            </p>
            <p>
               • Collect all <strong>{TOTAL_STARS} stars</strong> to win the
               game
            </p>
            <p>• Watch the ball grow when you're actively controlling it</p>
            <p>• Make sure to allow microphone access when prompted</p>
         </div>
      </div>
   )
}
