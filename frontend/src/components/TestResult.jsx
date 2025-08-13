// Test Results Component
const TestResults = ({ test, answers, questions, onComplete }) => {
  const correctAnswers = Object.entries(answers).filter(
    ([questionIndex, answerIndex]) => questions[questionIndex].correct === answerIndex
  ).length;
  
  const score = Math.round((correctAnswers / questions.length) * 100);
  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Test Completed!</h3>
        <p className="text-gray-600">{test.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-3xl font-bold text-blue-600">{score}%</p>
          <p className="text-sm text-blue-600 font-medium">Score</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-3xl font-bold text-green-600">{correctAnswers}/{questions.length}</p>
          <p className="text-sm text-green-600 font-medium">Correct</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-3xl font-bold text-purple-600">{grade}</p>
          <p className="text-sm text-purple-600 font-medium">Grade</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onComplete}
          className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 font-medium"
        >
          Back to Tests
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Review Answers
        </button>
      </div>
    </div>
  );

};

  export default TestResults;
