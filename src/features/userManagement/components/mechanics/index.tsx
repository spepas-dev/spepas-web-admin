import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { MapPin, Plus, Store, Users, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { DataTable, PageHeader } from '@/components/ui/custom';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useGetMepaList } from '../../api/queries/mepas.queries';
import { CreateMepaDTO, Mepa } from '../../types/mechanics.types';
import { NewMechanics } from './newMechanics';

export default function MechanicsPage() {
  const { data, isLoading } = useGetMepaList();
  const mepas = useMemo(() => data?.data || [], [data?.data]);
  const columns = useMemo(
    () => [
      {
        header: 'Shop Name',
        accessorKey: 'shop_name',
        cell: ({ row }: { row: Row<Mepa> }) => <div>{row.original.shop_name}</div>
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ row }: { row: Row<Mepa> }) => <div>{row.original.address}</div>
      },
      {
        header: 'User ID',
        accessorKey: 'User_ID',
        cell: ({ row }: { row: Row<Mepa> }) => <div>{row.original.User_ID}</div>
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }: { row: Row<Mepa> }) => {
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
        accessorKey: 'date_added',
        cell: ({ row }: { row: Row<Mepa> }) => <div>{new Date(row.original.date_added).toLocaleDateString()}</div>
      }
    ],
    []
  );

  const formModal = useFormModal();
  const handleAddMechanic = () => {
    formModal.openForm({
      title: 'Add New Mechanic Shop',
      children: <NewMechanics onSubmit={handleSubmitMechanic} loading={false} />,
      showFooter: false
    });
  };

  const handleSubmitMechanic = async (mechanicData: CreateMepaDTO) => {
    try {
      // Handle API call here
      console.log(mechanicData);
      toast.success('Mechanic shop created successfully');
      formModal.close();
    } catch {
      toast.error('Failed to create mechanic shop');
    }
  };

  const stats = [
    {
      title: 'Total Mechanics',
      value: mepas.length,
      Icon: Wrench,
      description: 'Registered mechanic shops',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Active Locations',
      value: mepas.length,
      Icon: MapPin,
      description: 'Service locations',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Shop Types',
      value: 12,
      Icon: Store,
      description: 'Different specializations',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Service Areas',
      value: new Set(mepas.map((m) => m.address?.split(',').pop()?.trim())).size,
      Icon: Users,
      description: 'Areas covered',
      trend: '+0.9%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Mepas')} />

      {/* Header */}
      <PageHeader
        title="Mepas"
        description="Manage mepas and their locations"
        actions={
          <Button onClick={handleAddMechanic} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Mechanic Shop
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={mepas}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
