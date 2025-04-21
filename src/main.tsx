import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Note: Using StrictMode conditionally for React Beautiful DnD compatibility
// React Beautiful DnD has known issues with React 18's Strict Mode
// For production, you would want to handle this differently
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

if (process.env.NODE_ENV === 'production') {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // In development, disable StrictMode to avoid issues with react-beautiful-dnd
  root.render(<App />);
}
