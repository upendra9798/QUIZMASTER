// Generated Questions Preview Component
const GeneratedQuestionsPreview = ({ questions, onStartTest }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Generated Questions</h3>
      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
        {questions.length} Questions
      </span>
    </div>

    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
      {questions.slice(0, 3).map((question, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium text-gray-900 mb-2">
            {index + 1}. {question.question}
          </p>
          {question.type === 'mcq' && (
            <div className="space-y-1">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="text-sm text-gray-600 ml-4">
                  {String.fromCharCode(65 + optionIndex)}) {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {questions.length > 3 && (
        <p className="text-center text-gray-500 text-sm">
          ... and {questions.length - 3} more questions
        </p>
      )}
    </div>

    <div className="flex gap-3">
      <button
        onClick={onStartTest}
        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Play className="w-4 h-4" />
        Start Test Now
      </button>
      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
        Save for Later
      </button>
    </div>
  </div>
);

export default GeneratedQuestionsPreview;