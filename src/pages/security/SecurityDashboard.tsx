import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { fetchVisitors, Visitor } from '@/hooks/useMockApi';
import { Users, CheckCircle, Clock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const SecurityDashboard = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitors().then(data => {
      setVisitors(data);
      setLoading(false);
    });
  }, []);

  const todayVisitors = visitors.filter(v => v.visit_date === new Date().toISOString().split('T')[0]);
  const checkedIn = todayVisitors.filter(v => v.status === 'checked_in').length;
  const pending = todayVisitors.filter(v => v.status === 'approved').length;

  const getStatusBadge = (status: Visitor['status']) => {
    const variants: Record<Visitor['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pending', variant: 'outline' },
      approved: { label: 'Approved', variant: 'default' },
      rejected: { label: 'Rejected', variant: 'destructive' },
      checked_in: { label: 'Checked In', variant: 'default' },
      checked_out: { label: 'Checked Out', variant: 'secondary' },
    };
    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-card-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground mb-8">Real-time visitor tracking</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Today's Visitors</p>
                  <p className="text-3xl font-bold mt-1">{todayVisitors.length}</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Checked In</p>
                  <p className="text-3xl font-bold mt-1">{checkedIn}</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Awaiting Check-in</p>
                  <p className="text-3xl font-bold mt-1">{pending}</p>
                </div>
                <div className="icon-container w-12 h-12 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Today's Visitors</h2>
              <button
                onClick={() => navigate('/security/scanner')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Scan QR Code
              </button>
            </div>

            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading...</p>
            ) : todayVisitors.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No visitors scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    onClick={() => navigate(`/security/visitor/${visitor.id}`)}
                    className="p-4 bg-white/50 rounded-lg hover:bg-white/70 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {visitor.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{visitor.full_name}</p>
                        <p className="text-sm text-muted-foreground">{visitor.purpose}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{visitor.visit_type}</p>
                        <p className="text-xs text-muted-foreground">{visitor.visit_time}</p>
                      </div>
                      {getStatusBadge(visitor.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
