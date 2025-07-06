# Voice Ball Game - Refactored Structure

## Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── GameArea/        # Game area related components
│   │   ├── GameArea.tsx      # Main game area container
│   │   ├── Ball.tsx          # Ball component
│   │   ├── CollectibleStars.tsx  # Stars to collect
│   │   ├── TargetMarker.tsx  # Target position marker
│   │   └── index.ts          # Export barrel
│   ├── Controls/        # Game controls
│   │   ├── GameControls.tsx  # Voice and game control buttons
│   │   └── index.ts          # Export barrel
│   └── UI/              # UI components
│       ├── ScoreDisplay.tsx  # Score display
│       ├── StatusDisplay.tsx # Game status information
│       ├── Instructions.tsx  # Game instructions
│       ├── WinModal.tsx      # Win modal dialog
│       └── index.ts          # Export barrel
├── hooks/               # Custom React hooks
│   ├── useGame.ts           # Game state management
│   ├── useVoiceControl.ts   # Voice recognition logic
│   ├── useKeyboard.ts       # Keyboard input handling
│   └── index.ts             # Export barrel
├── types/               # TypeScript type definitions
│   └── index.ts             # All type definitions
├── utils/               # Utility functions
│   ├── gameUtils.ts         # Game-related utility functions
│   └── index.ts             # Export barrel
├── constants/           # Application constants
│   ├── gameConstants.ts     # Game configuration constants
│   └── index.ts             # Export barrel
└── App.tsx              # Main application component
```

## Key Features

### Separation of Concerns

-  **Components**: Each UI component has its own file and is organized by feature
-  **Hooks**: Custom hooks handle specific logic (game state, voice control, keyboard input)
-  **Utils**: Pure utility functions for calculations and game logic
-  **Types**: All TypeScript interfaces and types in one place
-  **Constants**: Configuration values centralized

### Custom Hooks

-  `useGame`: Manages game state, collectibles, scoring, and win conditions
-  `useVoiceControl`: Handles speech recognition and voice commands
-  `useKeyboard`: Manages keyboard input and continuous movement

### Component Architecture

-  **GameArea**: Container for all game visual elements
-  **Ball**: Represents the player-controlled ball
-  **CollectibleStars**: Renders collectible star items
-  **TargetMarker**: Shows click target position
-  **GameControls**: Voice and game control buttons
-  **UI Components**: Score display, status information, instructions, and win modal

### Benefits

-  **Maintainability**: Easy to find and modify specific functionality
-  **Reusability**: Components and hooks can be reused or extended
-  **Testability**: Isolated functions and components are easier to test
-  **Scalability**: New features can be added without affecting existing code
-  **Type Safety**: Strong TypeScript typing throughout the application

## Usage

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

The application maintains all original functionality while providing a much cleaner, more maintainable codebase.
