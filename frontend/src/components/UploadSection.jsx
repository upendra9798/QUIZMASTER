// Upload Section Component
import { Image, FileText, Trash2, Upload, RefreshCw, Brain, Play } from "lucide-react";
import React, { useState } from "react";
// import GeneratedQuestionsPreview from "./GeneratedQuestionsPreview"; // Assuming this is a separate component for previewing generated questions
import { useNavigate } from "react-router-dom";

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [questionType, setQuestionType] = useState('mcq');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const generateQuestions = async () => {
    if (!uploadedFile) return;
    
    setGenerating(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('questionType', questionType);
      formData.append('questionCount', questionCount);
      formData.append('difficulty', difficulty);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/questions/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      setGeneratedQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Study Material</h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
                {uploadedFile.type.startsWith('image/') ? (
                  <Image className="w-5 h-5 text-blue-600" />
                ) : (
                  <FileText className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drop your PDF or image here, or{' '}
                <label className="text-indigo-600 hover:text-indigo-500 cursor-pointer font-medium">
                  browse files
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">Supports PDF, JPG, PNG files up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Question Generation Options */}
      {uploadedFile && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Generation Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="true_false">True/False</option>
                <option value="short_answer">Short Answer</option>
                <option value="mixed">Mixed Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateQuestions}
            disabled={generating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
          >
            {generating ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating Questions...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4" />
                Generate Questions with AI
              </div>
            )}
          </button>
        </div>
      )}

      {/* Generated Questions Preview */}
      {generatedQuestions && (
        <GeneratedQuestionsPreview 
          questions={generatedQuestions}
          onStartTest={() => {/* Navigate to test */}}
        />
      )}
    </div>
  );
};

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

export default UploadSection;