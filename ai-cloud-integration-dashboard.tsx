import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Users, PhoneCall, AlertCircle, CheckCircle, Activity, Calendar, Clock3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CXoneHealthcareDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeAgents: 0,
    callsWaiting: 0,
    averageHandleTime: 0,
    complianceScore: 0
  });
  const [callVolumeData, setCallVolumeData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [callTypeData, setCallTypeData] = useState([]);
  const [complianceAlerts, setComplianceAlerts] = useState([]);

  // Simulated data fetch
  useEffect(() => {
    // In a real app, this would be an API call to the CXone backend
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated data
      setStats({
        activeAgents: 24,
        callsWaiting: 7,
        averageHandleTime: 286,
        complianceScore: 92
      });
      
      setCallVolumeData([
        { hour: '8AM', calls: 42 },
        { hour: '9AM', calls: 78 },
        { hour: '10AM', calls: 95 },
        { hour: '11AM', calls: 85 },
        { hour: '12PM', calls: 65 },
        { hour: '1PM', calls: 72 },
        { hour: '2PM', calls: 84 },
        { hour: '3PM', calls: 76 }
      ]);
      
      setSentimentData([
        { hour: '8AM', positive: 72, neutral: 20, negative: 8 },
        { hour: '9AM', positive: 68, neutral: 22, negative: 10 },
        { hour: '10AM', positive: 65, neutral: 25, negative: 10 },
        { hour: '11AM', positive: 70, neutral: 20, negative: 10 },
        { hour: '12PM', positive: 68, neutral: 24, negative: 8 },
        { hour: '1PM', positive: 72, neutral: 18, negative: 10 },
        { hour: '2PM', positive: 70, neutral: 20, negative: 10 }
      ]);
      
      setCallTypeData([
        { name: 'Appointments', value: 35 },
        { name: 'Billing', value: 25 },
        { name: 'Prescription', value: 18 },
        { name: 'Test Results', value: 12 },
        { name: 'Other', value: 10 }
      ]);
      
      setComplianceAlerts([
        { id: 1, agentId: 'AGT-1234', callId: 'CALL-7890', issue: 'PHI disclosure without verification', severity: 'high', time: '10:23 AM' },
        { id: 2, agentId: 'AGT-5678', callId: 'CALL-4321', issue: 'Missing prescription verification step', severity: 'medium', time: '11:45 AM' },
        { id: 3, agentId: 'AGT-9012', callId: 'CALL-2345', issue: 'Insurance information handling protocol not followed', severity: 'medium', time: '1:12 PM' }
      ]);
      
      setLoading(false);
    };
    
    fetchDashboardData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchDashboardData, 300000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const SENTIMENT_COLORS = {
    positive: '#4CAF50',
    neutral: '#2196F3',
    negative: '#F44336'
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6">CXone Healthcare Contact Center Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-blue-900">Active Agents</h3>
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{stats.activeAgents}</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-amber-900">Calls Waiting</h3>
            <PhoneCall className="h-6 w-6 text-amber-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{stats.callsWaiting}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-green-900">Avg Handle Time</h3>
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{stats.averageHandleTime}s</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-purple-900">Compliance Score</h3>
            <CheckCircle className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{stats.complianceScore}%</p>
        </div>
      </div>
      
      {/* Main Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Call Volume Chart */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-medium mb-4">Today's Call Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calls" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Call Types Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-medium mb-4">Call Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={callTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {callTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Sentiment Analysis */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-medium mb-4">Customer Sentiment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="sentiment" fill={SENTIMENT_COLORS.positive} />
              <Bar dataKey="neutral" stackId="sentiment" fill={SENTIMENT_COLORS.neutral} />
              <Bar dataKey="negative" stackId="sentiment" fill={SENTIMENT_COLORS.negative} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Compliance Alerts */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-medium mb-4">Recent Compliance Alerts</h3>
          <div className="space-y-4">
            {complianceAlerts.map(alert => (
              <Alert key={alert.id} className={`${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' : 
                alert.severity === 'medium' ? 'border-amber-500 bg-amber-50' : 
                'border-blue-500 bg-blue-50'
              }`}>
                <AlertCircle className={`h-4 w-4 ${
                  alert.severity === 'high' ? 'text-red-500' : 
                  alert.severity === 'medium' ? 'text-amber-500' : 
                  'text-blue-500'
                }`} />
                <AlertTitle className="font-medium">
                  {alert.issue}
                </AlertTitle>
                <AlertDescription className="text-sm">
                  <div className="flex justify-between items-center">
                    <span>Agent: {alert.agentId} | Call: {alert.callId}</span>
                    <span className="text-gray-500">{alert.time}</span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-blue-900">AI-Powered Insights</h3>
        </div>
        <div className="space-y-3 text-blue-800">
          <p className="flex items-center gap-2">
            <span className="bg-blue-100 p-1 rounded">
              <Clock3 className="h-4 w-4 text-blue-600" />
            </span>
            Peak call volume predicted between 2:00 PM - 3:30 PM based on historical patterns.
          </p>
          <p className="flex items-center gap-2">
            <span className="bg-blue-100 p-1 rounded">
              <Users className="h-4 w-4 text-blue-600" />
            </span>
            Recommending 4 additional agents for the prescription refill queue to maintain SLAs.
          </p>
          <p className="flex items-center gap-2">
            <span className="bg-blue-100 p-1 rounded">
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </span>
            Training opportunity identified: HIPAA compliance refresher for 3 agents showing consistent patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CXoneHealthcareDashboard;
