import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemBySlug, Problem as ProblemType, Question } from '../data/problems';
import { useProgress } from '../hooks/useProgress';

interface SubmissionResult {
  score: number;
  feedback: {
    correct?: number;
    total?: number;
    earned_points?: number;
    total_points?: number;
    details?: Array<{
      question_id?: string;
      correct?: boolean;
      matched_criteria?: string[];
      missing_criteria?: string[];
    }>;
  };
}

const DIFFICULTY_LABELS = ['', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'];

// Simple keyword matching evaluator
function evaluateResponses(
  answers: Record<string, string>,
  questions: Question[]
): SubmissionResult {
  let correctCount = 0;
  let totalMcq = 0;
  let earnedPoints = 0;
  let totalPoints = 0;
  const details: SubmissionResult['feedback']['details'] = [];

  for (const q of questions) {
    const userAnswer = answers[q.id.toString()] || '';

    if (q.type === 'multiple_choice' && q.correct) {
      totalMcq++;
      const isCorrect = userAnswer.trim().toUpperCase() === q.correct.trim().toUpperCase();
      if (isCorrect) correctCount++;
      details.push({
        question_id: q.id.toString(),
        correct: isCorrect,
      });
    }

    if (q.type === 'free_response' && q.rubric) {
      const matched: string[] = [];
      const missing: string[] = [];
      const responseLower = userAnswer.toLowerCase();

      for (const criterion of q.rubric) {
        // Extract keywords (words > 3 chars, excluding common words)
        const stopWords = ['mentions', 'discusses', 'explains', 'describes', 'the', 'and', 'for'];
        const keywords = criterion.toLowerCase()
          .split(/\s+/)
          .filter(w => w.length > 3 && !stopWords.includes(w));

        // Check if at least half of keywords are present
        const matchCount = keywords.filter(kw => responseLower.includes(kw)).length;
        if (matchCount >= keywords.length / 2) {
          matched.push(criterion);
          earnedPoints++;
        } else {
          missing.push(criterion);
        }
        totalPoints++;
      }

      details.push({
        question_id: q.id.toString(),
        matched_criteria: matched,
        missing_criteria: missing,
      });
    }
  }

  // Calculate overall score
  let score = 0;
  if (totalMcq > 0 && totalPoints > 0) {
    // Mixed: weight MCQ and free response equally
    const mcqScore = (correctCount / totalMcq) * 50;
    const frScore = (earnedPoints / totalPoints) * 50;
    score = mcqScore + frScore;
  } else if (totalMcq > 0) {
    score = (correctCount / totalMcq) * 100;
  } else if (totalPoints > 0) {
    score = (earnedPoints / totalPoints) * 100;
  }

  return {
    score,
    feedback: {
      correct: correctCount,
      total: totalMcq,
      earned_points: earnedPoints,
      total_points: totalPoints,
      details,
    },
  };
}

export default function Problem() {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<ProblemType | null>(null);
  const [code, setCode] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [showHints, setShowHints] = useState(false);
  const { updateProgress, getProblemProgress } = useProgress();

  useEffect(() => {
    if (slug) {
      const p = getProblemBySlug(slug);
      if (p) {
        setProblem(p);
        if (p.content_json.starter_code) {
          setCode(p.content_json.starter_code);
        }
      }
    }
  }, [slug]);

  const progress = slug ? getProblemProgress(slug) : null;

  const handleSubmit = () => {
    if (!problem || !slug) return;

    // For non-code problems, evaluate locally
    if (problem.problem_type !== 'replication' && problem.content_json.questions) {
      const evalResult = evaluateResponses(answers, problem.content_json.questions);
      setResult(evalResult);
      updateProgress(slug, evalResult.score, problem.difficulty);
    } else {
      // For code problems, just save the attempt (no execution in browser)
      setResult({
        score: 0,
        feedback: {
          details: [{
            question_id: 'code',
            matched_criteria: ['Code submitted - manual review needed'],
            missing_criteria: ['Note: Code execution not available in static mode'],
          }],
        },
      });
      updateProgress(slug, 50, problem.difficulty); // Partial credit for attempting
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-400">Problem not found</div>
      </div>
    );
  }

  const isCodeProblem = problem.problem_type === 'replication';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
          <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
            {DIFFICULTY_LABELS[problem.difficulty]}
          </span>
          {progress?.status === 'completed' && (
            <span className="text-green-400 text-sm">✓ Completed ({progress.bestScore.toFixed(0)}%)</span>
          )}
        </div>
        <p className="text-slate-400">{problem.description}</p>
      </div>

      <div className={`grid ${isCodeProblem ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
        {/* Left Panel: Problem Content */}
        <div className="space-y-6">
          {/* Paper Excerpt */}
          {problem.content_json.paper_excerpt && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Paper Excerpt</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed font-sans">
                  {problem.content_json.paper_excerpt}
                </pre>
              </div>
            </div>
          )}

          {/* Scenario */}
          {problem.content_json.scenario && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Scenario</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed font-sans">
                  {problem.content_json.scenario}
                </pre>
              </div>
            </div>
          )}

          {/* Description (for replication) */}
          {problem.content_json.description && isCodeProblem && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed font-sans">
                  {problem.content_json.description}
                </pre>
              </div>
            </div>
          )}

          {/* Hints */}
          {problem.content_json.hints && problem.content_json.hints.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-6">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
              {showHints && (
                <ul className="mt-4 space-y-2">
                  {problem.content_json.hints.map((hint, i) => (
                    <li key={i} className="text-slate-400 flex gap-2">
                      <span>•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Questions (non-code problems) */}
          {!isCodeProblem && problem.content_json.questions && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Questions</h2>
              <div className="space-y-8">
                {problem.content_json.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <p className="text-white font-medium">{q.id}. {q.question}</p>

                    {q.type === 'multiple_choice' && q.options && (
                      <div className="space-y-2 pl-4">
                        {q.options.map((option, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              value={option.charAt(0)}
                              checked={answers[q.id.toString()] === option.charAt(0)}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [q.id.toString()]: e.target.value,
                                }))
                              }
                              className="w-4 h-4 text-emerald-600"
                            />
                            <span className="text-slate-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {q.type === 'free_response' && (
                      <textarea
                        value={answers[q.id.toString()] || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id.toString()]: e.target.value,
                          }))
                        }
                        placeholder="Enter your response..."
                        className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Code Editor (for replication problems) */}
        {isCodeProblem && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-700 px-4 py-2 text-sm text-slate-300">Python</div>
              <Editor
                height="400px"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
            <p className="text-slate-500 text-sm">
              Note: Code execution is not available in static mode.
              Copy your code and test it locally in Python.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Submit
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className={`mt-8 rounded-lg p-6 ${
          result.score >= 70
            ? 'bg-green-900/30 border border-green-700'
            : 'bg-slate-800'
        }`}>
          <h3 className="text-xl font-semibold text-white mb-4">Results</h3>

          <div className="mb-4">
            <span className="text-3xl font-bold text-white">{result.score.toFixed(0)}%</span>
            <span className="text-slate-400 ml-2">
              {result.score >= 100
                ? 'Perfect!'
                : result.score >= 70
                ? 'Great job!'
                : result.score >= 50
                ? 'Getting there!'
                : 'Keep trying!'}
            </span>
          </div>

          {/* Question Results */}
          {result.feedback.correct !== undefined && result.feedback.total !== undefined && result.feedback.total > 0 && (
            <div className="mb-4">
              <span className="text-green-400">{result.feedback.correct} correct</span>
              {' / '}
              <span className="text-slate-400">{result.feedback.total} multiple choice</span>
            </div>
          )}

          {/* Free Response Results */}
          {result.feedback.earned_points !== undefined && result.feedback.total_points !== undefined && result.feedback.total_points > 0 && (
            <div className="mb-4">
              <span className="text-emerald-400">{result.feedback.earned_points}</span>
              {' / '}
              <span className="text-slate-400">{result.feedback.total_points} rubric criteria matched</span>
            </div>
          )}

          {/* Detailed Feedback */}
          {result.feedback.details && result.feedback.details.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold text-white">Details</h4>
              {result.feedback.details.map((detail, i) => (
                <div
                  key={i}
                  className={`p-3 rounded ${
                    detail.correct || (detail.matched_criteria && detail.matched_criteria.length > 0)
                      ? 'bg-green-900/30'
                      : 'bg-red-900/30'
                  }`}
                >
                  {detail.question_id && (
                    <div className="text-sm text-slate-400 mb-1">Question {detail.question_id}</div>
                  )}
                  {detail.correct !== undefined && (
                    <div className={detail.correct ? 'text-green-400' : 'text-red-400'}>
                      {detail.correct ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  )}
                  {detail.matched_criteria && detail.matched_criteria.length > 0 && (
                    <div className="text-green-400 text-sm">
                      Matched: {detail.matched_criteria.join(', ')}
                    </div>
                  )}
                  {detail.missing_criteria && detail.missing_criteria.length > 0 && (
                    <div className="text-red-400 text-sm">
                      Missing: {detail.missing_criteria.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
