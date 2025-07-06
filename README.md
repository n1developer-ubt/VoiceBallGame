# 🎮 Voice Ball Game

A modern, responsive browser-based game that combines traditional keyboard controls with cutting-edge voice recognition technology. Control a ball to collect stars using either your voice or keyboard!

![Voice Ball Game](https://img.shields.io/badge/Game-Voice%20Controlled-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Responsive](https://img.shields.io/badge/Design-Responsive-green)

## 🎯 Game Overview

Voice Ball is an interactive game where you control a ball on a game board to collect all the stars. The unique feature is the ability to control the ball using voice commands, making it accessible and fun for all ages.

### 🌟 Key Features

-  **🎤 Voice Control**: Use natural speech commands to control the ball
-  **⌨️ Keyboard Support**: Traditional arrow key controls
-  **📱 Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop
-  **🎨 Clean UI**: Modern black and white theme
-  **🏆 Score Tracking**: Track your progress and collected stars
-  **🎯 Target System**: Click-to-move functionality with voice activation

## 🚀 Getting Started

### Prerequisites

-  **Node.js** (version 16 or higher)
-  **npm** or **yarn** package manager
-  **Modern web browser** (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd VoiceBallGame
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   -  Navigate to `http://localhost:5173` (or the port shown in terminal)
   -  Allow microphone access when prompted for voice controls

## 🎮 How to Play

### Objective

Collect all **8 stars** scattered across the game board using the ball.

### Controls

#### 🎤 Voice Commands

| Command        | Action                              |
| -------------- | ----------------------------------- |
| **"Go Point"** | Teleport to clicked target location |
| **"Go Up"**    | Move ball up                        |
| **"Go Down"**  | Move ball down                      |
| **"Go Left"**  | Move ball left                      |
| **"Go Right"** | Move ball right                     |

#### ⌨️ Keyboard Controls

-  **Arrow Keys**: Move the ball in any direction
-  **Continuous Movement**: Hold arrow keys for smooth movement

#### 🖱️ Mouse Controls

-  **Click**: Set a target location on the game board
-  **Voice "Go Point"**: Teleport to the clicked location

### 🎯 Gameplay Steps

1. **Start Voice Control**

   -  Click the "Start Voice Control" button
   -  Allow microphone access when prompted
   -  The button will show "Stop" and pulse when listening

2. **Moving the Ball**

   -  Use voice commands: "Go up", "Go down", "Go left", "Go right"
   -  Or use arrow keys for precise control
   -  The ball will scale up when active

3. **Teleporting**

   -  Click anywhere on the white game area
   -  A target marker will appear
   -  Say "Go Point" to teleport the ball to that location

4. **Collecting Stars**

   -  Move the ball close to any black star
   -  Stars automatically disappear when collected
   -  Score updates in real-time

5. **Winning**
   -  Collect all 8 stars to win
   -  A congratulations modal will appear
   -  Options to play again or continue

## 🛠️ Game Structure

### Core Components

-  **Game Area**: The main playing field with responsive scaling
-  **Ball**: Player-controlled character that scales when active
-  **Stars**: Collectible items scattered across the board
-  **Target Marker**: Shows click destination for voice teleportation
-  **Controls Panel**: Voice controls, reset buttons, and game options

### Voice Recognition System

-  **Custom Implementation**: Built with native Web Speech API
-  **Continuous Listening**: No need to restart between commands
-  **Smart Processing**: Extracts command phrases from natural speech
-  **Error Recovery**: Automatically handles recognition errors
-  **Browser Compatibility**: Works in Chrome, Firefox, Safari, and Edge

### Responsive Design

#### 📱 Mobile/Tablet (< 1024px)

-  **Stacked Layout**: Header → Game Area → Controls
-  **Compact Controls**: Abbreviated button text and smaller icons
-  **Touch-Friendly**: Optimized button sizes for touch interaction
-  **Scrollable Panel**: Controls panel scrolls if content overflows

#### 🖥️ Desktop (≥ 1024px)

-  **Side-by-Side**: Game area (80%) and controls panel (20%)
-  **Full Sidebar**: All controls visible without scrolling
-  **Larger Game Area**: More space for precise gameplay

## 🎙️ Voice Recognition Tips

### For Best Results:

-  **Speak clearly** and at normal volume
-  **Use exact phrases**: "Go up", "Go down", "Go left", "Go right", "Go point"
-  **Wait briefly** between commands (system has built-in cooldown)
-  **Ensure quiet environment** for better recognition accuracy
-  **Allow microphone access** when prompted by browser

### Troubleshooting:

-  **Commands not working?** Check microphone permissions in browser settings
-  **Recognition stopping?** Click "Start Voice Control" to restart
-  **Poor accuracy?** Try speaking more slowly and clearly
-  **Browser not supported?** Use Chrome, Firefox, Safari, or Edge

## 🔧 Technical Details

### Built With

-  **React 18+** with TypeScript
-  **Vite** for fast development and building
-  **Tailwind CSS** for responsive styling
-  **Lucide React** for icons
-  **Web Speech API** for voice recognition

### Browser Requirements

-  **Microphone access** for voice controls
-  **Modern browser** with Web Speech API support
-  **JavaScript enabled**

### Performance

-  **Lightweight**: No heavy external dependencies
-  **Responsive**: Smooth performance on all devices
-  **Efficient**: Optimized rendering and state management

## 🎨 Customization

The game uses a clean black and white theme with:

-  **Black ball** with gray highlight
-  **Black stars** on white background
-  **Gray target markers**
-  **White game area** with subtle grid
-  **Clean typography** and consistent spacing

## 🤝 Contributing

To contribute to the game:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Have Fun!

Enjoy playing Voice Ball! Whether you prefer traditional keyboard controls or the innovative voice commands, the game provides an engaging and accessible gaming experience.

**Pro Tip**: Try combining both control methods - use voice commands for quick movements and keyboard for precise positioning!
