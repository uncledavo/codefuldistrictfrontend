import { Editor } from './components/Editor.tsx';
import './App.css';
import { Preview } from './components/Preview.tsx';

function App() {
  const frameUrl = 'https://frame.town/fiobmxa8/0'; // Placeholder 
  const frame = {}; // Placeholder
  
  return (
    <>
      <Editor />
      <Preview frame={frame} url={frameUrl} />
    </>
  );
}

export default App;