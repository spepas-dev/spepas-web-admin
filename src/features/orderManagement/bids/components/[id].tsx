import { useParams } from 'react-router-dom';

export default function SparePartDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Spare Part Details</h1>
      <p className="text-lg">Viewing details for spare part with ID: {id}</p>
    </div>
  );
}
