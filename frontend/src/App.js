import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataGridTable from "./components/DataGridComponent";
import DetailView from "./components/DetailView";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [rowData, setRowData] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/data", {
          params: { search: debouncedQuery },
        });
        setRowData(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch data:",
          err.response?.data || err.message
        );
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const colDefs = [
    { field: "Brand" },
    { field: "Model" },
    { field: "TopSpeed_KmH", headerName: "Top Speed (km/h)" },
    { field: "Range_Km", headerName: "Range (km)" },
    { field: "PriceEuro", headerName: "Price (€)" },
    { field: "Seats" },
    { field: "PowerTrain" },
    { field: "PlugType" },
    {
      field: "RapidCharge",
      cellRenderer: (p) => (p.value ? "✅" : "❌"),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
            alt="BMW Logo"
            width={80}
            style={{ marginBottom: 16 }}
          />
          <h1 style={{ margin: 0 }}>BMW Aptitude Test Portal</h1>
          <p style={{ fontSize: "1.2rem", color: "#555" }}>
            For IT Internship Applicants
          </p>
        </Box>

        <TextField
          label="Search by Brand or Model"
          variant="outlined"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
        />

        <Box mt={3}>
          <DataGridTable rowData={rowData} columnDefs={colDefs} />
        </Box>
      </Box>
    </Box>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<DetailView />} />
    </Routes>
  </Router>
);

export default App;
