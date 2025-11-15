import { format } from 'date-fns';
import { ArrowLeft, Calendar, CheckCircle, Mail, Phone, ShoppingBag, User, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { CallOrderBuyer } from '../../../types/call-orders.types';

interface BuyerDetailsProps {
  buyer: CallOrderBuyer;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export default function BuyerDetails({ buyer, onPlaceOrder, onBack }: BuyerDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Search
            </Button>
            <div>
              <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
                <User className="h-5 w-5 mr-2" />
                Buyer Details
              </CardTitle>
              <CardDescription>Review buyer information before placing an order</CardDescription>
            </div>
          </div>
          <Button onClick={onPlaceOrder} className="bg-[#10B981] hover:bg-[#10B981]/90">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Place Order
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2">Personal Information</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-[#4A36EC] text-white rounded-full p-2">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{buyer.name}</p>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-[#10B981] text-white rounded-full p-2">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{buyer.phoneNumber}</p>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-[#F59E0B] text-white rounded-full p-2">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{buyer.email}</p>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2">Account Status</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Verification Status</span>
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
                <span className="text-sm text-muted-foreground">Account Status</span>
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
                <span className="text-sm text-muted-foreground">User Type</span>
                <Badge variant="outline" className="text-xs">
                  {buyer.user_type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2">Order History</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-[#8B5CF6] text-white rounded-full p-2">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{buyer.totalOrders || 0} Orders</p>
                  <p className="text-xs text-muted-foreground">Total Orders Placed</p>
                </div>
              </div>

              {buyer.lastOrderDate && (
                <div className="flex items-center space-x-3">
                  <div className="bg-[#6B7280] text-white rounded-full p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{format(new Date(buyer.lastOrderDate), 'dd MMM yyyy, HH:mm')}</p>
                    <p className="text-xs text-muted-foreground">Last Order Date</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Dates */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#4A36EC] border-b pb-2">Account Information</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">{format(new Date(buyer.createdAt), 'dd MMM yyyy')}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm font-medium">{format(new Date(buyer.updatedAt), 'dd MMM yyyy')}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">User ID</span>
                <span className="text-xs font-mono text-muted-foreground">{buyer.User_ID.slice(-8)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t flex justify-end space-x-3">
          <Button variant="outline" onClick={onBack} className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          <Button onClick={onPlaceOrder} className="bg-[#10B981] hover:bg-[#10B981]/90">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Place Order for {buyer.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
