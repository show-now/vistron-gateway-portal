import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { fetchVisitors, checkInVisitor, checkOutVisitor, Visitor } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, UserCheck, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VisitorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitors().then(data => {
      const found = data.find(v => v.id === id);
      setVisitor(found || null);
      setLoading(false);
    });
  }, [id]);

  const handleCheckIn = async () => {
    if (!visitor) return;
    setActionLoading(true);
    try {
      await checkInVisitor(visitor.id);
      toast({
        title: "Checked In",
        description: `${visitor.full_name} has been checked in successfully`,
      });
      setVisitor({ ...visitor, status: 'checked_in' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!visitor) return;
    setActionLoading(true);
    try {
      await checkOutVisitor(visitor.id);
      toast({
        title: "Checked Out",
        description: `${visitor.full_name} has been checked out successfully`,
      });
      navigate('/security/visitor-departed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="min-h-screen p-8">
        <BackButton />
        <div className="text-center mt-12">
          <p className="text-muted-foreground">Visitor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {visitor.full_name.charAt(0)}
            </div>
            <h2 className="text-3xl font-bold mb-2">{visitor.full_name}</h2>
            <Badge>{visitor.status.replace('_', ' ').toUpperCase()}</Badge>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Visitor ID</p>
                <p className="font-semibold">{visitor.id}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Visit Type</p>
                <p className="font-semibold">{visitor.visit_type}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="font-semibold text-sm">{visitor.email}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Phone</p>
                <p className="font-semibold">{visitor.phone}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                <p className="font-semibold text-sm">{visitor.visit_date} at {visitor.visit_time}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Meeting With</p>
                <p className="font-semibold">{visitor.whom_to_meet}</p>
              </div>
            </div>

            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Purpose</p>
              <p className="font-semibold">{visitor.purpose}</p>
            </div>
          </div>

          <div className="flex gap-4">
            {visitor.status === 'approved' && (
              <Button
                onClick={handleCheckIn}
                disabled={actionLoading}
                className="flex-1"
              >
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCheck className="mr-2 h-4 w-4" />}
                Check In
              </Button>
            )}
            {visitor.status === 'checked_in' && (
              <Button
                onClick={handleCheckOut}
                disabled={actionLoading}
                variant="destructive"
                className="flex-1"
              >
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                Check Out
              </Button>
            )}
            {visitor.status === 'pending' && (
              <div className="text-center w-full py-4 text-muted-foreground">
                Awaiting admin approval
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisitorDetails;
