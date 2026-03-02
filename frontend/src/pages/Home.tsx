import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { PROBLEMS } from '../data/problems';

export default function Home() {
  const { getStats } = useProgress();
  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">
          Learn Research Through Practice
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
          ThinkResearch teaches research methodology through progressive,
          hands-on challenges. Read papers, design experiments, implement algorithms,
          and develop your research intuition.
        </p>
        <Link
          to="/problems"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Start Learning
        </Link>
      </div>

      {/* Quick Stats */}
      {stats.completedCount > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 mb-16 max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.level}</div>
              <div className="text-sm text-slate-400">Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.completedCount}</div>
              <div className="text-sm text-slate-400">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.totalXp}</div>
              <div className="text-sm text-slate-400">XP</div>
            </div>
          </div>
        </div>
      )}

      {/* Problem Types */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Four Types of Challenges
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-white mb-2">Paper Analysis</h3>
            <p className="text-slate-400">
              Read paper excerpts and answer comprehension questions.
              Identify key contributions, methodology, and limitations.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-white mb-2">Experiment Design</h3>
            <p className="text-slate-400">
              Given a research question, design experiments,
              choose metrics, and identify variables.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-white mb-2">Replication Coding</h3>
            <p className="text-slate-400">
              Implement algorithms from papers. Test your code
              against expected outputs.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-white mb-2">Research Pipeline</h3>
            <p className="text-slate-400">
              Complete end-to-end research projects: from literature
              review to implementation to writeup.
            </p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          ML/AI Fundamentals
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Transformers', 'Optimization', 'RNNs', 'Methodology', 'Critical Thinking'].map((topic) => (
            <span
              key={topic}
              className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Count */}
      <div className="text-center bg-slate-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          {PROBLEMS.length} Problems Available
        </h2>
        <p className="text-slate-400 mb-6">
          From easy introductions to challenging research projects
        </p>
        <Link
          to="/problems"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Browse Problems
        </Link>
      </div>
    </div>
  );
}
