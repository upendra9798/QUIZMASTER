// Test Card Component
const TestCard = ({ test, onStart }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="font-semibold text-gray-900">{test.title}</h4>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {test.questions} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {test.duration}
          </span>
        </div>
      </div>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
        test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {test.difficulty}
      </span>
    </div>
    
    <button
      onClick={onStart}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
    >
      <Play className="w-4 h-4" />
      Start Test
    </button>
  </div>
);

export default TestCard;