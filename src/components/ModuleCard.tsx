import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  delay?: number;
}

export function ModuleCard({ title, description, icon: Icon, path, delay = 0 }: ModuleCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => navigate(path)}
      className="glass-card rounded-2xl p-8 cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="icon-container w-16 h-16 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
