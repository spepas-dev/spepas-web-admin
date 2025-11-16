import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Phone, Search, Smartphone, Users } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, PageHeader } from '@/components/ui/custom';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CallOrderWizard from './components/BuyerSearch';
import CallOrdersList from './components/CallOrdersList';
import { useCallOrderStats } from './hooks/useCallOrders';

export default function CallOrdersPage() {
  const [activeTab, setActiveTab] = useState('search');
  // const { data: statsData, isLoading: statsLoading, error: statsError } = useCallOrderStats();

  // Extract stats from API response or use defaults
  const callStats =
    // statsData?.data ||
    {
      totalCalls: 0,
      phoneOrders: 0,
      ussdOrders: 0,
      completedOrders: 0,
      averageCallDuration: '0 min',
      todaysCalls: 0
    };

  const stats = [
    {
      title: 'Total Calls Today',
      value: callStats.todaysCalls,
      Icon: Phone,
      description: 'Calls received today',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Phone Orders',
      value: callStats.phoneOrders,
      Icon: Phone,
      description: 'Orders placed via phone',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'USSD Orders',
      value: callStats.ussdOrders,
      Icon: Smartphone,
      description: 'Orders placed via USSD',
      trend: '+15.2%',
      trendUp: true
    },
    {
      title: 'Completed Orders',
      value: callStats.completedOrders,
      Icon: CheckCircle,
      description: 'Successfully completed',
      trend: '+6.7%',
      trendUp: true
    },
    {
      title: 'Avg Call Duration',
      value: callStats.averageCallDuration,
      Icon: Clock,
      description: 'Average call time',
      trend: '-0.3 min',
      trendUp: true
    }
  ];

  // Loading state for stats
  // if (statsLoading) {
  //   return (
  //     <div className="p-8 space-y-8">
  //       <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Call Orders')} />
  //       <PageHeader title="Call-In Order Management" description="Manage phone and USSD orders placed by customers through call center" />

  //       {/* Loading skeleton for stats */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  //         {Array.from({ length: 5 }).map((_, index) => (
  //           <Card key={index}>
  //             <CardContent className="p-6">
  //               <Skeleton className="h-4 w-24 mb-2" />
  //               <Skeleton className="h-8 w-16 mb-2" />
  //               <Skeleton className="h-3 w-20" />
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>

  //       <Card>
  //         <CardContent className="p-6">
  //           <Skeleton className="h-8 w-48 mb-4" />
  //           <Skeleton className="h-64 w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  // // Error state for stats
  // if (statsError) {
  //   return (
  //     <div className="p-8 space-y-8">
  //       <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Call Orders')} />
  //       <PageHeader title="Call-In Order Management" description="Manage phone and USSD orders placed by customers through call center" />

  //       <Alert variant="destructive">
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertDescription>Failed to load dashboard statistics. Please refresh the page or try again later.</AlertDescription>
  //       </Alert>

  //       {/* Still show the main interface even if stats fail */}
  //       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
  //         <Card>
  //           <CardHeader>
  //             <CardTitle className="text-lg font-semibold text-[#4A36EC]">Call Order Management</CardTitle>
  //             <CardDescription>Search for buyers and place orders on their behalf</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  //               <TabsList className="grid w-full grid-cols-2 mb-6">
  //                 <TabsTrigger value="search" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
  //                   <Search className="h-4 w-4 mr-2" />
  //                   Search & Place Order
  //                 </TabsTrigger>
  //                 <TabsTrigger value="orders" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
  //                   <Users className="h-4 w-4 mr-2" />
  //                   Call Orders History
  //                 </TabsTrigger>
  //               </TabsList>

  //               <TabsContent value="search" className="space-y-4">
  //                 <div className="border rounded-lg p-6 bg-blue-50/50">
  //                   <h3 className="text-sm font-medium text-[#4A36EC] mb-2 flex items-center">
  //                     <Phone className="h-4 w-4 mr-2" />
  //                     Phone & USSD Order Placement
  //                   </h3>
  //                   <p className="text-xs text-muted-foreground mb-4">Search for buyers by phone number and place orders on their behalf</p>
  //                   <CallOrderWizard />
  //                 </div>
  //               </TabsContent>

  //               <TabsContent value="orders" className="space-y-4">
  //                 <div className="border rounded-lg p-6 bg-green-50/50">
  //                   <h3 className="text-sm font-medium text-[#10B981] mb-2 flex items-center">
  //                     <Users className="h-4 w-4 mr-2" />
  //                     Call Orders History
  //                   </h3>
  //                   <p className="text-xs text-muted-foreground mb-4">View and manage all orders placed through phone and USSD</p>
  //                   <CallOrdersList />
  //                 </div>
  //               </TabsContent>
  //             </Tabs>
  //           </CardContent>
  //         </Card>
  //       </motion.div>
  //     </div>
  //   );
  // }

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
                  <CallOrderWizard />
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
