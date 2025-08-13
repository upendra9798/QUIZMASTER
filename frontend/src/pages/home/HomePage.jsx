import React, { useState, useEffect } from 'react';
import { 
  Upload, FileText, Image, BookOpen, Clock, Trophy, 
  TrendingUp, ChevronRight, Play, BarChart3, Brain,
  Target, Award, Calendar, Download, Eye, Trash2,
  Plus, Filter, Search, RefreshCw
} from 'lucide-react';
import Header from '../../components/header/Header.jsx';
import QuickStats from '../../components/QuickStats.jsx';
import UploadSection from '../../components/UploadSection.jsx';
// import TestSection from '../../components/TestSection.jsx';

const Home = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(false);

  // Tabs data
  const tabs = [
    { id: 'upload', label: 'Upload & Generate', icon: Upload },
    { id: 'test', label: 'Take Test', icon: Brain },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
  ];

  useEffect(() => {
    fetchUserData();
    fetchUserHistory();
    fetchUserStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/getMe', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserHistory(data.history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserStats(data.stats || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600">Ready to learn something new today?</p>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={userStats} />

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'upload' && <UploadSection />}
            {activeTab === 'test' && <TestSection />}
            {activeTab === 'history' && <HistorySection history={userHistory} />}
            {activeTab === 'performance' && <PerformanceSection stats={userStats} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;