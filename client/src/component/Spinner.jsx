export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
