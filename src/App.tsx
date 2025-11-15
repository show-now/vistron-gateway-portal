import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PreRegistration from "./pages/PreRegistration";
import SecurityLogin from "./pages/security/SecurityLogin";
import SecuritySignup from "./pages/security/SecuritySignup";
import SecurityDashboard from "./pages/security/SecurityDashboard";
import QRScanner from "./pages/security/QRScanner";
import VisitorDetails from "./pages/security/VisitorDetails";
import VisitorDeparted from "./pages/security/VisitorDeparted";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VisitorManagement from "./pages/admin/VisitorManagement";
import EmployeeList from "./pages/admin/employees/EmployeeList";
import AddEmployee from "./pages/admin/employees/AddEmployee";
import EditEmployee from "./pages/admin/employees/EditEmployee";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pre-registration" element={<PreRegistration />} />
          
          {/* Security Routes */}
          <Route path="/security/login" element={<SecurityLogin />} />
          <Route path="/security/signup" element={<SecuritySignup />} />
          <Route path="/security/dashboard" element={<SecurityDashboard />} />
          <Route path="/security/scanner" element={<QRScanner />} />
          <Route path="/security/visitor/:id" element={<VisitorDetails />} />
          <Route path="/security/visitor-departed" element={<VisitorDeparted />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/visitors" element={<VisitorManagement />} />
          <Route path="/admin/employees" element={<EmployeeList />} />
          <Route path="/admin/employees/add" element={<AddEmployee />} />
          <Route path="/admin/employees/edit/:id" element={<EditEmployee />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
