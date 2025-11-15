import { motion } from 'framer-motion';
import { CheckCircle, Clock, Phone, Search, Smartphone, Users } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, PageHeader } from '@/components/ui/custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BuyerSearch from './components/BuyerSearch';
import CallOrdersList from './components/CallOrdersList';

// Mock data for call order stats - replace with actual API call
const mockCallStats = {
  totalCalls: 245,
  phoneOrders: 156,
  ussdOrders: 89,
  completedOrders: 198,
  averageCallDuration: '4.2 min',
  todaysCalls: 23
};

export default function CallOrdersPage() {
  const [activeTab, setActiveTab] = useState('search');

  const stats = [
    {
      title: 'Total Calls Today',
      value: mockCallStats.todaysCalls,
      Icon: Phone,
      description: 'Calls received today',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Phone Orders',
      value: mockCallStats.phoneOrders,
      Icon: Phone,
      description: 'Orders placed via phone',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'USSD Orders',
      value: mockCallStats.ussdOrders,
      Icon: Smartphone,
      description: 'Orders placed via USSD',
      trend: '+15.2%',
      trendUp: true
    },
    {
      title: 'Completed Orders',
      value: mockCallStats.completedOrders,
      Icon: CheckCircle,
      description: 'Successfully completed',
      trend: '+6.7%',
      trendUp: true
    },
    {
      title: 'Avg Call Duration',
      value: mockCallStats.averageCallDuration,
      Icon: Clock,
      description: 'Average call time',
      trend: '-0.3 min',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Call Orders')} />

      {/* Header */}
      <PageHeader title="Call-In Order Management" description="Manage phone and USSD orders placed by customers through call center" />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Call Orders Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A36EC]">Call Order Management</CardTitle>
            <CardDescription>Search for buyers and place orders on their behalf</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="search" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search & Place Order
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Call Orders History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4">
                <div className="border rounded-lg p-6 bg-blue-50/50">
                  <h3 className="text-sm font-medium text-[#4A36EC] mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone & USSD Order Placement
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">Search for buyers by phone number and place orders on their behalf</p>
                  <BuyerSearch />
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <div className="border rounded-lg p-6 bg-green-50/50">
                  <h3 className="text-sm font-medium text-[#10B981] mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Call Orders History
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">View and manage all orders placed through phone and USSD</p>
                  <CallOrdersList />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
