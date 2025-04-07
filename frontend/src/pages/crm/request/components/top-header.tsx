import { Button } from '@/components/ui/button';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

interface TopHeaderProps {
  id: string | undefined;
}

export function TopHeader({ id }: TopHeaderProps) {
  const navigate = useNavigate();

  function handleClose() {
    navigate(-1);
  }

  function handleMinimize() {
    navigate(-1);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Request {id}</p>
        <div className="flex gap-2 self-end">
          <Button variant="outline" size="icon" onClick={handleMinimize}>
            <ChevronDownIcon />
          </Button>
          <Button variant="outline" size="icon" onClick={handleClose}>
            <XIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
