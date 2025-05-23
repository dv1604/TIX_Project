import React from "react";
import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Cookies from 'js-cookie'

const Layout: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register", "/email-input"].includes(location.pathname);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const {bookingId} = useSelector((state : RootState) =>{
    return state.payment
  })

  const token = Cookies.get("jwt");

  const protectedRoutes = [ "/payment", "/ticket"];
  const isOnProtectedRoute = protectedRoutes.some((path) => location.pathname.startsWith(path));

  console.log(!isAuthenticated,isOnProtectedRoute,token)


  // If user is not authenticated and is on a protected route
  if (!isAuthenticated && isOnProtectedRoute) {
    {console.log("here")}
    return <Navigate to="/home" replace />;
  }

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
        <Outlet />
      </Box>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
