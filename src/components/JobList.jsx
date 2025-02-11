import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";

const JobList = ({ jobs, filters, onFilterChange, currentPage, setCurrentPage, jobsPerPage }) => {
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      <SearchFilter filters={filters} onFilterChange={onFilterChange} jobs={jobs} />

      {jobs.length === 0 ? (
        <p className="text-center text-red-500 font-bold text-xl">No jobs found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {currentJobs.map((job) => (
            <li key={job.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Link to={`/job/${job.id}`} className="block">
                <h3 className="text-xl font-bold text-blue-600">{job.title}</h3>
                <p className="text-gray-500">{job.company}</p>
                <p className="text-gray-400">📍 {job.location}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalJobs={jobs.length}
        jobsPerPage={jobsPerPage}
      />
    </div>
  );
};

export default JobList;
