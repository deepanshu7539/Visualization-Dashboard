import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const DataChart = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
  });
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });

    axios
      .get("http://localhost:5000/api/filter-options")
      .then((response) => {
        setFilterOptions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the filter options!", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredData = data
    .filter((item) => {
      return Object.keys(filters).every((key) => {
        return (
          filters[key] === "" ||
          item[key].toUpperCase().includes(filters[key].toUpperCase())
        );
      });
    })
    .map((item) => ({
      ...item,
      added: format(new Date(item.added), "MM-dd-yyyy, HH:mm:ss"), // Format the date and time
    }));

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center justify-center mb-8">
        {Object.keys(filters).map((key) => (
          <select
            key={key}
            className="mr-2 mb-2 p-2 border border-gray-300 rounded w-80 "
            name={key}
            value={filters[key]}
            onChange={handleFilterChange}
          >
            <option value="">{key.replace("_", " ").toUpperCase()}</option>
            {filterOptions[key] &&
              filterOptions[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-3 ">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
          <h2 className="text-xl font-bold mb-4 ml-14 ">Line Chart</h2>
          <LineChart width={400} height={300} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="added" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
            <Line type="monotone" dataKey="likelihood" stroke="#82ca9d" />
            <Line type="monotone" dataKey="relevance" stroke="#ffc658" />
          </LineChart>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
          <h2 className="text-xl font-bold mb-4 ml-16">Bar Chart</h2>
          <BarChart width={400} height={300} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="added" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intensity" fill="#8884d8" />
            <Bar dataKey="likelihood" fill="#82ca9d" />
            <Bar dataKey="relevance" fill="#ffc658" />
          </BarChart>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
          <h2 className="text-xl font-bold mb-4 ml-14">Area Chart</h2>
          <AreaChart width={400} height={300} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="added" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="intensity" fill="#8884d8" />
            <Area type="monotone" dataKey="likelihood" fill="#82ca9d" />
            <Area type="monotone" dataKey="relevance" fill="#ffc658" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default DataChart;
