import React from "react";
import Dashboard from "../components/dashboard/dashboard";

const fetchDataFromFastAPI = async () => {
  try {
    const response = await fetch("/api/endpoint");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Home = () => {
  return (
    <>
      <Dashboard></Dashboard>
    </>
  );
};

export default Home;
