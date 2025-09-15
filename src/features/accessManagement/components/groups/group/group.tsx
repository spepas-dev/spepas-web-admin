import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { AppWindow, Building2, CheckCircle, Eye, Plus, Settings, Shield, Users, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAddUsersToGroup } from '@/features/accessManagement/api/mutations/group.mutations';
import { useGetGroupApplications, useGetGroupUsers } from '@/features/accessManagement/api/queries/group.queries';
import { cn } from '@/lib/utils';

import { Application } from '../../../types/application.types';
import { Group } from '../../../types/group.types';
import { User } from '../../../types/user.types';
import { AddApplicationToGroup } from './addApplicationToGroup';
import { AddUserToGroup } from './addUserToGroup';

export default function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  console.log('Group ID:', groupId); // Using groupId to avoid linter warning

  const addUserModal = useFormModal();
  const addApplicationModal = useFormModal();

  // Mock data - replace with actual API calls based on groupId
  // const group = mockGroup;

  const {
    data: groupApplicationsData,
    isLoading: isGroupApplicationsLoading,
    isError: isGroupApplicationsError
  } = useGetGroupApplications(groupId as string);

  const groupApplications = useMemo(() => {
    return (
      groupApplicationsData?.data?.map((application) => ({
        id: application.application_id,
        name: application.application.name,
        //   description: application.description
        status: application.status === 1 ? 'active' : 'inactive',
        date_added: application.date_added,
        added_by: application.added_by
      })) || []
    );
  }, [groupApplicationsData?.data]);

  const { data: groupUsersData, isLoading: isGroupUsersLoading, isError: isGroupUsersError } = useGetGroupUsers(groupId as string);

  const groupUsers = useMemo(() => {
    return groupUsersData?.data?.user_groups.map((user) => user?.user) || [];
  }, [groupUsersData?.data?.user_groups]);

  // group details
  const { title, date_added, added_by, status } = groupUsersData?.data || {};

  const userColumns = useMemo(
    (): ColumnDef<User>[] => [
      {
        header: 'User',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4A36EC] to-[#5B4AEE] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{row.original.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{row.original.name}</p>
              <p className="text-sm text-gray-500">{row.original.email}</p>
            </div>
          </div>
        )
      },
      {
        header: 'User Type',
        accessorKey: 'user_type',
        cell: ({ row }) => (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {row.original.user_type}
          </Badge>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
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
        header: 'Verification Status',
        accessorKey: 'verificationStatus',
        cell: ({ row }) => (
          <span
            className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              row.original.verificationStatus === 1
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            )}
          >
            {row.original.verificationStatus === 1 ? '✓ Verified' : '✗ Pending'}
          </span>
        )
      }
      // {
      //   header: 'Actions',
      //   id: 'actions',
      //   cell: ({ row }) => (
      //     <div className="flex items-center gap-2">
      //       <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => console.log('View user:', row.original.id)}>
      //         <Eye className="h-4 w-4" />
      //       </Button>
      //       <Button
      //         variant="ghost"
      //         size="sm"
      //         className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
      //         onClick={() => console.log('Remove user:', row.original.id)}
      //       >
      //         <XCircle className="h-4 w-4" />
      //       </Button>
      //     </div>
      //   )
      // }
    ],
    []
  );

  const applicationColumns = useMemo(
    (): ColumnDef<any>[] => [
      {
        header: 'Application',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{row.original.name}</p>
              <p className="text-sm text-gray-500">{row.original.description}</p>
            </div>
          </div>
        )
      },
      //   {
      //     header: 'Application ID',
      //     accessorKey: 'application_id',
      //     cell: ({ row }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm">{row.original.application_id}</code>
      //   },
      // {
      //   header: 'Date Added',
      //   accessorKey: 'date_added',
      //   cell: ({ row }) => format(new Date(row.original.dateAdded), 'MMM dd, yyyy')
      // },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isActive = row.original.status === 'active';
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
      }
      // {
      //   header: 'Actions',
      //   id: 'actions',
      //   cell: ({ row }) => (
      //     <div className="flex items-center gap-2">
      //       <Button
      //         variant="ghost"
      //         size="sm"
      //         className="h-8 w-8 p-0"
      //         onClick={() => console.log('View application:', row.original.application_id)}
      //       >
      //         <Eye className="h-4 w-4" />
      //       </Button>
      //       <Button
      //         variant="ghost"
      //         size="sm"
      //         className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
      //         onClick={() => console.log('Remove application:', row.original.application_id)}
      //       >
      //         <XCircle className="h-4 w-4" />
      //       </Button>
      //     </div>
      //   )
      // }
    ],
    []
  );

  const handleAddUser = () => {
    addUserModal.openForm({
      title: 'Add User to Group',
      size: 'md',
      showFooter: false,
      children: <AddUserToGroup onSubmit={handleSubmitAddUser} loading={false} groupId={group.id} />
    });
  };

  const handleAddApplication = () => {
    addApplicationModal.openForm({
      title: 'Add Application to Group',
      size: 'md',
      showFooter: false,
      children: <AddApplicationToGroup onSubmit={handleSubmitAddApplication} loading={false} groupId={group.id} />
    });
  };

  const { mutateAsync: addUsersToGroup } = useAddUsersToGroup();
  const handleSubmitAddUser = async (userData: { userIds: string[] }) => {
    try {
      // Handle API call here
      console.log('Adding users to group:', userData);
      const payload = userData.userIds.map((userId) => ({
        user_id: userId,
        group_id: groupId as string
      }));
      console.log('payload', payload);
      await addUsersToGroup(payload);
      toast.success('Users added to group successfully');
      addUserModal.close();
    } catch {
      toast.error('Failed to add users to group');
    }
  };

  const handleSubmitAddApplication = async (appData: { applicationIds: string[] }) => {
    try {
      // Handle API call here
      console.log('Adding applications to group:', appData);
      toast.success('Applications added to group successfully');
      addApplicationModal.close();
    } catch {
      toast.error('Failed to add applications to group');
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: groupUsers.length,
      Icon: Users,
      description: 'Members in group',
      trend: '+2 this week',
      trendUp: true
    },
    {
      title: 'Applications',
      value: groupApplications.length,
      Icon: Building2,
      description: 'Assigned apps',
      trend: '+1 this month',
      trendUp: true
    },
    {
      title: 'Active Users',
      value: groupUsers.filter((user) => user.status === 1).length,
      Icon: CheckCircle,
      description: 'Currently active',
      trend: '100%',
      trendUp: true
    },
    {
      title: 'Permissions',
      value: 15,
      Icon: Shield,
      description: 'Total permissions',
      trend: '+3 new',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          ...BreadcrumbPatterns.threeTier('Access Management', '/access-management', 'Groups'),
          { label: title, href: `/access-management/groups/${groupId}` }
        ]}
      />

      {/* Header */}
      <PageHeader
        title={title}
        description="Group Details & Management"
        // actions={
        //   <div className="flex space-x-2">
        //     <Button variant="outline" className="gap-2">
        //       <Settings className="w-4 h-4" />
        //       Settings
        //     </Button>
        //     <Button className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white gap-2">
        //       <Plus className="w-4 h-4" />
        //       Quick Actions
        //     </Button>
        //   </div>
        // }
      />

      {/* Group Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4A36EC] to-[#5B4AEE] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>
                    {/* Created by {added_by} •  */}
                    {date_added ? format(new Date(date_added), 'MMM dd, yyyy') : null}
                  </CardDescription>
                </div>
              </div>
              <Badge variant={status === 1 ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                {status === 1 ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <CardGrid cards={stats} />
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users ({groupUsers.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({groupApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Users</CardTitle>
                    <CardDescription>Latest members added to this group</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddUser}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#4A36EC] to-[#5B4AEE] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.user_type}</p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {user.status === 1 ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Applications</CardTitle>
                    <CardDescription>Apps assigned to this group</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddApplication}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add App
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupApplications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                            <AppWindow className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{app.name}</p>
                            {/* <p className="text-xs text-gray-500">{app.added_by}</p> */}
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Group Users</h3>
                <p className="text-sm text-gray-600">Manage users assigned to this group</p>
              </div>
              <Button onClick={handleAddUser} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            <DataTable
              data={groupUsers}
              columns={userColumns}
              loading={false}
              tableStyle="border rounded-lg bg-white"
              tableHeadClassName="text-[#4A36EC] font-semibold"
            />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Group Applications</h3>
                <p className="text-sm text-gray-600">Manage applications assigned to this group</p>
              </div>
              <Button onClick={handleAddApplication} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Application
              </Button>
            </div>
            <DataTable
              data={groupApplications}
              columns={applicationColumns}
              loading={false}
              tableStyle="border rounded-lg bg-white"
              tableHeadClassName="text-[#4A36EC] font-semibold"
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
