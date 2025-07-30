import { motion } from 'framer-motion';
import { Monitor, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface DisplayProps {
  itemVariants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: string } };
  };
}

const Display = ({ itemVariants }: DisplayProps) => {
  const [display, setDisplay] = useState({
    compactMode: false,
    showAnimations: true,
    autoSave: true,
    soundEnabled: true,
    highContrast: false,
    reduceMotion: false
  });

  const handleDisplayToggle = (key: keyof typeof display) => {
    setDisplay((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${display[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#4A36EC]" />
            Display & Interface
          </CardTitle>
          <CardDescription>Customize your display preferences and interface behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(display).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'compactMode' && 'Use compact layout for better space utilization'}
                    {key === 'showAnimations' && 'Enable smooth animations and transitions'}
                    {key === 'autoSave' && 'Automatically save your work as you type'}
                    {key === 'soundEnabled' && 'Play sound effects for notifications and actions'}
                    {key === 'highContrast' && 'Enable high contrast mode for better visibility'}
                    {key === 'reduceMotion' && 'Reduce motion for accessibility'}
                  </p>
                </div>
                <Switch checked={value} onCheckedChange={() => handleDisplayToggle(key as keyof typeof display)} />
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Sound Volume</Label>
              <div className="flex items-center gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => setDisplay((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}>
                  {display.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#4A36EC] rounded-full transition-all duration-300"
                    style={{ width: display.soundEnabled ? '75%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Display;
