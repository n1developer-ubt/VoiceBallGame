import React, { useCallback } from "react"
import { Gamepad2 } from "lucide-react"
import { useGame } from "./hooks/useGame"
import { useVoiceControl } from "./hooks/useVoiceControl"
import { useKeyboard } from "./hooks/useKeyboard"
import { GameArea } from "./components/GameArea/GameArea"
import { GameControls } from "./components/Controls/GameControls"
import { ScoreDisplay } from "./components/UI/ScoreDisplay"
import { StatusDisplay } from "./components/UI/StatusDisplay"
import { Instructions } from "./components/UI/Instructions"
import { WinModal } from "./components/UI/WinModal"
import { clampPosition } from "./utils/gameUtils"
import {
   BALL_SIZE,
   MOVE_SPEED,
   VOICE_MOVE_SPEED,
} from "./constants/gameConstants"

function App() {
   const {
      ballPosition,
      targetPosition,
      collectibles,
      score,
      showWinModal,
      setTargetPosition,
      setShowWinModal,
      moveBall,
      teleportBall,
      resetGame,
      resetPosition,
   } = useGame()

   const { isListening, lastCommand, toggleVoiceControl } = useVoiceControl(
      targetPosition,
      moveBall,
      teleportBall,
      VOICE_MOVE_SPEED
   )

   const { keysPressed } = useKeyboard(moveBall, MOVE_SPEED)

   const handleGameAreaClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
         const rect = event.currentTarget.getBoundingClientRect()
         const x = event.clientX - rect.left
         const y = event.clientY - rect.top

         const clampedPosition = clampPosition(x, y, BALL_SIZE)
         setTargetPosition(clampedPosition)
      },
      [setTargetPosition]
   )

   const isBallActive = keysPressed.size > 0 || Boolean(lastCommand)

   return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
         <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 relative'>
            <ScoreDisplay score={score} />

            <div className='text-center mb-6'>
               <h1 className='text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3'>
                  <Gamepad2 className='text-yellow-400' />
                  Voice Ball Game
               </h1>
               <p className='text-white/80'>Collect all the stars to win!</p>
            </div>

            <GameArea
               ballPosition={ballPosition}
               targetPosition={targetPosition}
               collectibles={collectibles}
               onAreaClick={handleGameAreaClick}
               isBallActive={isBallActive}
            />

            <GameControls
               isListening={isListening}
               onToggleVoice={toggleVoiceControl}
               onResetPosition={resetPosition}
               onResetGame={resetGame}
            />

            <StatusDisplay
               isListening={isListening}
               lastCommand={lastCommand}
               targetPosition={targetPosition}
               ballPosition={ballPosition}
            />

            <Instructions />

            <WinModal
               show={showWinModal}
               onPlayAgain={resetGame}
               onClose={() => setShowWinModal(false)}
            />
         </div>
      </div>
   )
}

export default App
