const getUniqueValues = (jobs = [], key) => [...new Set(jobs.map((job) => job[key]).filter(Boolean))];

const SearchFilter = ({ filters, onFilterChange, jobs = [] }) => {
  const uniqueCompanies = getUniqueValues(jobs, "company");
  const uniqueJobTypes = getUniqueValues(jobs, "type");
  const uniqueLocations = getUniqueValues(jobs, "location");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* 🔍 Search Input */}
      <input
        type="text"
        value={filters.searchTerm}
        onChange={(e) => onFilterChange("search", e.target.value)}
        placeholder="Search by title..."
        className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full"
      />

      {/* 🏢 Company Filter */}
      <select
        value={filters.companyFilter}
        onChange={(e) => onFilterChange("company", e.target.value)}
        className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full"
      >
        <option value="">All Companies</option>
        {uniqueCompanies.map((company, i) => (
          <option key={i} value={company}>{company}</option>
        ))}
      </select>

      {/* 💼 Job Type Filter */}
      <select
        value={filters.jobTypeFilter}
        onChange={(e) => onFilterChange("jobType", e.target.value)}
        className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full"
      >
        <option value="">All Job Types</option>
        {uniqueJobTypes.map((type, i) => (
          <option key={i} value={type}>{type}</option>
        ))}
      </select>

      {/* 📍 Location Filter */}
      <select
        value={filters.locationFilter}
        onChange={(e) => onFilterChange("location", e.target.value)}
        className="border p-2 rounded dark:bg-gray-700 dark:text-white w-full"
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((location, i) => (
          <option key={i} value={location}>{location}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
