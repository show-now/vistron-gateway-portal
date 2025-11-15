import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function BackButton() {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="mb-6 hover:bg-white/50 transition-all"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
