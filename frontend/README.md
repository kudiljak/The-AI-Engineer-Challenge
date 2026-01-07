# Space NASA Chat Frontend

A beautiful Next.js frontend application with a space/NASA theme that integrates with the FastAPI backend chat service. This application provides a supportive mental coach interface with animated starfield and a modern, accessible UI.

## Features

- 🚀 **Space NASA Theme**: Immersive space aesthetic with deep space backgrounds, NASA red/orange accents, and animated twinkling stars
- 💬 **Real-time Chat Interface**: Seamless integration with the backend API
- 🎨 **Accessible Design**: High contrast colors, clear typography, and keyboard navigation
- 📱 **Responsive Layout**: Works beautifully on desktop, tablet, and mobile devices
- ✨ **Smooth Animations**: Twinkling starfield and smooth message transitions

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

The application follows a consistent space/NASA color palette:

- **Primary**: NASA red/orange (#FC3D21)
- **Secondary**: NASA blue (#0B3D91)
- **Accent**: Gold (#FFD700)
- **Background**: Deep space gradient (dark blue-black #0A0E27 to #1A1F3A to NASA blue)
- **Surface**: Dark space surfaces (#1A1F3A, #252B4A)
- **Text**: White (#FFFFFF) and light blue-gray (#B8C5D6) for excellent contrast

All colors are carefully chosen to ensure sufficient contrast for accessibility compliance while maintaining the immersive space atmosphere.

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
│   ├── Stars.tsx          # Animated starfield component
│   └── Stars.module.css
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
