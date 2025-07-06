import { useState, useEffect, useRef, useCallback } from "react"
import { Position } from "../types"

export const useVoiceControl = (
   targetPosition: Position | null,
   onMove: (deltaX: number, deltaY: number) => void,
   onTeleport: (position: Position) => void,
   voiceMoveSpeed: number
) => {
   const [isListening, setIsListening] = useState(false)
   const [lastCommand, setLastCommand] = useState("")

   const recognitionRef = useRef<SpeechRecognition | null>(null)
   const isListeningRef = useRef(false)
   const processingRef = useRef(false)
   const lastCommandProcessedRef = useRef("")
   const commandTimeoutRef = useRef<number | null>(null)

   // Process individual command words
   const processCommand = useCallback(
      (transcript: string) => {
         if (processingRef.current) return

         processingRef.current = true
         console.log("Processing command:", transcript)

         // Use longer phrases for better voice recognition
         if (
            (transcript.includes("go point") ||
               transcript.includes("gopoint")) &&
            targetPosition
         ) {
            console.log("Executing teleport to:", targetPosition)
            onTeleport(targetPosition)
            setLastCommand("go point")
         } else if (transcript.includes("go up")) {
            console.log("Moving up")
            onMove(0, -voiceMoveSpeed)
            setLastCommand("go up")
         } else if (transcript.includes("go down")) {
            console.log("Moving down")
            onMove(0, voiceMoveSpeed)
            setLastCommand("go down")
         } else if (transcript.includes("go left")) {
            console.log("Moving left")
            onMove(-voiceMoveSpeed, 0)
            setLastCommand("go left")
         } else if (transcript.includes("go right")) {
            console.log("Moving right")
            onMove(voiceMoveSpeed, 0)
            setLastCommand("go right")
         }

         // Reset processing flag after delay
         setTimeout(() => {
            processingRef.current = false
         }, 1500)
      },
      [targetPosition, onMove, onTeleport, voiceMoveSpeed]
   )

   // Initialize speech recognition
   useEffect(() => {
      if (
         !("webkitSpeechRecognition" in window) &&
         !("SpeechRecognition" in window)
      ) {
         return
      }

      const SpeechRecognition =
         (window as any).SpeechRecognition ||
         (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
         console.log("Speech recognition started")
         setIsListening(true)
         isListeningRef.current = true
      }

      recognition.onresult = (event: any) => {
         let finalTranscript = ""
         let interimTranscript = ""

         for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
               finalTranscript += transcript
            } else {
               interimTranscript += transcript
            }
         }

         // Process final results
         if (finalTranscript) {
            const cleanTranscript = finalTranscript.toLowerCase().trim()
            console.log("Final transcript:", cleanTranscript)

            // Process the full transcript for command phrases
            if (
               cleanTranscript &&
               cleanTranscript !== lastCommandProcessedRef.current
            ) {
               console.log("Processing full transcript:", cleanTranscript)

               // Clear any existing timeout
               if (commandTimeoutRef.current) {
                  clearTimeout(commandTimeoutRef.current)
               }

               // Process the command with a small delay
               commandTimeoutRef.current = window.setTimeout(() => {
                  if (cleanTranscript !== lastCommandProcessedRef.current) {
                     lastCommandProcessedRef.current = cleanTranscript
                     processCommand(cleanTranscript)

                     // Clear processed command after delay to allow new commands
                     setTimeout(() => {
                        lastCommandProcessedRef.current = ""
                     }, 2000)
                  }
               }, 300)
            }
         }
      }

      recognition.onend = () => {
         console.log("Speech recognition ended")
         if (isListeningRef.current) {
            // Restart recognition if we should still be listening
            setTimeout(() => {
               if (isListeningRef.current && recognitionRef.current) {
                  try {
                     recognitionRef.current.start()
                     console.log("Restarted speech recognition")
                  } catch (error) {
                     console.log("Failed to restart recognition:", error)
                     setIsListening(false)
                     isListeningRef.current = false
                  }
               }
            }, 100)
         } else {
            setIsListening(false)
         }
      }

      recognition.onerror = (event: any) => {
         console.log("Speech recognition error:", event.error)

         if (event.error === "no-speech" || event.error === "audio-capture") {
            // These are recoverable errors, try to restart
            if (isListeningRef.current) {
               setTimeout(() => {
                  if (isListeningRef.current && recognitionRef.current) {
                     try {
                        recognitionRef.current.start()
                        console.log("Restarted after error")
                     } catch (error) {
                        console.log("Failed to restart after error:", error)
                        setIsListening(false)
                        isListeningRef.current = false
                     }
                  }
               }, 1000)
            }
         } else {
            // Non-recoverable error
            console.log("Non-recoverable error:", event.error)
            setIsListening(false)
            isListeningRef.current = false
         }
      }

      recognitionRef.current = recognition

      return () => {
         if (recognitionRef.current) {
            recognitionRef.current.stop()
         }
         if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current)
         }
      }
   }, [processCommand])

   const toggleVoiceControl = useCallback(() => {
      if (!recognitionRef.current) {
         alert(
            "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
         )
         return
      }

      if (isListening) {
         console.log("Stopping voice control")
         isListeningRef.current = false
         recognitionRef.current.stop()
         setIsListening(false)
         setLastCommand("")

         // Clear states
         lastCommandProcessedRef.current = ""
         processingRef.current = false
         if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current)
            commandTimeoutRef.current = null
         }
      } else {
         console.log("Starting voice control")
         isListeningRef.current = true
         lastCommandProcessedRef.current = ""
         processingRef.current = false
         setLastCommand("")

         try {
            recognitionRef.current.start()
         } catch (error) {
            console.log("Failed to start recognition:", error)
            isListeningRef.current = false
            setIsListening(false)
            alert("Failed to start voice recognition. Please try again.")
         }
      }
   }, [isListening])

   return {
      isListening,
      lastCommand,
      toggleVoiceControl,
   }
}
