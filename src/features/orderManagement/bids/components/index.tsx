import { motion } from 'framer-motion';
import { ChevronRight, HammerIcon, Package, ShoppingCart, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageLoader from '@/components/loaders/pageLoader';
import { Card, CardContent } from '@/components/ui/card';
import { toastConfig } from '@/lib/toast';

import { useBids } from '../api/queries/bidsQueries';
import { Bid, SparePart } from '../types';
import { BidsTable } from './bidsTable';

export default function BidsPage() {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);

  // bids related code
  const { data, isLoading, isError } = useBids();
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    if (data) {
      setBids(data.data);
    }

    return () => {
      setBids([]);
    };
  }, [data?.data]);

  const handlePartClick = (part: SparePart) => {
    navigate(`/bids/parts/${part.id}`);
  };

  const stats = [
    {
      title: 'Total Orders',
      value: bids.length,
      icon: ShoppingCart,
      description: 'Active orders in the system',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Parts Categories',
      value: new Set(bids.map((b) => b.partCategory)).size,
      icon: Package,
      description: 'Different part types',
      trend: '+2.8%',
      trendUp: true
    },
    {
      title: 'Mechanics',
      value: new Set(bids.map((b) => b.mechanicId)).size,
      icon: Wrench,
      description: 'Active mechanics',
      trend: '+3.4%',
      trendUp: true
    },
    {
      title: 'Dealers',
      value: new Set(bids.map((b) => b.dealerId)).size,
      icon: HammerIcon,
      description: 'Participating dealers',
      trend: '+1.2%',
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
    return <div>Error loading bids</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/orders" className="hover:text-[#4A36EC]">
          Orders
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Bids</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Spare Parts Bids</h1>
          <p className="text-sm text-gray-600">Manage and track spare parts orders and bids</p>
        </div>
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

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <BidsTable bids={bids} onPartClick={handlePartClick} />
      </motion.div>
    </div>
  );
}
