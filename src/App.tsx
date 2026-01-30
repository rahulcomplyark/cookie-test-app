import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { TrackerProvider } from './context/TrackerContext';
import TrackerManager from './components/TrackerManager';
import GhostTracker from './components/GhostTracker';

import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <TrackerProvider>
      <TrackerManager />
      <GhostTracker />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrackerProvider>
  );
}

export default App;
