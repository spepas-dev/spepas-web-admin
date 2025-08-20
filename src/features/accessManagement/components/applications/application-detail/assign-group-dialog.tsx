import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { Group } from '../../../types/group.types';

interface AssignGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupIds: string[]) => void;
  availableGroups: Group[];
}

export const AssignGroupDialog = ({ isOpen, onClose, onSubmit, availableGroups }: AssignGroupDialogProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGroups.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(selectedGroups);
      setSelectedGroups([]);
    } catch (error) {
      console.error('Failed to assign groups:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedGroups([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Groups</DialogTitle>
          <DialogDescription>Select the groups you want to assign to this application.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-2">
            {availableGroups.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No available groups to assign</div>
            ) : (
              availableGroups.map((group) => (
                <div
                  key={group.group_id}
                  className={cn(
                    'flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors',
                    selectedGroups.includes(group.group_id) && 'border-[#4A36EC] bg-[#4A36EC]/5'
                  )}
                >
                  <Checkbox
                    id={group.group_id}
                    checked={selectedGroups.includes(group.group_id)}
                    onCheckedChange={() => handleGroupToggle(group.group_id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={group.group_id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {group.title}
                    </label>
                    <p className="text-xs text-gray-500 font-mono mt-1">{group.group_id}</p>
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2',
                        group.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      )}
                    >
                      {group.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || selectedGroups.length === 0} className="bg-[#4A36EC] hover:bg-[#3A2BDC]">
              {isSubmitting ? 'Assigning...' : `Assign ${selectedGroups.length} Group${selectedGroups.length !== 1 ? 's' : ''}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
