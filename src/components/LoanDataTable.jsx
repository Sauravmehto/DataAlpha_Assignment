import { useState, useMemo } from 'react';
import { useLoanData } from '@/hooks/useLoanData';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  TrendingUp,
  Building2,
  MapPin,
  User,
  Home,
  DollarSign,
  Percent,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

// Tooltip Component
const Tooltip = ({ children, content, maxLength = 15 }) => {
  const shouldShowTooltip = content && content.length > maxLength;
  
  if (!shouldShowTooltip) {
    return <span>{children}</span>;
  }

  return (
    <div className="relative group">
      <span className="cursor-help">
        {children}
      </span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        <div className="text-xs font-mono">
          {content}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export const LoanDataTable = () => {
  const { data: loans, isLoading, error } = useLoanData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyStateFilter, setPropertyStateFilter] = useState('all');
  const [ownershipTypeFilter, setOwnershipTypeFilter] = useState('all');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get unique values for filters
  const uniqueStates = useMemo(() => {
    if (!loans) return [];
    return [...new Set(loans.map(loan => loan.PROPERTY_STATE))].sort();
  }, [loans]);

  const uniqueOwnershipTypes = useMemo(() => {
    if (!loans) return [];
    return [...new Set(loans.map(loan => loan.OWNERSHIP_TYPE))].sort();
  }, [loans]);

  // Filter and sort data
  const filteredAndSortedLoans = useMemo(() => {
    if (!loans) return [];

    let filtered = loans.filter(loan => {
      const matchesSearch = searchTerm === '' || 
        Object.values(loan).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesState = propertyStateFilter === 'all' || 
        loan.PROPERTY_STATE === propertyStateFilter;
      
      const matchesOwnership = ownershipTypeFilter === 'all' || 
        loan.OWNERSHIP_TYPE === ownershipTypeFilter;

      return matchesSearch && matchesState && matchesOwnership;
    });

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        let comparison = 0;
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [loans, searchTerm, propertyStateFilter, ownershipTypeFilter, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredAndSortedLoans.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, propertyStateFilter, ownershipTypeFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') setSortField(null);
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4 text-blue-600" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4 text-blue-600" />;
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  const formatCurrency = (value) => {
    if (typeof value === 'string' && value.includes(',')) return value;
    if (typeof value === 'number') return value.toLocaleString();
    return value;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PAID_CLOSED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'ACTIVE':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID_CLOSED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'ACTIVE':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Loading Portfolio Data</h3>
            <p className="text-gray-500">Fetching your loan information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Unable to Load Data</h3>
            <p className="text-gray-600">We're having trouble fetching your loan portfolio. Please try again later.</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/20">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Portfolio Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Loan Portfolio Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced analytics and insights for your loan portfolio with real-time filtering, sorting, and comprehensive data visualization
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{loans?.length || 0}</p>
                  <p className="text-xs text-gray-600">Total Loans</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{filteredAndSortedLoans.length}</p>
                  <p className="text-xs text-gray-600">Filtered Results</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{uniqueStates.length}</p>
                  <p className="text-xs text-gray-600">States Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Global Search */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Search className="w-3 h-3" />
                Global Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search across all fields..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* Property State Filter */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                Property State
              </label>
              <div className="relative">
                <select
                  value={propertyStateFilter}
                  onChange={(e) => setPropertyStateFilter(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="all">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Ownership Type Filter */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-3 h-3" />
                Ownership Type
              </label>
              <div className="relative">
                <select
                  value={ownershipTypeFilter}
                  onChange={(e) => setOwnershipTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  {uniqueOwnershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700">Results Summary</label>
              <div className="flex items-center h-12 px-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-blue-700">
                    {filteredAndSortedLoans.length} of {loans?.length || 0} loans
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-6 lg:px-8 py-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Loan Data</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  {[
                    { key: 'LOAN_ID', label: 'Loan ID', icon: Building2 },
                    { key: 'LOAN_PROGRAM', label: 'Program', icon: TrendingUp },
                    { key: 'PROPERTY_STATE', label: 'State', icon: MapPin },
                    { key: 'PROPERTY_CITY', label: 'City', icon: MapPin },
                    { key: 'OWNERSHIP_TYPE', label: 'Ownership', icon: User },
                    { key: 'PROPERTY_TYPE', label: 'Property Type', icon: Home },
                    { key: 'LOAN_STATUS', label: 'Status', icon: CheckCircle },
                    { key: 'ORIGINAL_INTEREST_RATE', label: 'Rate', icon: Percent },
                    { key: 'PROPERTY_ORIG_VALUE', label: 'Original Value', icon: DollarSign },
                    { key: 'ORIGINAL_LOAN_BAL', label: 'Loan Balance', icon: DollarSign },
                  ].map(({ key, label, icon: Icon }) => (
                    <th key={key} className="px-4 lg:px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort(key)}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                      >
                        <Icon className="w-3 h-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                        <span>{label}</span>
                        {getSortIcon(key)}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentPageData.map((loan, index) => (
                  <tr key={loan.LOAN_ID} className={`hover:bg-blue-50/50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="relative group">
                          <span className="font-mono text-xs text-gray-600 font-medium cursor-help">
                            {loan.LOAN_ID.slice(0, 8)}...
                          </span>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            <div className="font-mono text-xs">
                              {loan.LOAN_ID}
                            </div>
                            {/* Tooltip arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        <TrendingUp className="w-3 h-3" />
                        {loan.LOAN_PROGRAM}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-900">{loan.PROPERTY_STATE}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <Tooltip content={loan.PROPERTY_CITY} maxLength={15}>
                        <span className="text-xs text-gray-700">
                          {loan.PROPERTY_CITY.length > 15 ? `${loan.PROPERTY_CITY.slice(0, 15)}...` : loan.PROPERTY_CITY}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        <User className="w-3 h-3" />
                        {loan.OWNERSHIP_TYPE}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <Tooltip content={loan.PROPERTY_TYPE} maxLength={20}>
                        <span className="text-xs text-gray-700">
                          {loan.PROPERTY_TYPE.length > 20 ? `${loan.PROPERTY_TYPE.slice(0, 20)}...` : loan.PROPERTY_TYPE}
                        </span>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(loan.LOAN_STATUS)}`}>
                        {getStatusIcon(loan.LOAN_STATUS)}
                        {loan.LOAN_STATUS}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-900">{loan.ORIGINAL_INTEREST_RATE}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-gray-900">${formatCurrency(loan.PROPERTY_ORIG_VALUE)}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-900">${formatCurrency(loan.ORIGINAL_LOAN_BAL)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedLoans.length === 0 && (
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">No loans found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results</p>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 lg:px-8 py-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-600">
                  Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                  <span className="font-semibold">{Math.min(endIndex, filteredAndSortedLoans.length)}</span> of{' '}
                  <span className="font-semibold">{filteredAndSortedLoans.length}</span> results
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 text-xs font-medium rounded-lg transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <div className="flex items-center justify-center w-8 h-8">
                        <MoreHorizontal className="w-3 h-3 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};