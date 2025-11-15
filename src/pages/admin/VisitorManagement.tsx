import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { fetchVisitors, approveVisitor, rejectVisitor, Visitor } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVisitors().then(data => {
      setVisitors(data);
      setLoading(false);
    });
  }, []);

  const handleApprove = async () => {
    if (!selectedVisitor) return;
    await approveVisitor(selectedVisitor.id);
    setVisitors(visitors.map(v => v.id === selectedVisitor.id ? { ...v, status: 'approved' } : v));
    toast({
      title: "Visitor Approved",
      description: `${selectedVisitor.full_name} has been approved`,
    });
    setAction(null);
    setSelectedVisitor(null);
  };

  const handleReject = async () => {
    if (!selectedVisitor) return;
    await rejectVisitor(selectedVisitor.id);
    setVisitors(visitors.map(v => v.id === selectedVisitor.id ? { ...v, status: 'rejected' } : v));
    toast({
      title: "Visitor Rejected",
      description: `${selectedVisitor.full_name} has been rejected`,
    });
    setAction(null);
    setSelectedVisitor(null);
  };

  const groupedVisitors = visitors.reduce((acc, visitor) => {
    if (!acc[visitor.visit_type]) acc[visitor.visit_type] = [];
    acc[visitor.visit_type].push(visitor);
    return acc;
  }, {} as Record<string, Visitor[]>);

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

  if (loading) {
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
          <h1 className="text-4xl font-bold mb-2 text-card-foreground">Visitor Management</h1>
          <p className="text-muted-foreground mb-8">Approve or reject visitor requests</p>

          <div className="space-y-8">
            {Object.entries(groupedVisitors).map(([type, typeVisitors]) => (
              <div key={type} className="glass-card rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4">{type}</h2>
                <div className="space-y-3">
                  {typeVisitors.map((visitor) => (
                    <div
                      key={visitor.id}
                      className="p-4 bg-white/50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                          {visitor.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{visitor.full_name}</p>
                          <p className="text-sm text-muted-foreground">{visitor.purpose}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {visitor.visit_date} at {visitor.visit_time} • Meeting: {visitor.whom_to_meet}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(visitor.status)}
                        {visitor.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedVisitor(visitor);
                                setAction('approve');
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedVisitor(visitor);
                                setAction('reject');
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <AlertDialog open={action !== null} onOpenChange={() => setAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {action === 'approve' ? 'Approve Visitor' : 'Reject Visitor'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {action === 'approve'
                  ? `Are you sure you want to approve ${selectedVisitor?.full_name}'s visit request?`
                  : `Are you sure you want to reject ${selectedVisitor?.full_name}'s visit request?`
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={action === 'approve' ? handleApprove : handleReject}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VisitorManagement;
