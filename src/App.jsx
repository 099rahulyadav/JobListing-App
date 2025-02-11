import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // ✅ Fetch job data from API
  useEffect(() => {
    fetch("https://jsonfakery.com/jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        if (Array.isArray(data)) {
          setJobs(data);
          setFilteredJobs(data);
        } else {
          console.error("Invalid API response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // ✅ Apply filters when search terms or filters change
  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (companyFilter ? job?.company?.toLowerCase() === companyFilter.toLowerCase() : true) &&
      (jobTypeFilter ? job?.type?.toLowerCase() === jobTypeFilter.toLowerCase() : true) &&
      (locationFilter ? job?.location?.toLowerCase() === locationFilter.toLowerCase() : true)
    );

    console.log("Filtered Jobs:", filtered); // Debugging
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, companyFilter, jobTypeFilter, locationFilter, jobs]);

  // ✅ Update Filters Instantly
  const handleFilterChange = (type, value) => {
    if (type === "search") setSearchTerm(value);
    if (type === "company") setCompanyFilter(value);
    if (type === "jobType") setJobTypeFilter(value);
    if (type === "location") setLocationFilter(value);
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <JobList
                jobs={filteredJobs}
                filters={{ searchTerm, companyFilter, jobTypeFilter, locationFilter }}
                onFilterChange={handleFilterChange}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                jobsPerPage={jobsPerPage}
              />
            }
          />
          <Route path="/job/:id" element={<JobDetails jobs={jobs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
