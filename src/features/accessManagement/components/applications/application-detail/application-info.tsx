import { motion } from 'framer-motion';
import { Calendar, Edit, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { useUpdateApplication } from '../../../api/mutations/application.mutations';
import { Application } from '../../../types/application.types';

interface ApplicationInfoProps {
  application: Application;
}

export const ApplicationInfo = ({ application }: ApplicationInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: application.name,
    description: application.description || ''
  });

  const updateApplicationMutation = useUpdateApplication(application.id?.toString());

  const handleSave = async () => {
    try {
      await updateApplicationMutation.mutateAsync({
        name: formData.name,
        description: formData.description
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: application.name,
      description: application.description || ''
    });
    setIsEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Application Information</h2>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="hover:bg-[#4A36EC] hover:text-white">
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#4A36EC]" />
            Basic Information
          </CardTitle>
          <CardDescription>Application details and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Application Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter application name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter application description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={updateApplicationMutation.isPending}>
                  {updateApplicationMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Application Name</p>
                  <p className="text-sm text-gray-900">{application.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-sm text-gray-900">{application.description || 'No description provided'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      application.status === 1
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', application.status === 1 ? 'bg-green-400' : 'bg-red-400')} />
                    {application.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created Date
                  </p>
                  <p className="text-sm text-gray-900">
                    {new Date(application.dateAdded).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Application ID</p>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">{application.application_id}</p>
                </div> */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Added By</p>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">{application.added_by}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
