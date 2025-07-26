import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Plus, UserPlus, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreateApplication, useUpdateApplication } from '../../api/mutations/application.mutations';
import { useGetApplications } from '../../api/queries/applications.queries';
import { Application, CreateApplicationDto, UpdateApplicationDto } from '../../types/application.types';
import { NewApplication } from './newApplication';

const ApplicationsPage = () => {
  const { data, isLoading } = useGetApplications();

  const applications = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const columns = useMemo(() => {
    return [
      {
        header: 'Serial',
        accessorKey: 'serial',
        cell: ({ row }: { row: Row<Application> }) => {
          return <span className="text-gray-600">{row.index + 1}</span>;
        }
      },
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: Row<Application> }) => {
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
        header: 'Actions',
        id: 'actions',
        accessorKey: 'actions',
        cell: ({ row }: { row: Row<Application> }) => {
          const application = row.original;
          return (
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-[#4A36EC] hover:text-white hover:cursor-pointer"
              onClick={() => handleUpdateApplication(application)}
            >
              Update
            </Button>
          );
        }
      }
    ];
  }, []);

  const addApplicationModal = useFormModal();
  const createApplicationMutation = useCreateApplication();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const updateApplicationMutation = useUpdateApplication(selectedApplication?.id?.toString() || '');

  const handleCreateApplication = async (applicationData: CreateApplicationDto) => {
    try {
      await createApplicationMutation.mutateAsync(applicationData);
      toast.success(`${applicationData.name} created successfully`);
      addApplicationModal.close();
    } catch (error) {
      console.error('Error creating application:', error);
      toast.error('Failed to create application. Please try again.');
    }
  };

  const handleUpdateSubmit = async (applicationData: UpdateApplicationDto) => {
    console.log('selectedApplication', selectedApplication);
    if (!selectedApplication) {
      return;
    }

    try {
      console.log('applicationData', applicationData);
      await updateApplicationMutation.mutateAsync(applicationData);
      toast.success(`${selectedApplication.name} updated successfully`);
      addApplicationModal.close();
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application. Please try again.');
    }
  };

  const handleUpdateApplication = (application: Application) => {
    setSelectedApplication(application);

    addApplicationModal.openForm({
      title: 'Update Application',
      size: 'lg',
      showFooter: false,
      children: <NewApplication onSubmit={handleUpdateSubmit} mode="update" initialData={application} />
    });
  };

  const handleAddApplication = () => {
    addApplicationModal.openForm({
      title: 'Create New Application',
      size: 'lg',
      showFooter: false,
      children: <NewApplication onSubmit={(data) => handleCreateApplication(data as CreateApplicationDto)} />
    });
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      Icon: UserPlus,
      description: 'Total applications received',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Pending Applications',
      // value: applications.filter((app) => app.status === 'pending').length,
      value: 0,
      Icon: Clock,
      description: 'Applications pending review',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Approved Applications',
      value: applications.filter((app) => app.status === 1).length,
      Icon: CheckCircle,
      description: 'Applications approved',
      trend: '+5.4%',
      trendUp: true
    },
    {
      title: 'Rejected Applications',
      // value: applications.filter((app) => app.status === 'rejected').length,
      value: 0,
      Icon: XCircle,
      description: 'Applications rejected',
      trend: '-1.2%',
      trendUp: false
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Applications')} />

      {/* Header */}
      <PageHeader
        title="Applications"
        description="Manage system applications and access requests"
        actions={
          <Button onClick={handleAddApplication} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Applications Table/List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={applications}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
};

export default ApplicationsPage;
