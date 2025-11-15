import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { listEmployees, deleteEmployee, Employee } from '@/hooks/useMockApi';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    listEmployees().then(data => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteEmployee(deleteId);
    setEmployees(employees.filter(e => e.id !== deleteId));
    toast({
      title: "Employee Deleted",
      description: "Employee has been removed successfully",
    });
    setDeleteId(null);
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-card-foreground">Employee Management</h1>
              <p className="text-muted-foreground mt-1">Manage your team members</p>
            </div>
            <Button onClick={() => navigate('/admin/employees/add')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Name</th>
                    <th className="text-left py-4 px-4 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 font-semibold">Department</th>
                    <th className="text-left py-4 px-4 font-semibold">Designation</th>
                    <th className="text-left py-4 px-4 font-semibold">Notifications</th>
                    <th className="text-right py-4 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b border-border/50 hover:bg-white/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {employee.full_name.charAt(0)}
                          </div>
                          <span className="font-medium">{employee.full_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{employee.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{employee.department}</td>
                      <td className="py-4 px-4">{employee.designation}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${employee.notifications_enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                          {employee.notifications_enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/employees/edit/${employee.id}`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteId(employee.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Employee</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this employee? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EmployeeList;
