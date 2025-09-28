import React, { useState } from 'react';
import { 
  Search, Brain, Upload, FileText, Trophy, Clock, Eye, Download, RefreshCw 
} from 'lucide-react';
import { HiBookOpen } from "react-icons/hi";

const HistorySection = ({ history }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // show 10 items per page

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'score':
        return (b.score || 0) - (a.score || 0);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = sortedHistory.slice(startIndex, startIndex + itemsPerPage);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'test': return <Brain className="w-4 h-4" />;
      case 'upload': return <Upload className="w-4 h-4" />;
      case 'study': return <HiBookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'test': return 'bg-blue-100 text-blue-800';
      case 'upload': return 'bg-green-100 text-green-800';
      case 'study': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Learning History</h3>
          <p className="text-sm text-gray-600">Track your learning journey and progress</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
              className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          {['all', 'test', 'upload', 'study'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => {
                setFilter(filterOption);
                setCurrentPage(1); // reset to first page on filter change
              }}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === filterOption
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // reset to first page on sort change
            }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="score">Highest Score</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* History Items */}
      <div className="space-y-3">
        {paginatedHistory.length === 0 ? (
          <div className="text-center py-12">
            <HiBookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No history found</h4>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your filters or search terms' 
                : 'Start learning to see your history here'}
            </p>
          </div>
        ) : (
          paginatedHistory.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.subject}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {item.score !== undefined && (
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span className={item.score >= 80 ? 'text-green-600 font-medium' : 
                                        item.score >= 60 ? 'text-yellow-600 font-medium' : 
                                        'text-red-600 font-medium'}>
                            {item.score}%
                          </span>
                        </div>
                      )}
                      
                      {item.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                      
                      {item.questionsCount && (
                        <div className="flex items-center gap-1">
                          <HiBookOpen className="w-4 h-4" />
                          <span>{item.questionsCount} questions</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  {item.type === 'test' && (
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar for Tests */}
              {item.type === 'test' && item.score !== undefined && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-medium">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        item.score >= 80 ? 'bg-green-500' :
                        item.score >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
              currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HistorySection;
