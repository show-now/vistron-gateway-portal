import { motion } from 'framer-motion';
import { UserPlus, Shield, UserCog } from 'lucide-react';
import { ModuleCard } from '@/components/ModuleCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-bold tracking-tight mb-4" style={{ color: 'hsl(var(--vistron-deep-blue))' }}>
          Vistron
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Enterprise Visitor Management System
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <ModuleCard
          title="Pre-Registration"
          description="Register visitors in advance with QR code generation"
          icon={UserPlus}
          path="/pre-registration"
          delay={0.1}
        />
        <ModuleCard
          title="Security Panel"
          description="Real-time visitor tracking and check-in management"
          icon={Shield}
          path="/security/login"
          delay={0.16}
        />
        <ModuleCard
          title="Admin Panel"
          description="Comprehensive analytics and visitor approval workflow"
          icon={UserCog}
          path="/admin/login"
          delay={0.22}
        />
      </div>

      <footer className="mt-16 text-center text-muted-foreground text-sm">
        © 2025 Vistron. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
