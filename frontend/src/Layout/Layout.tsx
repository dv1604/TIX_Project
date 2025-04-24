import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register", "/email-input"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: hideHeaderFooter ? "0px" : "100px",
          marginBottom: hideHeaderFooter ? "0px" : "50px",
        }}
      >
        <Outlet/>
      </Box>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
