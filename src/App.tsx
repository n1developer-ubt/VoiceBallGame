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
      <div className='min-h-screen bg-black overflow-hidden'>
         <div className='flex h-screen'>
            {/* Left side - Game Area (80%) */}
            <div className='w-4/5 flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black'>
               <div className='relative'>
                  <GameArea
                     ballPosition={ballPosition}
                     targetPosition={targetPosition}
                     collectibles={collectibles}
                     onAreaClick={handleGameAreaClick}
                     isBallActive={isBallActive}
                  />
               </div>
            </div>

            {/* Right side - Controls and Info (20%) */}
            <div className='w-1/5 bg-white border-l border-gray-300 overflow-y-auto'>
               <div className='p-6 space-y-6'>
                  {/* Header */}
                  <div className='text-center'>
                     <h1 className='text-2xl font-bold text-black mb-2 flex items-center justify-center gap-2'>
                        <Gamepad2 className='text-gray-600' size={24} />
                        Voice Ball
                     </h1>
                     <p className='text-gray-600 text-sm'>Collect all stars!</p>
                  </div>

                  {/* Score Display */}
                  <div className='bg-gray-100 rounded-xl px-4 py-3 border border-gray-300'>
                     <ScoreDisplay score={score} />
                  </div>

                  {/* Game Controls */}
                  <div className='space-y-3'>
                     <GameControls
                        isListening={isListening}
                        onToggleVoice={toggleVoiceControl}
                        onResetPosition={resetPosition}
                        onResetGame={resetGame}
                     />
                  </div>

                  {/* Status Display */}
                  <StatusDisplay
                     isListening={isListening}
                     lastCommand={lastCommand}
                     targetPosition={targetPosition}
                     ballPosition={ballPosition}
                  />

                  {/* Instructions */}
                  <Instructions />
               </div>
            </div>
         </div>

         {/* Win Modal */}
         <WinModal
            show={showWinModal}
            onPlayAgain={resetGame}
            onClose={() => setShowWinModal(false)}
         />
      </div>
   )
}

export default App
