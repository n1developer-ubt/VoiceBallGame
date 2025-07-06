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
   const commandHistoryRef = useRef<Map<string, number>>(new Map())
   const processingTimeoutRef = useRef<number | null>(null)
   const restartTimeoutRef = useRef<number | null>(null)

   useEffect(() => {
      isListeningRef.current = isListening
   }, [isListening])

   // Command processing with advanced deduplication
   const processCommand = (command: string) => {
      const now = Date.now()
      const cleanCommand = command.replace(/\s+/g, " ").trim()

      // Check if this exact command was processed recently (within 2 seconds)
      const lastProcessed = commandHistoryRef.current.get(cleanCommand)
      if (lastProcessed && now - lastProcessed < 2000) {
         console.log("Ignoring duplicate command:", cleanCommand)
         return
      }

      // Store command timestamp
      commandHistoryRef.current.set(cleanCommand, now)

      // Clean up old entries (older than 5 seconds)
      for (const [cmd, timestamp] of commandHistoryRef.current.entries()) {
         if (now - timestamp > 5000) {
            commandHistoryRef.current.delete(cmd)
         }
      }

      console.log("Processing command:", cleanCommand)
      setLastCommand(cleanCommand)

      // Parse command with exact word matching
      const words = cleanCommand.split(" ")

      if (words.includes("go") && targetPosition) {
         console.log("Executing teleport to:", targetPosition)
         onTeleport(targetPosition)
      } else if (words.includes("up")) {
         console.log("Moving up")
         onMove(0, -voiceMoveSpeed)
      } else if (words.includes("down")) {
         console.log("Moving down")
         onMove(0, voiceMoveSpeed)
      } else if (words.includes("left")) {
         console.log("Moving left")
         onMove(-voiceMoveSpeed, 0)
      } else if (words.includes("right")) {
         console.log("Moving right")
         onMove(voiceMoveSpeed, 0)
      }
   }

   // Restart recognition with controlled timing
   const restartRecognition = (delay: number = 1000) => {
      if (restartTimeoutRef.current) {
         clearTimeout(restartTimeoutRef.current)
      }

      restartTimeoutRef.current = window.setTimeout(() => {
         if (isListeningRef.current && recognitionInstanceRef.current) {
            try {
               recognitionInstanceRef.current.start()
               console.log("Restarted speech recognition")
            } catch (error) {
               console.log("Failed to restart recognition:", error)
               setIsListening(false)
               isListeningRef.current = false
            }
         }
      }, delay)
   }

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
         recognitionInstance.interimResults = false
         recognitionInstance.lang = "en-US"
         recognitionInstance.maxAlternatives = 1

         recognitionInstance.onresult = (event: any) => {
            console.log("Speech recognition result event:", event)

            // Process only the latest final result
            for (let i = event.resultIndex; i < event.results.length; i++) {
               const result = event.results[i]
               if (result.isFinal) {
                  const command = result[0].transcript.toLowerCase().trim()
                  console.log("Final voice command received:", command)

                  if (command) {
                     // Clear any pending processing
                     if (processingTimeoutRef.current) {
                        clearTimeout(processingTimeoutRef.current)
                     }

                     // Process command with a small delay to ensure stability
                     processingTimeoutRef.current = window.setTimeout(() => {
                        processCommand(command)
                     }, 50)
                  }
               }
            }
         }

         recognitionInstance.onstart = () => {
            console.log("Speech recognition started")
            setIsListening(true)
         }

         recognitionInstance.onend = () => {
            console.log(
               "Speech recognition ended, isListening:",
               isListeningRef.current
            )
            if (isListeningRef.current) {
               restartRecognition(1000)
            } else {
               setIsListening(false)
            }
         }

         recognitionInstance.onerror = (event: any) => {
            console.log("Speech recognition error:", event.error)

            if (event.error === "no-speech" || event.error === "network") {
               if (isListeningRef.current) {
                  console.log(
                     "Handling recoverable error, attempting restart..."
                  )
                  restartRecognition(1500)
               }
            } else if (event.error === "not-allowed") {
               console.log("Microphone access denied")
               setIsListening(false)
               isListeningRef.current = false
               alert(
                  "Microphone access denied. Please allow microphone access and try again."
               )
            } else {
               console.log("Non-recoverable error:", event.error)
               setIsListening(false)
               isListeningRef.current = false
            }
         }

         setRecognition(recognitionInstance)
         recognitionInstanceRef.current = recognitionInstance
      }

      return () => {
         if (recognitionInstanceRef.current) {
            recognitionInstanceRef.current.stop()
         }
         if (processingTimeoutRef.current) {
            clearTimeout(processingTimeoutRef.current)
         }
         if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current)
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
         console.log("Stopping voice control")
         isListeningRef.current = false
         recognition.stop()
         setIsListening(false)

         // Clear all timeouts and history
         if (processingTimeoutRef.current) {
            clearTimeout(processingTimeoutRef.current)
            processingTimeoutRef.current = null
         }
         if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current)
            restartTimeoutRef.current = null
         }
         commandHistoryRef.current.clear()
      } else {
         console.log("Starting voice control")
         isListeningRef.current = true
         commandHistoryRef.current.clear()

         try {
            recognition.start()
         } catch (error) {
            console.log("Failed to start recognition:", error)
            isListeningRef.current = false
            setIsListening(false)
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
