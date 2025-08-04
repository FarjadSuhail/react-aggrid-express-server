import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
import axios from "axios";

const DetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/data/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error("Failed to fetch detail:", err);
        setCar(null);
      }
    };
    fetchItem();
  }, [id]);

  if (!car) {
    return (
      <Box
        p={4}
        textAlign="center"
        sx={{
          maxWidth: 600,
          margin: "auto",
          mt: 5,
          bgcolor: "#fff",
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Loading or item not found
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to list
        </Button>
      </Box>
    );
  }

  const DetailRow = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          color: "text.secondary",
          minWidth: 150,
        }}
      >
        {label}:
      </Typography>
      <Typography sx={{ fontWeight: "400", textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/homepage/bmwgroup-homepage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 5,
        px: 2,
        color: "#fff",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.65)",
          maxWidth: 700,
          mx: "auto",
          borderRadius: 3,
          p: 4,
          boxShadow: 5,
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
            alt="BMW Logo"
            width={80}
            style={{ marginBottom: 16 }}
          />
          <Typography variant="h3" fontWeight={700}>
            BMW Aptitude Test Portal
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            IT Internship Position — Car Details
          </Typography>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          fontWeight={700}
          textAlign="center"
        >
          {car.Brand} {car.Model}
        </Typography>
        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.3)" }} />

        <DetailRow label="Acceleration (0-100)" value={`${car.AccelSec} sec`} />
        <DetailRow label="Top Speed" value={`${car.TopSpeed_KmH} km/h`} />
        <DetailRow label="Range" value={`${car.Range_Km} km`} />
        <DetailRow label="Efficiency" value={`${car.Efficiency_WhKm} Wh/km`} />
        <DetailRow label="Fast Charge" value={`${car.FastCharge_KmH} km/h`} />
        <DetailRow
          label="Rapid Charge"
          value={car.RapidCharge ? "Yes ✅" : "No ❌"}
        />
        <DetailRow label="PowerTrain" value={car.PowerTrain} />
        <DetailRow label="Plug Type" value={car.PlugType} />
        <DetailRow label="Body Style" value={car.BodyStyle} />
        <DetailRow label="Segment" value={car.Segment} />
        <DetailRow label="Seats" value={car.Seats} />
        <DetailRow label="Price" value={`€${car.PriceEuro}`} />
        <DetailRow label="Date" value={car.Date} />

        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailView;
