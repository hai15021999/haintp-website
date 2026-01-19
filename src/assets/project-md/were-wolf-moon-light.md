# 🌙 Moonlight - Werewolf GM Tool

A comprehensive Game Master (GM) assistant for managing Werewolf (Mafia) games with AI-powered features. This interactive web application helps you orchestrate engaging Werewolf games with advanced role management, night action tracking, and intelligent game analysis.

## ✨ Features

### 🎮 Game Management
- **Multi-phase Game Flow**: Setup → Night → Day → Voting phases with automatic progression
- **17 Unique Roles**: Including Werewolf, Alpha Wolf, Wolf Cub, Seer, Witch, Hunter, Guard, Cupid, Cult Leader, Serial Killer, and more
- **Advanced Win Conditions**: Automatic detection of Village, Werewolf, Lovers, Cult, Serial Killer, and Tanner victories
- **Role Priority System**: Automated night phase ordering based on role wake priorities

### 🌙 Night Phase Management
- **Sequential Night Actions**: Guided workflow through each night role's turn
- **Action Tracking**: Records all night actions (kills, protections, visions, conversions)
- **Special Mechanics**:
  - Wolf Cub/Alpha Wolf extra kill mechanics
  - Witch save and poison abilities
  - Hunter revenge kill
  - Cupid lover linking
  - Cult Leader conversions
  - Guard protections

### 🗳️ Voting System
- **Interactive Voting**: Tap-based voting interface for day eliminations
- **Tie Handling**: Automatic tie detection with GM resolution options
- **Skip Voting**: Option to end day without elimination
- **Vote Display**: Visual vote counts for all players

### 🎭 Player Management
- **Dynamic Player Cards**: Color-coded by team (Village/Werewolf/Neutral)
- **Status Tracking**: Alive/Dead status with visual indicators
- **Special States**: Track protected, poisoned, marked, cult, and lover status
- **Quick Actions**: Manual status overrides and mark management

### 🤖 AI-Powered Features
- **Image Analysis**: Upload photos of handwritten player lists or game boards for AI recognition
- **Game Analysis**: Generate comprehensive end-game reports with strategy insights
- **Context-Aware AI**: Understands current game state for relevant responses
- **Powered by Google Gemini AI**

### 🌍 Internationalization
- **Bilingual Support**: English and Vietnamese (Tiếng Việt)
- **Complete Translation**: All UI elements, roles, phases, and messages
- **Easy Language Toggle**: Switch languages on-the-fly

### 📊 Game History
- **Event Logging**: Complete history of all game events
- **Timestamped Entries**: Track when each action occurred
- **Phase Tracking**: See which phase each event happened in
- **Color-coded Logs**: Different colors for info, warning, success, and error messages

## 🎭 Available Roles

### 🐺 Werewolf Team
- **Werewolf**: Basic killing wolf
- **Alpha Werewolf**: Grants extra kill if eliminated
- **Wolf Cub**: Grants 2 kills next night if eliminated
- **Sorcerer**: Searches for the Seer

### 👥 Village Team
- **Villager**: Basic village role
- **Seer**: Checks player alignments each night
- **Witch**: Can save and poison once per game
- **Hunter**: Shoots someone when eliminated
- **Guard**: Protects one player each night
- **Cupid**: Links two players as lovers (one-time)
- **Lycan**: Appears as Werewolf to Seer
- **Mayor (Dictator)**: Vote counts double

### ⚖️ Neutral Roles
- **Tanner**: Wins if voted out during the day
- **Cult Leader**: Converts players to cult each night
- **Serial Killer**: Kills independently, wins 1v1
- **Survivor**: Just needs to survive until game end

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hai15021999/were-wolf-moonlight.git
cd were-wolf-moonlight
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for AI features):
Create a `.env` file with:
```env
API_KEY=your_google_gemini_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to the provided localhost URL (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎮 How to Use

### 1. Setup Phase
- Click "Add Player" and enter player names
- Assign roles to each player using the role selector
- Configure lovers with Cupid if needed
- Click "Start Game" when ready

### 2. Night Phase
- Follow the on-screen prompts for each night role
- Select targets by tapping on player cards
- Confirm actions or skip if no action taken
- System automatically progresses through all night roles

### 3. Day Phase
- Review the night's events
- Discuss and deliberate
- Click "Start Voting" when ready

### 4. Voting Phase
- Tap players to vote for elimination
- System tallies votes automatically
- Handle ties or execute the top candidate
- Can skip voting if desired

### 5. Game Over
- Automatic win detection based on game state
- View detailed game analysis (if AI enabled)
- Review complete game log
- Reset or play again

## 🛠️ Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool and dev server
- **Lucide React** - Icon library
- **Google Generative AI** - AI features
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
were-wolf-moonlight/
├── components/
│   ├── AIChat.tsx           # AI chat interface (planned)
│   ├── ImageAnalyzer.tsx    # Image upload and analysis
│   ├── NightPhase.tsx       # Night phase management
│   ├── PlayerCard.tsx       # Individual player cards
│   ├── SetupPhase.tsx       # Game setup interface
│   └── VotingPhase.tsx      # Voting phase interface
├── services/
│   └── geminiService.ts     # Google Gemini AI integration
├── App.tsx                   # Main application component
├── constants.ts              # Role definitions and game constants
├── i18n.ts                   # Internationalization strings
├── types.ts                  # TypeScript type definitions
├── index.tsx                 # Application entry point
└── vite.config.ts           # Vite configuration

```

## 🎯 Key Features Explained

### Win Condition Priority
1. **Tanner** - Highest priority, wins if voted out
2. **Lovers** - Win if only 2 alive and linked
3. **Cult** - Win if all alive are cult members
4. **Serial Killer** - Wins in 1v1 scenarios
5. **Village/Wolves** - Standard elimination-based wins

### Night Action Order
Roles wake in priority order (lower numbers wake first):
- Cupid (1) - One-time action
- Sorcerer (15) - Searches for Seer
- Werewolves (20) - Select kill target
- Witch (25) - Save/poison decisions
- Seer (30) - Check alignment
- Guard (35) - Protect player
- Cult Leader (40) - Convert player
- Serial Killer (45) - Independent kill

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- AI chat feature is currently commented out (under development)
- Image analysis requires API key configuration
- Some advanced role interactions may need manual GM intervention

## 🔮 Future Enhancements

- [ ] Real-time multiplayer support
- [ ] More roles and variants
- [ ] Sound effects and atmospheric music
- [ ] Mobile-optimized responsive design
- [ ] Game replay and statistics
- [ ] Custom role creation
- [ ] Tournament mode

## 👤 Author

**Hai Nguyen**
- GitHub: [@hai15021999](https://github.com/hai15021999)

## 🙏 Acknowledgments

- Inspired by classic Werewolf/Mafia social deduction games
- Powered by Google Gemini AI for intelligent features
- Built with modern web technologies

---

**Enjoy your Werewolf games! 🐺🌙**
