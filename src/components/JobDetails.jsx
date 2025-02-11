import { useParams, Link } from "react-router-dom";

const JobDetails = ({ jobs = [] }) => {
  const { id } = useParams();
  const job = jobs.find((job) => job.id.toString() === id);

  if (!job) {
    return <p className="text-center text-red-500">Job not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600">{job.title}</h2>
      <p className="text-gray-500 text-lg font-medium">{job.company}</p>
      <p className="text-gray-400">📍 {job.location}</p>

      {job.salary && (
        <p className="text-green-600 font-semibold mt-2">💰 Salary: {job.salary}</p>
      )}
      <p className="text-purple-600 mt-2">🕒 Job Type: {job.jobType || "Not Specified"}</p>
      
      <p className="mt-4 text-gray-700 leading-relaxed">{job.description}</p>

      <p className="text-gray-400 text-sm mt-3">
        📅 Posted on: {job.datePosted || "Unknown"}
      </p>

      <div className="mt-6">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          🔙 Back to Listings
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
