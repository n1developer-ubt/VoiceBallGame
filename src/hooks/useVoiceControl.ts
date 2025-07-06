import { useState, useEffect, useRef } from "react"
import { Position } from "../types"

export const useVoiceControl = (
   targetPosition: Position | null,
   onMove: (deltaX: number, deltaY: number) => void,
   onTeleport: (position: Position) => void,
   voiceMoveSpeed: number
) => {
   const [isListening, setIsListening] = useState(false)
   const [recognition, setRecognition] = useState<any>(null)
   const [lastCommand, setLastCommand] = useState("")

   const isListeningRef = useRef(false)
   const recognitionInstanceRef = useRef<any>(null)

   useEffect(() => {
      isListeningRef.current = isListening
   }, [isListening])

   useEffect(() => {
      if (
         "webkitSpeechRecognition" in window ||
         "SpeechRecognition" in window
      ) {
         const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition
         const recognitionInstance = new SpeechRecognition()

         recognitionInstance.continuous = true
         recognitionInstance.interimResults = true
         recognitionInstance.lang = "en-US"

         recognitionInstance.onresult = (event: any) => {
            const last = event.results.length - 1
            const command = event.results[last][0].transcript
               .toLowerCase()
               .trim()

            setLastCommand(command)

            if (command.includes("go") && targetPosition) {
               onTeleport(targetPosition)
            } else if (command.includes("up")) {
               onMove(0, -voiceMoveSpeed)
            } else if (command.includes("down")) {
               onMove(0, voiceMoveSpeed)
            } else if (command.includes("left")) {
               onMove(-voiceMoveSpeed, 0)
            } else if (command.includes("right")) {
               onMove(voiceMoveSpeed, 0)
            }
         }

         recognitionInstance.onstart = () => {
            setIsListening(true)
         }

         recognitionInstance.onend = () => {
            if (!isListeningRef.current) {
               setIsListening(false)
            }
         }

         recognitionInstance.onerror = (event: any) => {
            if (
               (event.error === "no-speech" || event.error === "network") &&
               isListeningRef.current
            ) {
               setTimeout(() => {
                  if (
                     isListeningRef.current &&
                     recognitionInstanceRef.current
                  ) {
                     try {
                        recognitionInstanceRef.current.start()
                        setIsListening(true)
                     } catch (error) {
                        setIsListening(false)
                     }
                  }
               }, 100)
            } else {
               setIsListening(false)
            }
         }

         setRecognition(recognitionInstance)
         recognitionInstanceRef.current = recognitionInstance
      }

      return () => {
         if (recognitionInstanceRef.current) {
            recognitionInstanceRef.current.stop()
         }
      }
   }, [targetPosition, onMove, onTeleport, voiceMoveSpeed])

   const toggleVoiceControl = () => {
      if (!recognition) {
         alert(
            "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
         )
         return
      }

      if (isListening) {
         recognition.stop()
         setIsListening(false)
      } else {
         try {
            recognition.start()
         } catch (error) {
            alert("Failed to start voice recognition. Please try again.")
         }
      }
   }

   return {
      isListening,
      lastCommand,
      toggleVoiceControl,
   }
}
