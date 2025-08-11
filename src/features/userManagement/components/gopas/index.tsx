import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Cog, Eye, Hammer, Plus, Users, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { cn } from '@/lib/utils';

import { useCreateGopa } from '../../api/mutations/gopas.mutations';
import { useGetGopaList } from '../../api/queries/gopas.queries';
import { Gopa, RegisterGopaDTO } from '../../types/gopa.types';
import { NewGopas } from './newGopa';

export default function GopasPage() {
  const { data, isLoading } = useGetGopaList();
  const gopas = useMemo(() => data?.data || [], [data?.data]);

  const columns = useMemo(
    (): ColumnDef<Gopa>[] => [
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
        cell: ({ row }: { row: Row<Gopa> }) => (
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
        header: 'Date Added',
        accessorKey: 'createdAt',
        cell: ({ row }) => <div>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm:ss a')}</div>
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
  const handleAddGopa = () => {
    formModal.openForm({
      title: 'Add New Gopa',
      children: <NewGopas onSubmit={handleSubmitGopa} loading={false} />,
      showFooter: false
    });
  };

  const { mutateAsync: createGopa } = useCreateGopa();
  const handleSubmitGopa = async (gopaData: RegisterGopaDTO) => {
    try {
      await createGopa(gopaData);
      toast.success('Gopa created successfully');
    } catch {
      toast.error('Failed to create gopa');
    } finally {
      formModal.close();
    }
  };

  const stats = [
    {
      title: 'Total gopa',
      value: gopas.length,
      Icon: Wrench,
      description: 'Active gopa in system',
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
      description: 'gopa awaiting approval',
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
        title="Gopa"
        description="Manage gopa and their specialties"
        actions={
          <Button onClick={handleAddGopa} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Gopa
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={gopas}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
