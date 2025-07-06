export interface Position {
   x: number
   y: number
}

export interface Collectible {
   id: number
   position: Position
   collected: boolean
}

export interface GameState {
   ballPosition: Position
   targetPosition: Position | null
   collectibles: Collectible[]
   score: number
   showWinModal: boolean
}

export interface VoiceControlState {
   isListening: boolean
   recognition: any
   lastCommand: string
}

export interface KeyboardState {
   keysPressed: Set<string>
}
