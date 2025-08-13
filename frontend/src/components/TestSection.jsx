// Test Section Component
const TestSection = () => {
  const [availableTests, setAvailableTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);

  return (
    <div className="space-y-6">
      {!activeTest ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Available Tests</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500">
                <option>All Subjects</option>
                <option>Recent</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sample test cards */}
            {[
              { title: 'Physics - Mechanics', questions: 15, duration: '20 min', difficulty: 'Medium' },
              { title: 'Mathematics - Calculus', questions: 12, duration: '15 min', difficulty: 'Hard' },
              { title: 'Chemistry - Organic', questions: 10, duration: '12 min', difficulty: 'Easy' },
              { title: 'Biology - Cell Structure', questions: 18, duration: '25 min', difficulty: 'Medium' },
            ].map((test, index) => (
              <TestCard key={index} test={test} onStart={() => setActiveTest(test)} />
            ))}
          </div>
        </>
      ) : (
        <TestInterface test={activeTest} onComplete={() => setActiveTest(null)} />
      )}
    </div>
  );
};

export default TestSection;