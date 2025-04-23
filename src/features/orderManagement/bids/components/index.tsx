import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock data for spare parts - replace with actual data later
const spareParts = [
  {
    id: '1',
    name: 'Brake Pad Set',
    category: 'Brakes',
    condition: 'New',
    price: 89.99,
    stock: 15,
    manufacturer: 'Bosch'
  },
  {
    id: '2',
    name: 'Oil Filter',
    category: 'Filters',
    condition: 'New',
    price: 12.99,
    stock: 50,
    manufacturer: 'Mann'
  },
  {
    id: '3',
    name: 'Spark Plug Set',
    category: 'Ignition',
    condition: 'New',
    price: 24.99,
    stock: 30,
    manufacturer: 'NGK'
  }
  // Add more mock data as needed
];

export default function BidsPage() {
  const navigate = useNavigate();

  const handleSparePartClick = (id: string) => {
    navigate(`/bids/${id}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Spare Parts Bids</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search spare parts..." className="pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spareParts.map((part) => (
          <Card key={part.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSparePartClick(part.id)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{part.name}</CardTitle>
                  <CardDescription>{part.manufacturer}</CardDescription>
                </div>
                <Badge variant="secondary">{part.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold">${part.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-semibold">{part.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition:</span>
                  <Badge variant="outline">{part.condition}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
