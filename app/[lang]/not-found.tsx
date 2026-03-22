export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600 mt-2">Page Not Found</p>
      <a href="/" className="mt-4 text-blue-600 underline hover:text-blue-800">
        back to home
      </a>
    </div>
  );
}
