# Winter Wonderland Chat Frontend

A beautiful Next.js frontend application with a winter wonderland theme that integrates with the FastAPI backend chat service. This application provides a supportive mental coach interface with animated snowflakes and a modern, accessible UI.

## Features

- ❄️ **Winter Wonderland Theme**: Beautiful snowy aesthetic with cool blues, whites, and animated snowflakes
- 💬 **Real-time Chat Interface**: Seamless integration with the backend API
- 🎨 **Accessible Design**: High contrast colors, clear typography, and keyboard navigation
- 📱 **Responsive Layout**: Works beautifully on desktop, tablet, and mobile devices
- ✨ **Smooth Animations**: Floating snowflakes and smooth message transitions

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- The backend API running on `http://localhost:8000` (see `/api/README.md` for backend setup)

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

1. Make sure your backend is running on `http://localhost:8000`:
   ```bash
   # From the project root
   uv run uvicorn api.index:app --reload
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

The frontend will automatically reload when you make changes to the code.

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Color Scheme

The application follows a consistent winter wonderland color palette:

- **Primary**: Soft ice blue (#4A90E2)
- **Secondary**: Sky blue accent (#87CEEB)
- **Background**: Alice blue gradient (#F0F8FF to #E0F2FE)
- **Surface**: Pure white (#FFFFFF) with light blue tints
- **Text**: Deep blue-gray (#1E3A5F) for excellent contrast

All colors are carefully chosen to ensure sufficient contrast for accessibility compliance.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main page component
│   ├── page.module.css     # Page styles
│   └── globals.css         # Global styles and theme
├── components/
│   ├── ChatInterface.tsx  # Main chat component
│   ├── ChatInterface.module.css
│   ├── Snowflakes.tsx      # Animated snowflake component
│   └── Snowflakes.module.css
├── package.json
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## API Integration

The frontend communicates with the backend API through Next.js rewrites configured in `next.config.js`. The chat endpoint is:

- **POST** `/api/chat`
- **Request Body**: `{ "message": "string" }`
- **Response**: `{ "reply": "string" }`

## Troubleshooting

### Backend Connection Issues

If you see errors about connecting to the backend:

1. Ensure the backend is running on `http://localhost:8000`
2. Check that CORS is properly configured in the backend (it should allow all origins in development)
3. Verify the `OPENAI_API_KEY` environment variable is set for the backend

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
```

Or change the port:
```bash
npm run dev -- -p 3001
```

## Deployment

This frontend is designed to work with Vercel. To deploy:

1. Make sure your project is connected to a Git repository
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` from the project root
4. Follow the prompts to deploy

The frontend will automatically detect Next.js and configure the deployment accordingly.

## Accessibility

- All text meets WCAG contrast requirements
- Keyboard navigation is fully supported
- Focus states are clearly visible
- Error messages include both visual indicators (⚠️) and text descriptions
- Form inputs have proper labels and ARIA attributes
