import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Edit, Mail, Package, Phone, Smartphone, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { useCallOrder, useUpdateCallOrderStatus } from '../hooks/useCallOrders';
import { CallOrder } from '../types/call-orders.types';

export default function CallOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: orderData, isLoading, error } = useCallOrder(orderId || '', !!orderId);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateCallOrderStatus();

  const order = orderData?.data;

  const handleStatusUpdate = (newStatus: CallOrder['status']) => {
    if (orderId) {
      updateStatus({ orderId, status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <Breadcrumb
          items={BreadcrumbPatterns.fourTier(
            'Order Management',
            '/order-management/orders',
            'Call Orders',
            '/call-management/calls-orders',
            'Order Details'
          )}
        />
        <PageHeader title="Call Order Details" description="View and manage call order information" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 space-y-8">
        <Breadcrumb
          items={BreadcrumbPatterns.fourTier(
            'Order Management',
            '/order-management/orders',
            'Call Orders',
            '/call-management/calls-orders',
            'Order Details'
          )}
        />
        <PageHeader title="Call Order Details" description="View and manage call order information" />

        <Alert variant="destructive">
          <AlertDescription>
            Failed to load call order details. The order may not exist or there was an error loading the data.
          </AlertDescription>
        </Alert>

        <Button variant="outline" onClick={() => navigate('/call-management/calls-orders')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Call Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={BreadcrumbPatterns.fourTier(
          'Order Management',
          '/order-management/orders',
          'Call Orders',
          '/call-management/calls-orders',
          `Order ${order.Call_Order_ID}`
        )}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title={`Call Order ${order.Call_Order_ID}`}
          description={`Order placed on ${format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm')}`}
        />
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => navigate('/call-management/calls-orders')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-[#4A36EC]" />
                  Order Information
                </span>
                <div className="flex items-center space-x-2">
                  <Badge className={cn('text-xs', getStatusColor(order.status))}>{order.status.replace('_', ' ')}</Badge>
                  <Badge className={cn('text-xs', getPriorityColor(order.priority))}>{order.priority}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Spare Part Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Part Name:</span>
                        <span className="text-sm font-medium">{order.spare_part_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <span className="text-sm font-medium">{order.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Image Required:</span>
                        <span className="text-sm font-medium">{order.require_image ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Call Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Call Type:</span>
                        <div className="flex items-center space-x-1">
                          {order.call_type === 'PHONE' ? (
                            <Phone className="h-3 w-3 text-blue-600" />
                          ) : (
                            <Smartphone className="h-3 w-3 text-green-600" />
                          )}
                          <span className="text-sm font-medium">{order.call_type}</span>
                        </div>
                      </div>
                      {order.call_duration && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-sm font-medium">{order.call_duration} min</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-[#4A36EC]" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{order.buyer_name}</p>
                      <p className="text-xs text-gray-500">Customer Name</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{order.buyer_phone}</p>
                      <p className="text-xs text-gray-500">Phone Number</p>
                    </div>
                  </div>
                </div>

                {order.buyer && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{order.buyer.email}</p>
                        <p className="text-xs text-gray-500">Email Address</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{format(new Date(order.buyer.createdAt), 'dd MMM yyyy')}</p>
                        <p className="text-xs text-gray-500">Member Since</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <Badge className={cn('text-sm px-3 py-1', getStatusColor(order.status))}>{order.status.replace('_', ' ')}</Badge>
              </div>

              <div className="space-y-2">
                {order.status === 'PENDING' && (
                  <Button size="sm" className="w-full" onClick={() => handleStatusUpdate('IN_PROGRESS')} disabled={isUpdatingStatus}>
                    Mark In Progress
                  </Button>
                )}

                {order.status === 'IN_PROGRESS' && (
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusUpdate('COMPLETED')}
                    disabled={isUpdatingStatus}
                  >
                    Mark Completed
                  </Button>
                )}

                {(order.status === 'PENDING' || order.status === 'IN_PROGRESS') && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleStatusUpdate('CANCELLED')}
                    disabled={isUpdatingStatus}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium">Order Created</p>
                    <p className="text-xs text-gray-500">{format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm')}</p>
                  </div>
                </div>

                {order.updatedAt !== order.createdAt && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-xs font-medium">Last Updated</p>
                      <p className="text-xs text-gray-500">{format(new Date(order.updatedAt), 'dd MMM yyyy, HH:mm')}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
