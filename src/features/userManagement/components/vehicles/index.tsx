import { motion } from 'framer-motion';
import { Car, ChevronRight, FileText, Palette, Plus, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { VehicleDialog } from './vehicleDialog';
import { VehicleTable } from './vehicleTable';

export interface Vehicle {
  User_ID: string;
  Deliver_ID: string;
  type: 'CAR' | 'MOTORCYCLE' | 'BICYCLE' | 'VAN';
  model: string;
  color: string;
  registrationNumber: string;
}

export default function VehiclesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddVehicles = async (newVehicles: Vehicle[]) => {
    try {
      // Handle API call here
      console.log(newVehicles);
      setVehicles([...vehicles, ...newVehicles]);
      setIsDialogOpen(false);
      setError(null);
    } catch (err) {
      setError('Failed to add vehicles');
      console.error(err);
    }
  };

  const stats = [
    {
      title: 'Total Vehicles',
      value: vehicles.length,
      icon: Car,
      description: 'Registered vehicles',
      trend: '+2.8%',
      trendUp: true
    },
    {
      title: 'Vehicle Types',
      value: new Set(vehicles.map((v) => v.type)).size,
      icon: FileText,
      description: 'Different categories',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'Color Variants',
      value: new Set(vehicles.map((v) => v.color)).size,
      icon: Palette,
      description: 'Available colors',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Active Riders',
      value: new Set(vehicles.map((v) => v.User_ID)).size,
      icon: Users,
      description: 'Assigned riders',
      trend: '+2.1%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/user-management" className="hover:text-[#4A36EC]">
          User Management
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Vehicles</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Rider Vehicles</h1>
          <p className="text-sm text-gray-600">Manage rider vehicles and registrations</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Register Vehicle
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table Container */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <VehicleTable vehicles={vehicles} />
      </motion.div>

      {/* Show error if exists */}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <VehicleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddVehicles} />
    </div>
  );
}
