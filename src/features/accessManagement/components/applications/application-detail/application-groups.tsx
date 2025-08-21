import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, UserCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { cn } from '@/lib/utils';

import { Group } from '../../../types/group.types';
import { AssignGroups } from './AssignGroups';

interface ApplicationGroupsProps {
  applicationId: string;
}

// Mock data - replace with actual API calls
const mockGroups: Group[] = [
  {
    id: 1,
    group_id: 'group-1',
    title: 'Administrators',
    date_added: '2024-01-01T00:00:00Z',
    added_by: 'user-1',
    status: 1
  },
  {
    id: 2,
    group_id: 'group-2',
    title: 'Users',
    date_added: '2024-01-01T00:00:00Z',
    added_by: 'user-1',
    status: 1
  },
  {
    id: 3,
    group_id: 'group-3',
    title: 'Viewers',
    date_added: '2024-01-01T00:00:00Z',
    added_by: 'user-1',
    status: 0
  }
];

export const ApplicationGroups = ({ applicationId }: ApplicationGroupsProps) => {
  const [assignedGroups, setAssignedGroups] = useState<Group[]>(mockGroups.slice(0, 2));
  const [availableGroups, setAvailableGroups] = useState<Group[]>(mockGroups.slice(2));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignGroupModal = useFormModal();

  const handleAssignGroup = async (data: { groupIds: string[] }) => {
    setIsSubmitting(true);
    try {
      const groupsToAssign = availableGroups.filter((group) => data.groupIds.includes(group.group_id));
      setAssignedGroups([...assignedGroups, ...groupsToAssign]);
      setAvailableGroups(availableGroups.filter((group) => !data.groupIds.includes(group.group_id)));
      assignGroupModal.close();
      toast.success('Groups assigned successfully');
    } catch (error) {
      console.error('Error assigning groups:', error);
      toast.error('Failed to assign groups. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    const groupToRemove = assignedGroups.find((group) => group.group_id === groupId);
    if (groupToRemove) {
      setAssignedGroups(assignedGroups.filter((group) => group.group_id !== groupId));
      setAvailableGroups([...availableGroups, groupToRemove]);
      toast.success('Group removed successfully');
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Serial',
        accessorKey: 'serial',
        cell: ({ row }: { row: Row<Group> }) => {
          return <span className="text-gray-600">{row.index + 1}</span>;
        }
      },
      {
        header: 'Group Name',
        accessorKey: 'title'
      },
      {
        header: 'Group ID',
        accessorKey: 'group_id',
        cell: ({ row }: { row: Row<Group> }) => (
          <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">{row.original.group_id}</span>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: Row<Group> }) => {
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Assigned Date',
        accessorKey: 'date_added',
        cell: ({ row }: { row: Row<Group> }) => (
          <span className="text-sm text-gray-600">{new Date(row.original.date_added).toLocaleDateString()}</span>
        )
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }: { row: Row<Group> }) => {
          const group = row.original;
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hover:bg-red-600 hover:text-white"
                onClick={() => handleRemoveGroup(group.group_id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        }
      }
    ],
    []
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Assigned Groups</h2>
          <p className="text-sm text-gray-600 mt-1">Manage group assignments for this application</p>
        </div>
        <Button
          onClick={() =>
            assignGroupModal.openForm({
              title: 'Assign Groups',
              size: 'md',
              showFooter: false,
              children: <AssignGroups onSubmit={handleAssignGroup} loading={isSubmitting} availableGroups={availableGroups} />
            })
          }
          className="bg-[#4A36EC] hover:bg-[#3A2BDC]"
          disabled={availableGroups.length === 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          Assign Groups
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4A36EC]" />
            Assigned Groups
          </CardTitle>
          <CardDescription>Groups that have access to this application</CardDescription>
        </CardHeader>
        <CardContent>
          {assignedGroups.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groups assigned</h3>
              <p className="text-gray-600 mb-4">Assign groups to give them access to this application</p>
              <Button
                onClick={() =>
                  assignGroupModal.openForm({
                    title: 'Assign Groups',
                    size: 'md',
                    showFooter: false,
                    children: <AssignGroups onSubmit={handleAssignGroup} loading={isSubmitting} availableGroups={availableGroups} />
                  })
                }
                className="bg-[#4A36EC] hover:bg-[#3A2BDC]"
                disabled={availableGroups.length === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Assign Groups
              </Button>
            </div>
          ) : (
            <DataTable data={assignedGroups} columns={columns} />
          )}
        </CardContent>
      </Card>

      {/* Available Groups Summary */}
      {availableGroups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Groups</CardTitle>
            <CardDescription>Groups that can be assigned to this application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableGroups.map((group) => (
                <div key={group.group_id} className="p-4 border border-gray-200 rounded-lg hover:border-[#4A36EC] transition-colors">
                  <h4 className="font-medium text-gray-900">{group.title}</h4>
                  <p className="text-sm text-gray-600 font-mono">{group.group_id}</p>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2',
                      group.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    )}
                  >
                    {group.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};
