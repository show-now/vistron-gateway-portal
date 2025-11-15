import { useState } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { submitVisitorRegistration, verifyOTP, Visitor } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const visitTypes = ['Vendors', 'Business', 'Delivery Partner', 'Meeting', 'Interview', 'Guest', 'Contractor'];
const mockEmployees = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Mike Wilson' },
  { id: '3', name: 'David Lee' },
  { id: '4', name: 'Emma Brown' },
];

type Step = 'form' | 'otp' | 'success';

const PreRegistration = () => {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Visitor>>({
    full_name: '',
    email: '',
    phone: '',
    purpose: '',
    visit_type: undefined,
    whom_to_meet: '',
    visit_date: '',
    visit_time: '',
  });
  const [otp, setOtp] = useState('');
  const [visitorData, setVisitorData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const visitor = await submitVisitorRegistration(formData);
      setVisitorData(visitor);
      setStep('otp');
      toast({
        title: "Registration Submitted",
        description: "Please check your email for OTP verification.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const valid = await verifyOTP(formData.email, otp);
      if (valid) {
        setStep('success');
        toast({
          title: "Verified Successfully",
          description: "Your visitor registration is complete!",
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP sent to your email.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success' && visitorData) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <BackButton />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">Registration Successful!</h2>
            <p className="text-muted-foreground mb-8">Your visitor pass has been generated</p>

            <div className="bg-white/50 rounded-xl p-6 mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="bg-white w-44 h-44 rounded flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-40 h-40">
                    <rect width="100" height="100" fill="black"/>
                    <rect x="10" y="10" width="10" height="10" fill="white"/>
                    <rect x="30" y="10" width="10" height="10" fill="white"/>
                    <rect x="50" y="10" width="10" height="10" fill="white"/>
                    <rect x="70" y="10" width="10" height="10" fill="white"/>
                    <rect x="10" y="30" width="10" height="10" fill="white"/>
                    <rect x="50" y="30" width="10" height="10" fill="white"/>
                    <rect x="70" y="30" width="10" height="10" fill="white"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm font-medium text-card-foreground mb-2">Visitor ID</p>
              <p className="text-2xl font-bold text-primary">{visitorData.id}</p>
            </div>

            <div className="text-left space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{visitorData.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visit Type:</span>
                <span className="font-medium">{visitorData.visit_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">{visitorData.visit_date} at {visitorData.visit_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Meeting:</span>
                <span className="font-medium">{visitorData.whom_to_meet}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-md mx-auto">
          <BackButton />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-2 text-card-foreground">Verify OTP</h2>
            <p className="text-muted-foreground mb-8">Enter the 6-digit code sent to {formData.email}</p>

            <form onSubmit={handleOtpVerify} className="space-y-6">
              <div>
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">Hint: Use 123456 for demo</p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : 'Verify OTP'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-2 text-card-foreground">Visitor Pre-Registration</h2>
          <p className="text-muted-foreground mb-8">Please fill in your details to register your visit</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="visit_type">Visit Type *</Label>
                <Select value={formData.visit_type} onValueChange={(v) => setFormData({ ...formData, visit_type: v as Visitor['visit_type'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="visit_date">Visit Date *</Label>
                <Input
                  id="visit_date"
                  type="date"
                  value={formData.visit_date}
                  onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="visit_time">Visit Time *</Label>
                <Input
                  id="visit_time"
                  type="time"
                  value={formData.visit_time}
                  onChange={(e) => setFormData({ ...formData, visit_time: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="whom_to_meet">Whom to Meet *</Label>
                <Select value={formData.whom_to_meet} onValueChange={(v) => setFormData({ ...formData, whom_to_meet: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmployees.map(emp => (
                      <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="purpose">Purpose of Visit *</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Registration'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PreRegistration;
