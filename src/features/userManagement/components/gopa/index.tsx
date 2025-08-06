import { Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Cog, Eye, Hammer, Plus, Users, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { queryClient } from '@/lib/react-query';
import { cn } from '@/lib/utils';

import { useCreateGoro } from '../../api/mutations/gopas.mutations';
import { useGetGoroList } from '../../api/queries/gopas.queries';
import { Goro, RegisterGoroDTO } from '../../types/gopa.types';
import { NewGoros } from './newGoros';

export default function GorosPage() {
  const { data, isLoading } = useGetGoroList();
  const goros = useMemo(() => data?.data || [], [data?.data]);
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Specialties',
        accessorKey: 'specialties',
        cell: ({ row }: { row: Row<Goro> }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.specialties?.map((specialty, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {specialty}
              </span>
            ))}
          </div>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: Row<Goro> }) => {
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
        header: 'Date Added',
        accessorKey: 'createdAt',
        cell: ({ row }: { row: Row<Goro> }) => <div>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm:ss a')}</div>
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: () => {
          return (
            <Button size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          );
        }
      }
    ],
    []
  );

  const formModal = useFormModal();
  const handleAddGoro = () => {
    formModal.openForm({
      title: 'Add New Goro',
      children: <NewGoros onSubmit={handleSubmitGoro} loading={false} />,
      showFooter: false
    });
  };

  const { mutateAsync: createGoro } = useCreateGoro();
  const handleSubmitGoro = async (goroData: RegisterGoroDTO) => {
    try {
      await createGoro(goroData);
      toast.success('Goro created successfully');
    } catch {
      toast.error('Failed to create goro');
    } finally {
      formModal.close();
    }
  };

  const stats = [
    {
      title: 'Total goro',
      value: goros.length,
      Icon: Wrench,
      description: 'Active goro in system',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Specialties',
      value: '10',
      // value: new Set(goros.flatMap((g) => g.specialties)).size,
      Icon: Hammer,
      description: 'Different specializations',
      trend: '+2.4%',
      trendUp: true
    },
    {
      title: 'Average Skills',
      value: '10',
      // value: goros.length ? Math.round(goros.reduce((acc, g) => acc + g.specialties.length, 0) / goros.length) : 0,
      Icon: Cog,
      description: 'Skills per mechanic',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Pending Approvals',
      value: '5',
      Icon: Users,
      description: 'goro awaiting approval',
      trend: '+0.9%',
      trendUp: false
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Goro')} />

      {/* Header */}
      <PageHeader
        title="Goro"
        description="Manage goro and their specialties"
        actions={
          <Button onClick={handleAddGoro} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Goro
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={goros}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
