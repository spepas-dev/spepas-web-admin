import { motion } from 'framer-motion';
import { Cog, Eye, Hammer, Plus, Users, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { cn } from '@/lib/utils';

import { useGetGoroList } from '../../api/queries/goro.queries';
import { GoroDialog } from './goroDialog';

export interface Goro {
  User_ID: string;
  Specialties: string[][];
}

export default function GorosPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, isError } = useGetGoroList();
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
        header: 'Phone Number',
        accessorKey: 'phoneNumber'
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
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
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

  const handleAddGoros = async (newGoros: Goro[]) => {
    // Handle API call here
    console.log(newGoros);

    setIsDialogOpen(false);
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
      // value: new Set(goros.flatMap((g) => g.Specialties.flat())).size,
      Icon: Hammer,
      description: 'Different specializations',
      trend: '+2.4%',
      trendUp: true
    },
    {
      title: 'Average Skills',
      value: '10',
      // value: goros.length ? Math.round(goros.reduce((acc, g) => acc + g.Specialties.flat().length, 0) / goros.length) : 0,
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
          <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
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

      <GoroDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddGoros} />
    </div>
  );
}
