import { ArrowLeft, Car, CheckCircle, Clock, Image, Mail, Package, Phone, Smartphone, User } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';

import { CallOrderBuyer, OrderFormData } from '../types/call-orders.types';

interface OrderSummaryProps {
  buyer: CallOrderBuyer;
  orderData: OrderFormData;
  onComplete: () => void;
  onBack: () => void;
}

export default function OrderSummary({ buyer, orderData, onComplete, onBack }: OrderSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    // Simulate API call to create the order
    setTimeout(() => {
      toastConfig.success('Order placed successfully!');
      setIsSubmitting(false);
      onComplete();
    }, 2000);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#4A36EC] flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Step 4: Review & Submit Order
        </CardTitle>
        <CardDescription>Please review all the details before placing the order for {buyer.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Customer Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#4A36EC] mb-3 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{buyer.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{buyer.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{buyer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {buyer.verificationStatus === 1 ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Call Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              {orderData.call_type === 'PHONE' ? <Phone className="h-4 w-4 mr-2" /> : <Smartphone className="h-4 w-4 mr-2" />}
              Call Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Call Type:</span>
                <Badge variant="outline" className="text-xs">
                  {orderData.call_type === 'PHONE' ? 'Phone Call' : 'USSD'}
                </Badge>
              </div>
              {orderData.call_duration && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <div className="flex items-center text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {orderData.call_duration} minutes
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Spare Part Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Spare Part Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Part Name</span>
                  <p className="text-sm font-medium">{orderData.sparePart.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Category</span>
                  <p className="text-sm font-medium">{orderData.sparePart.category_ID}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Manufacturer</span>
                  <p className="text-sm font-medium">{orderData.sparePart.manufacturer_ID}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Car Brand</span>
                  <p className="text-sm font-medium">{orderData.sparePart.carBrand_ID}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Car Model</span>
                  <p className="text-sm font-medium">{orderData.sparePart.carModel_ID}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Year of Make</span>
                  <p className="text-sm font-medium">{orderData.sparePart.yearOfMake}</p>
                </div>
              </div>

              {orderData.sparePart.description && (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Description</span>
                  <p className="text-sm text-gray-700 mt-1">{orderData.sparePart.description}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Order Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-[#4A36EC]">{orderData.quantity}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Quantity</div>
                </div>

                <div className="text-center p-3 bg-white rounded-lg border">
                  <Badge className={cn('text-xs', getPriorityColor(orderData.priority))}>{orderData.priority}</Badge>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Priority</div>
                </div>

                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-center">
                    {orderData.require_image ? (
                      <div className="flex items-center text-green-600">
                        <Image className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Required</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not Required</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Image</div>
                </div>
              </div>

              {orderData.notes && (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Additional Notes</span>
                  <p className="text-sm text-gray-700 mt-1 p-3 bg-white rounded border">{orderData.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Confirmation Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800">Ready to Submit</h4>
                <p className="text-sm text-green-700 mt-1">
                  All information has been verified. Click "Place Order" to submit this order on behalf of the customer. The customer will
                  be notified via SMS and email.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280] hover:text-white"
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order Details
            </Button>
            <Button onClick={handleSubmitOrder} disabled={isSubmitting} className="bg-[#10B981] hover:bg-[#10B981]/90 px-8">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
