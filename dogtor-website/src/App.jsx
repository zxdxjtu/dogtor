import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Download from './pages/Download';
import About from './pages/About';
import Docs from './pages/Docs';
import './App.css';

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/download" element={<Download />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;
