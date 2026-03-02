import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Problem from './pages/Problem';
import Profile from './pages/Profile';

function NavBar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-emerald-400">
              ThinkResearch
            </Link>
            <div className="flex space-x-4">
              <Link to="/problems" className="text-slate-300 hover:text-white px-3 py-2">
                Problems
              </Link>
              <Link to="/profile" className="text-slate-300 hover:text-white px-3 py-2">
                Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:slug" element={<Problem />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
