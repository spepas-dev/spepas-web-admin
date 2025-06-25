import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Calendar, Car, ChevronRight, Factory, Plus, Settings } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { toastConfig } from '@/lib/toast';

import { useCreateModel } from '../../api/mutations/modelMutations';
import { useCarModels } from '../../api/queries/modelsQueries';
import { CarModel, CreateCarModel } from '../../types';
import { ModelDialog } from './modelDialog';
import { ModelTable } from './modelTable';

export default function ModelsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [models, setModels] = useState<CarModel[]>([]);
  const { data, isLoading, isError } = useCarModels();

  const columns: ColumnDef<CarModel>[] = useMemo(() => {
    return [
      {
        header: 'Name of Model',
        accessorKey: 'name'
      },
      {
        header: 'Manufacturer ID',
        accessorKey: 'carBrand_ID'
      },
      {
        header: 'Year of Make',
        accessorKey: 'yearOfMake'
      }
    ];
  }, []);

  useEffect(() => {
    if (data) {
      setModels(data.data);
    }

    return () => {
      setModels([]);
    };
  }, [data?.data]);

  // function to handle add models
  const { mutate: createModel } = useCreateModel();
  const handleAddModels = async (newModels: CreateCarModel[]) => {
    // Handle API call here
    console.log(newModels);
    createModel(newModels, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toastConfig.success('Model created successfully');
      },
      onError: () => {
        setIsDialogOpen(false);
        toastConfig.error('Failed to create model');
      }
    });
  };

  const stats = [
    {
      title: 'Total Models',
      value: models.length,
      Icon: Car,
      description: 'Active car models in the system',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Latest Year',
      value: models.length > 0 ? Math.max(...models.map((m) => m.yearOfMake)) : 0,
      Icon: Calendar,
      description: 'Most recent model year',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'Manufacturers',
      value: new Set(models.map((m) => m.carBrand_ID)).size,
      Icon: Factory,
      description: 'Associated manufacturers',
      trend: '+2.8%',
      trendUp: true
    },
    {
      title: 'Parts Categories',
      value: 89,
      Icon: Settings,
      description: 'Compatible parts categories',
      trend: '+4.1%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading models</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/inventory" className="hover:text-[#4A36EC]">
          Inventory
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Models</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Vehicle Models</h1>
          <p className="text-sm text-gray-600">Manage vehicle models and their specifications</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Model
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          columns={columns}
          data={models}
          placeholder="Seach models..."
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>

      <ModelDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddModels} />
    </div>
  );
}
