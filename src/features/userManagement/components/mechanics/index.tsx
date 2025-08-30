import { ColumnDef, Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { MapPin, Plus, Store, Users, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable, PageHeader } from '@/components/ui/custom';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreateMepa } from '../../api/mutations/mechanics.mutations';
import { useGetMepaList } from '../../api/queries/mepas.queries';
import { CreateMepaDTO, Mepa } from '../../types/mechanics.types';
import { MechanicMap } from './mechanicMap';
import { NewMechanics } from './newMechanics';

export default function MechanicsPage() {
  const { data, isLoading } = useGetMepaList();
  const mepas = useMemo(() => data?.data || [], [data?.data]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const formModal = useFormModal();
  const [selectedLocationForForm, setSelectedLocationForForm] = useState<{ lat: number; lng: number } | null>(null);

  const columns = useMemo(
    (): ColumnDef<Mepa>[] => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Phone',
        accessorKey: 'phoneNumber'
      },
      {
        header: 'User Type',
        accessorKey: 'user_type',
        cell: ({ row }) => {
          const userType = row.original.user_type;
          return <Badge variant="outline">{String(userType.charAt(0).toUpperCase() + userType.slice(1)).replace(/_/g, ' ')}</Badge>;
        }
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
        cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
      }
    ],
    []
  );

  const handleAddMechanic = () => {
    formModal.openForm({
      title: 'Add New Mechanic Shop',
      children: <NewMechanics onSubmit={handleSubmitMechanic} loading={false} selectedLocation={selectedLocationForForm} />,
      showFooter: false
    });
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    setSelectedLocationForForm(location);

    // Show a toast notification with the selected coordinates
    toast.success(`Location selected: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`);
  };

  const { mutateAsync: createMechanic } = useCreateMepa();
  const handleSubmitMechanic = async (mechanicData: CreateMepaDTO) => {
    try {
      const response = await createMechanic(mechanicData);
      console.log('response =>>>', response);
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

      {/* Map and Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-4">
          <DataTable
            data={mepas}
            columns={columns}
            loading={isLoading}
            tableStyle="border rounded-lg bg-white"
            tableHeadClassName="text-[#4A36EC] font-semibold"
          />
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden border"
        >
          <MechanicMap mechanics={mepas} selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
        </motion.div>
      </div>
    </div>
  );
}
