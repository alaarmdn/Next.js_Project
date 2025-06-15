import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-6xl font-extrabold text-maroon mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="bg-maroon hover:bg-[#220004] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
        Go back home
      </Link>
    </div>
  );
} 