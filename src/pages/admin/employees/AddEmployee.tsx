import { useState } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createEmployee } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    notifications_enabled: true,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEmployee(formData);
      toast({
        title: "Employee Added",
        description: `${formData.full_name} has been added successfully`,
      });
      navigate('/admin/employees');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-2 text-card-foreground">Add Employee</h2>
          <p className="text-muted-foreground mb-8">Create a new employee record</p>

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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g., Engineering"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <div>
                    <Label htmlFor="notifications" className="cursor-pointer">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive visitor notification emails</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={formData.notifications_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, notifications_enabled: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/employees')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : 'Add Employee'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEmployee;
