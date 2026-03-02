interface Question {
  id: number;
  type: 'multiple_choice' | 'free_response';
  question: string;
  options?: string[];
}

interface QuizFormProps {
  questions: Question[];
  answers: Record<string, string>;
  onChange: (answers: Record<string, string>) => void;
}

export default function QuizForm({ questions, answers, onChange }: QuizFormProps) {
  const updateAnswer = (questionId: string, value: string) => {
    onChange({
      ...answers,
      [questionId]: value,
    });
  };

  return (
    <div className="space-y-8">
      {questions.map((q) => (
        <div key={q.id} className="space-y-3">
          <p className="text-white font-medium">
            {q.id}. {q.question}
          </p>

          {q.type === 'multiple_choice' && q.options && (
            <div className="space-y-2 pl-4">
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={option.charAt(0)}
                    checked={answers[q.id.toString()] === option.charAt(0)}
                    onChange={(e) => updateAnswer(q.id.toString(), e.target.value)}
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
              onChange={(e) => updateAnswer(q.id.toString(), e.target.value)}
              placeholder="Enter your response..."
              className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}
