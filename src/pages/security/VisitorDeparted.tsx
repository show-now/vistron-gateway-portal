import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VisitorDeparted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 text-center max-w-md"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Visitor Checked Out</h2>
        <p className="text-muted-foreground mb-8">
          The visitor has been successfully checked out. Thank you for visiting!
        </p>
        <Button onClick={() => navigate('/security/dashboard')} className="w-full">
          Return to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default VisitorDeparted;
