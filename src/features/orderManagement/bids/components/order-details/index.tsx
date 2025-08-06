import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Handshake, Package, ShoppingCart, Tag, Truck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toastConfig } from '@/lib/toast';

// Mock data based on the provided structure
const orderDetails = {
  id: 2,
  bidding_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  assigned_by: 'John Admin',
  Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  gopa_user_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  date_assigned: '2025-04-23T17:19:28.510Z',
  status: 1, // 0: Pending, 1: Accepted, 2: Rejected, 3: Completed
  price: 125.99,
  unitPrice: 125.99,
  description: 'High-quality brake pad set for optimal stopping power and durability.',
  createdAt: '2025-04-23T17:19:28.510Z',
  date_accepted: '2025-04-24T10:30:15.510Z',
  seller: {
    id: 1,
    Seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    storeName: 'AutoParts Pro',
    business_reg_url: 'https://example.com/business-reg',
    business_reg_obj: {},
    Location: {
      type: 'Point',
      coordinates: [37.7749, -122.4194]
    },
    Gopa_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    date_added: '2025-01-15T10:30:00.510Z',
    status: 1
  },
  images: [
    {
      id: 1,
      image_ID: 'e16a631f-905d-4a6b-871d-7b4877c306d6',
      SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
      createdAt: '2025-01-08T11:59:01.609Z',
      status: 1,
      image_url:
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      image_ob: {
        data1: 'dddd',
        data2: 'cdvfdbgdfbf'
      }
    },
    {
      id: 2,
      image_ID: 'f27b742g-016e-5b7c-982e-8c5988d417e7',
      SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
      createdAt: '2025-01-08T12:00:01.609Z',
      status: 1,
      image_url:
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      image_ob: {
        data1: 'eeee',
        data2: 'efghijklmnop'
      }
    }
  ],
  gopa: {
    User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Sarah Gopa'
  },
  assigner: 'Michael Manager',
  orderRequest: {
    id: 1,
    request_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    added_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    status: 1,
    require_image: 1,
    quantity: 1,
    createdAt: '2025-04-22T15:30:28.510Z',
    requester: {
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'David Customer'
    },
    creater: {
      User_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'David Customer'
    },
    sparePart: {
      id: 1,
      SparePart_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Brake Pad Set',
      description: 'High-quality brake pad set for optimal stopping power and durability.',
      price: 125.99,
      status: 1,
      discount_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      category_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      carModel_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      seller_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2025-01-08T10:17:33.989Z',
      updatedAt: '2025-01-08T10:17:33.989Z',
      images: [
        {
          id: 1,
          image_ID: 'e16a631f-905d-4a6b-871d-7b4877c306d6',
          SparePart_ID: '6a2a9842-8f5c-44df-b951-f870907ba939',
          createdAt: '2025-01-08T11:59:01.609Z',
          status: 1,
          image_url:
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          image_ob: {
            data1: 'dddd',
            data2: 'cdvfdbgdfbf'
          }
        }
      ],
      carModel: {
        id: 1,
        CarModel_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Camry',
        yearOfMake: 2020,
        carBrand_ID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        status: 1,
        createdAt: '2025-01-08T10:17:33.989Z',
        carBrand: {
          id: 1,
          CarBrand_ID: '7043f08a-59f0-48bf-bf1d-ba11d1103908',
          name: 'Toyota',
          status: 1,
          manufacturer_ID: 'fc3d7feb-0825-43ba-9f2d-b95ee62f464b',
          createdAt: '2025-01-08T10:17:33.989Z',
          type: 'CAR',
          manufacturer: {
            id: 1,
            Manufacturer_ID: 'fc3d7feb-0825-43ba-9f2d-b95ee62f464b',
            name: 'Toyota',
            country: 'Japan',
            status: 1,
            createdAt: '2025-01-08T10:09:21.400Z'
          }
        }
      }
    }
  }
};

// Status mapping with proper TypeScript types
type OrderStatus = 0 | 1 | 2 | 3;
type StatusMap = {
  [key in OrderStatus]: {
    label: string;
    color: string;
  };
};

const statusMap: StatusMap = {
  0: { label: 'Pending', color: 'bg-yellow-500' },
  1: { label: 'Accepted', color: 'bg-green-500' },
  2: { label: 'Rejected', color: 'bg-red-500' },
  3: { label: 'Completed', color: 'bg-blue-500' }
};

export default function OrderDetailsPage() {
  const navigate = useNavigate();

  // In a real application, you would fetch the order details based on the ID
  // For now, we'll use the mock data
  const order = orderDetails;

  const handleStatusChange = (newStatus: OrderStatus) => {
    // In a real application, this would call an API
    toastConfig.success(`Order status updated to ${statusMap[newStatus].label}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', `Order #${order.id}`)} />

      {/* Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#4A36EC]">Order #{order.id}</h1>
            <Badge className={`${statusMap[order.status as OrderStatus].color} text-white`}>
              {statusMap[order.status as OrderStatus].label}
            </Badge>
          </div>
        }
        description="Order details and tracking information"
        actions={
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate('/order-management/orders')}
              className="bg-white hover:bg-gray-100 text-[#4A36EC] border border-[#4A36EC]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
            {order.status === 0 && (
              <Button onClick={() => handleStatusChange(1)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Accept Order
              </Button>
            )}
            {order.status === 1 && (
              <Button onClick={() => handleStatusChange(3)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
                Mark as Completed
              </Button>
            )}
          </div>
        }
      />

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <CardTitle className="text-[#4A36EC]">Order Information</CardTitle>
                  <CardDescription>Details about the order and spare part</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Order ID</p>
                      <p className="text-lg">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Request ID</p>
                      <p className="font-mono text-sm">{order.request_ID.substring(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date Created</p>
                      <p className="text-lg">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date Assigned</p>
                      <p className="text-lg">{formatDate(order.date_assigned)}</p>
                    </div>
                    {order.date_accepted && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Date Accepted</p>
                        <p className="text-lg">{formatDate(order.date_accepted)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price</p>
                      <p className="text-lg font-bold text-[#4A36EC]">GHS {order.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quantity</p>
                      <p className="text-lg">{order.orderRequest.quantity}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Description</p>
                    <p className="text-base mt-1">{order.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <CardTitle className="text-[#4A36EC]">Spare Part Details</CardTitle>
                  <CardDescription>Information about the requested spare part</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Part Name</p>
                      <p className="text-lg">{order.orderRequest.sparePart.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Part ID</p>
                      <p className="text-lg font-mono text-sm">{order.orderRequest.sparePart.SparePart_ID.substring(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Car Brand</p>
                      <p className="text-lg">{order.orderRequest.sparePart.carModel.carBrand.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Car Model</p>
                      <p className="text-lg">
                        {order.orderRequest.sparePart.carModel.name} ({order.orderRequest.sparePart.carModel.yearOfMake})
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Part Description</p>
                    <p className="text-base mt-1">{order.orderRequest.sparePart.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <CardTitle className="text-[#4A36EC]">Images</CardTitle>
                  <CardDescription>Images of the spare part</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.images.map((image) => (
                      <div key={image.id} className="relative aspect-video overflow-hidden rounded-md border border-gray-200">
                        <img src={image.image_url} alt={`Spare part image ${image.id}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#4A36EC]">Customer</CardTitle>
                      <CardDescription>Order requester information</CardDescription>
                    </div>
                    <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                      <User className="w-5 h-5 text-[#4A36EC]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Name</p>
                      <p className="text-lg">{order.orderRequest.requester.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">User ID</p>
                      <p className="text-lg font-mono text-sm">{order.orderRequest.requester.User_ID.substring(0, 8)}...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#4A36EC]">Seller</CardTitle>
                      <CardDescription>Seller information</CardDescription>
                    </div>
                    <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-[#4A36EC]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Store Name</p>
                      <p className="text-lg">{order.seller.storeName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Seller ID</p>
                      <p className="font-mono text-sm">{order.seller.Seller_ID.substring(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date Added</p>
                      <p className="text-lg">{formatDate(order.seller.date_added)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#4A36EC]">GOPA</CardTitle>
                      <CardDescription>GOPA information</CardDescription>
                    </div>
                    <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                      <Handshake className="w-5 h-5 text-[#4A36EC]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Name</p>
                      <p className="text-lg">{order.gopa.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">User ID</p>
                      <p className="font-mono text-sm">{order.gopa.User_ID.substring(0, 8)}...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardHeader>
              <CardTitle className="text-[#4A36EC]">Order Tracking</CardTitle>
              <CardDescription>Track the status of your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  <div className="relative flex items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A36EC] text-white">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-gray-500">{formatDate(order.orderRequest.createdAt)}</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A36EC] text-white">
                      <Tag className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Order Assigned</p>
                      <p className="text-xs text-gray-500">{formatDate(order.date_assigned)}</p>
                    </div>
                  </div>
                  {order.date_accepted && (
                    <div className="relative flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A36EC] text-white">
                        <ShoppingCart className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Order Accepted</p>
                        <p className="text-xs text-gray-500">{formatDate(order.date_accepted)}</p>
                      </div>
                    </div>
                  )}
                  {order.status === 3 && (
                    <div className="relative flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A36EC] text-white">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Order Completed</p>
                        <p className="text-xs text-gray-500">{formatDate(new Date().toISOString())}</p>
                      </div>
                    </div>
                  )}
                  {order.status < 3 && (
                    <div className="relative flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Order Completed</p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardHeader>
              <CardTitle className="text-[#4A36EC]">Order History</CardTitle>
              <CardDescription>History of order status changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="bg-[#4A36EC]/10 p-2 rounded-lg mr-3">
                      <Package className="w-5 h-5 text-[#4A36EC]" />
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-gray-500">By {order.orderRequest.creater.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(order.orderRequest.createdAt)}</p>
                    <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                      Created
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="bg-[#4A36EC]/10 p-2 rounded-lg mr-3">
                      <Tag className="w-5 h-5 text-[#4A36EC]" />
                    </div>
                    <div>
                      <p className="font-medium">Order Assigned</p>
                      <p className="text-sm text-gray-500">By {order.assigned_by}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(order.date_assigned)}</p>
                    <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                      Assigned
                    </Badge>
                  </div>
                </div>
                {order.date_accepted && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="bg-[#4A36EC]/10 p-2 rounded-lg mr-3">
                        <ShoppingCart className="w-5 h-5 text-[#4A36EC]" />
                      </div>
                      <div>
                        <p className="font-medium">Order Accepted</p>
                        <p className="text-sm text-gray-500">By {order.seller.storeName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDate(order.date_accepted)}</p>
                      <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                        Accepted
                      </Badge>
                    </div>
                  </div>
                )}
                {order.status === 3 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-[#4A36EC]/10 p-2 rounded-lg mr-3">
                        <Truck className="w-5 h-5 text-[#4A36EC]" />
                      </div>
                      <div>
                        <p className="font-medium">Order Completed</p>
                        <p className="text-sm text-gray-500">By {order.seller.storeName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDate(new Date().toISOString())}</p>
                      <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                        Completed
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
