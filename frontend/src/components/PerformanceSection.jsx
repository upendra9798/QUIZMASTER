// Performance Section Component
import React, { useState } from 'react';
import { Trophy, Target, Clock, Award, TrendingUp, Brain } from 'lucide-react';

const PerformanceSection = ({ stats }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Sample performance data
  const performanceData = {
    overall: {
      testsCompleted: stats.testsCompleted || 12,
      averageScore: stats.averageScore || 78,
      totalStudyTime: stats.totalStudyTime || 24,
      streakDays: stats.studyStreak || 7,
      improvement: '+12%'
    },
    subjects: {
      'Physics': { score: 85, tests: 4, improvement: '+15%' },
      'Mathematics': { score: 72, tests: 3, improvement: '+8%' },
      'Chemistry': { score: 79, tests: 3, improvement: '+10%' },
      'Biology': { score: 81, tests: 2, improvement: '+18%' }
    },
    weeklyProgress: [
      { day: 'Mon', score: 75 },
      { day: 'Tue', score: 82 },
      { day: 'Wed', score: 78 },
      { day: 'Thu', score: 85 },
      { day: 'Fri', score: 88 },
      { day: 'Sat', score: 79 },
      { day: 'Sun', score: 83 }
    ],
    weakTopics: [
      { topic: 'Organic Chemistry', accuracy: 45, needsWork: true },
      { topic: 'Calculus Integration', accuracy: 52, needsWork: true },
      { topic: 'Quantum Physics', accuracy: 67, needsWork: false },
      { topic: 'Cell Biology', accuracy: 71, needsWork: false }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Header and Time Range Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
          <p className="text-sm text-gray-600">Track your learning progress and identify areas for improvement</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Overall Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {performanceData.overall.improvement}
            </span>
          </div>
          <h4 className="text-2xl font-bold text-blue-900">{performanceData.overall.testsCompleted}</h4>
          <p className="text-blue-700 font-medium">Tests Completed</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +5%
            </span>
          </div>
          <h4 className="text-2xl font-bold text-green-900">{performanceData.overall.averageScore}%</h4>
          <p className="text-green-700 font-medium">Average Score</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +2h
            </span>
          </div>
          <h4 className="text-2xl font-bold text-purple-900">{performanceData.overall.totalStudyTime}h</h4>
          <p className="text-purple-700 font-medium">Study Time</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h4 className="text-2xl font-bold text-orange-900">{performanceData.overall.streakDays}</h4>
          <p className="text-orange-700 font-medium">Day Streak</p>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">Subject Performance</h4>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Subjects</option>
            {Object.keys(performanceData.subjects).map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(performanceData.subjects).map(([subject, data]) => (
            <div key={subject} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">{subject}</h5>
                <span className={`text-sm font-bold ${getScoreColor(data.score)}`}>
                  {data.score}%
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tests: {data.tests}</span>
                  <span className="text-green-600 font-medium">{data.improvement}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      data.score >= 80 ? 'bg-green-500' :
                      data.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Weekly Progress</h4>
        
        <div className="space-y-4">
          {performanceData.weeklyProgress.map((day, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    day.score >= 80 ? 'bg-green-500' :
                    day.score >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${day.score}%` }}
                />
              </div>
              <div className="w-12 text-sm font-bold text-right">{day.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Topics Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h4 className="text-lg font-semibold text-gray-900">Areas for Improvement</h4>
        </div>

        <div className="space-y-4">
          {performanceData.weakTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  topic.needsWork ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <h5 className="font-medium text-gray-900">{topic.topic}</h5>
                  <p className="text-sm text-gray-600">
                    {topic.accuracy}% accuracy • {topic.needsWork ? 'Needs immediate attention' : 'Monitor progress'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-sm font-bold ${getScoreColor(topic.accuracy)}`}>
                    {topic.accuracy}%
                  </div>
                </div>
                <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                  Practice
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-blue-900 mb-2">AI Recommendations</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Focus on Organic Chemistry - practice 15 minutes daily</li>
                <li>• Review Calculus Integration fundamentals</li>
                <li>• Take practice tests on weak topics before main exams</li>
                <li>• Consider scheduling study sessions during your peak hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;