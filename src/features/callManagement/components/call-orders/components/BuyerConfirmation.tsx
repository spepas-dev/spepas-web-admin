import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Mail, Phone, ShoppingBag, User, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { CallOrderBuyer } from '../../../types/call-orders.types';

interface BuyerConfirmationProps {
  buyer: CallOrderBuyer;
  onConfirm: () => void;
  onBack: () => void;
}

export default function BuyerConfirmation({ buyer, onConfirm, onBack }: BuyerConfirmationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
          <UserCheck className="h-5 w-5 mr-2" />
          Step 2: Confirm Customer Details
        </CardTitle>
        <CardDescription>Please verify the customer information before proceeding to place an order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Customer Overview Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-[#4A36EC] text-white rounded-full p-3">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{buyer.name}</h3>
                <p className="text-sm text-gray-600">Customer ID: {buyer.User_ID.slice(-8)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#4A36EC]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{buyer.phoneNumber}</p>
                  <p className="text-xs text-gray-500">Phone Number</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#4A36EC]" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{buyer.email}</p>
                  <p className="text-xs text-gray-500">Email Address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Status */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">Account Status</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification Status</span>
                  <Badge
                    variant={buyer.verificationStatus === 1 ? 'default' : 'secondary'}
                    className={cn(
                      'text-xs',
                      buyer.verificationStatus === 1
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    )}
                  >
                    <UserCheck className="h-3 w-3 mr-1" />
                    {buyer.verificationStatus === 1 ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge
                    variant={buyer.status === 1 ? 'default' : 'secondary'}
                    className={cn(
                      'text-xs',
                      buyer.status === 1 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                    )}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {buyer.status === 1 ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">User Type</span>
                  <Badge variant="outline" className="text-xs">
                    {buyer.user_type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 border-b pb-2">Order History</h4>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#8B5CF6] text-white rounded-full p-2">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{buyer.totalOrders || 0} Orders</p>
                    <p className="text-xs text-gray-500">Total Orders Placed</p>
                  </div>
                </div>

                {buyer.lastOrderDate && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#6B7280] text-white rounded-full p-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{format(new Date(buyer.lastOrderDate), 'dd MMM yyyy, HH:mm')}</p>
                      <p className="text-xs text-gray-500">Last Order Date</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">{format(new Date(buyer.createdAt), 'dd MMM yyyy')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800">Ready to Place Order</h4>
                <p className="text-sm text-green-700 mt-1">
                  Customer details have been verified. You can now proceed to enter the spare part information for their order.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={onBack} className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <Button onClick={onConfirm} className="bg-[#10B981] hover:bg-[#10B981]/90">
              Confirm Customer & Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
