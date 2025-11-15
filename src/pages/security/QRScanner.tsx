import { useState } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { scanQRCode } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { QrCode, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const visitor = await scanQRCode(qrCode);
      if (visitor) {
        toast({
          title: "Visitor Found",
          description: `${visitor.full_name} - ${visitor.visit_type}`,
        });
        navigate(`/security/visitor/${visitor.id}`);
      } else {
        toast({
          title: "Not Found",
          description: "No visitor found with this QR code",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="icon-container w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-card-foreground">Scan QR Code</h2>
            <p className="text-muted-foreground">Enter visitor QR code to check in/out</p>
          </div>

          <form onSubmit={handleScan} className="space-y-6">
            <div>
              <Label htmlFor="qrCode">QR Code</Label>
              <Input
                id="qrCode"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="QR-VIS-001"
                className="text-center text-xl font-mono"
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                Demo codes: QR-VIS-001, QR-VIS-002, QR-VIS-003
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...</> : 'Scan QR Code'}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> In production, this would integrate with a camera-based QR scanner.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRScanner;
