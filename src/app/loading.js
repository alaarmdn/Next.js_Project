import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 text-maroon animate-spin" />
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  );
} 