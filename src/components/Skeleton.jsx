const SkeletonCard = () => {
  return (
    <div className='justify-items-center  '>
            <div className='flex flex-wrap w-[30%] min-w-96'>
       <div className="card flex flex-wrap bg-base-300 my-2 w-full shadow-sm m-2 animate-pulse">
    <div className="card-body">
      <div className="flex justify-between items-center flex-row-reverse">
        <h2 className="card-title w-32 h-6 bg-gray-400 rounded"></h2>
        <div className="w-16 h-16 rounded-full bg-gray-400"></div>
      </div>
      <div className="card-actions justify-end mt-4 space-x-2">
        <div className="btn btn-primary w-24 h-10 bg-gray-400 border-none"></div>
        <div className="btn btn-error w-24 h-10 bg-gray-400 border-none"></div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};



const Skeleton = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};

export default Skeleton;