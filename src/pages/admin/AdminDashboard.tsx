import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { getAnalyticsData } from '@/hooks/useMockApi';
import { Users, CheckCircle, Clock, Building2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAnalyticsData().then(data => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-card-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Analytics and visitor management</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/visitors')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Manage Visitors
              </button>
              <button
                onClick={() => navigate('/admin/employees')}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                Employees
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Visitors</p>
                  <p className="text-3xl font-bold mt-1">{analytics.totalVisitors}</p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Approvals</p>
                  <p className="text-3xl font-bold mt-1">{analytics.pendingApprovals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Requires action</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Approved Today</p>
                  <p className="text-3xl font-bold mt-1">{analytics.approvedToday}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Employees</p>
                  <p className="text-3xl font-bold mt-1">{analytics.totalEmployees}</p>
                  <p className="text-xs text-muted-foreground mt-1">Active staff</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Visitor Analytics</h2>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="type">By Type</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="monthly">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="type">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.visitTypeBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
