const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-green-50">
    <div className="space-y-4 text-center">
      {/* spinner */}
      <div className="w-12 h-12 mx-auto border-8 border-green-200 rounded-full border-t-green-600 animate-spin" />

      {/* text */}
      <p className="text-lg font-medium text-green-800">
        Loading, please wait...
      </p>
    </div>
  </div>
);

export default Loading;
