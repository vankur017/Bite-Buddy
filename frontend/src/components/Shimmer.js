const Shimmer = () => {
  return (
    <div className="restaurant-container flex flex-wrap justify-center gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg w-[350px] h-[490px] p-4 flex flex-col gap-4"
        >
          <div className="h-64 w-full bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer