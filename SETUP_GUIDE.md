# 🚀 RiseUp AI - Local Development Setup Guide

## ✅ Current Status
Your project is now running in development mode with a mock backend! 🎉

- **Frontend**: Running at http://127.0.0.1:5173/
- **Backend**: Mock implementation (for development without DFX)

## 🛠️ What's Working Now

1. ✅ React frontend with TailwindCSS styling
2. ✅ Mock backend that simulates the Motoko chatbot responses
3. ✅ Chat interface with user/AI message display
4. ✅ Beautiful gradient UI with animations
5. ✅ Development server running on localhost

## 🎯 How to Use the Application

1. **Open your browser** and go to: http://127.0.0.1:5173/
2. **Start chatting** - Type any message in the input field
3. **Test responses** - The mock backend will respond with contextual messages
4. **Try keywords** like "motoko", "blockchain", "AI", or "hello" for special responses

## 🔧 Next Steps - Full IC Deployment

To deploy this to the Internet Computer properly, you'll need:

### Option 1: Use WSL2 (Recommended for Windows)
```powershell
# Install WSL2 with Ubuntu
wsl --install -d Ubuntu

# After installation, restart and open Ubuntu terminal
# Then install DFX inside WSL:
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Option 2: Use Docker
```bash
# Use IC development container
docker run --rm -it --platform linux/amd64 -p 4943:4943 -p 8080:8080 -v "%cd%":/workspace dfinity/dfx:latest
```

### Option 3: Use GitHub Codespaces or GitPod
- Push your code to GitHub
- Open in Codespaces or GitPod
- Both support IC development out of the box

## 📁 Project Structure

```
motoko-llm-chatbot/
├── backend/
│   └── app.mo                 # Motoko smart contract
├── frontend/
│   ├── src/
│   │   ├── main.jsx          # React app (modified for mock backend)
│   │   └── mockBackend.js    # Mock responses for development
│   └── package.json
├── dfx.json                  # IC configuration
└── mops.toml                # Motoko dependencies
```

## 🎨 Customization

### Modify Chat Responses
Edit `frontend/src/mockBackend.js` to change how the AI responds:

```javascript
// Add your own responses
if (userInput.toLowerCase().includes('your-keyword')) {
  return "Your custom response here!";
}
```

### Update UI Styling
The frontend uses TailwindCSS. Modify `frontend/src/main.jsx` to change:
- Colors: `bg-blue-500` → `bg-purple-500`
- Layout: Adjust `max-w-2xl`, `h-[80vh]`, etc.
- Animations: Add more Tailwind animation classes

### Connect to Real Backend
When you have DFX set up:
1. Replace the mock backend import with the real one
2. Run `dfx start` and `dfx deploy`
3. The app will connect to your actual Motoko smart contract

## 🔥 Features to Add

1. **Chat History**: Save conversations to localStorage
2. **Typing Indicators**: Show "AI is typing..." animation
3. **Message Timestamps**: More detailed time formatting
4. **Themes**: Dark/light mode toggle
5. **Export Chat**: Download conversations as text/JSON

## 🚨 Troubleshooting

### If the dev server stops:
```bash
cd frontend
npm run dev
```

### If you see import errors:
- Make sure you're in the `frontend` directory
- Run `npm install` to ensure all dependencies are installed

### To switch back to real backend:
Replace the import in `main.jsx` with:
```javascript
import { backend } from 'declarations/backend';
```

## 🎉 You're Ready to Develop!

Your chatbot is now running and ready for development. The mock backend will help you:
- Test the UI without needing the full IC setup
- Develop new features quickly
- Prototype different conversation flows

When you're ready for full IC deployment, follow the setup steps above to install DFX properly.

Happy coding! 🚀
