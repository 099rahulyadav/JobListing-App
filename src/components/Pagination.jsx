const Pagination = ({ currentPage, setCurrentPage, totalJobs, jobsPerPage }) => {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed">
        Previous
      </button>
      <span className="text-xl px-4">Page {currentPage} of {totalPages}</span>
      <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
