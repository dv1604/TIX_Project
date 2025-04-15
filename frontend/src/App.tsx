import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./Layout/Layout";

// Page Import
import Homepage from "./pages/HomePage/Homepage";
import MyTickets from "./pages/MyTickets";
import News from "./pages/News";
import NewsDetail from "./pages/News/sections/NewsDetail";
import ComingSoonPage from "./pages/ComingSoon";
import SlotBooking from "./pages/SlotBooking";
import SeatBooking from "./pages/SeatBooking";
import Payment from "./pages/Payment";
import Login from "./pages/Auth/SignInPage";
import SignUp from "./pages/Auth/SignUpPage";
import EmailInput from "./pages/Auth/EmailInput";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Ticket from "./pages/Ticket";
import VideoPage from "./pages/News/sections/VideoPage";
import { useCheckAuthQuery } from "./store/features/Authentication/authApi";
import { loginSuccess, logoutStatus } from "./store/features/Authentication/authSlice";

const App = () => {
  const location = useLocation();
  const { selectedMovie } = useSelector((state: RootState) => state.movie);
  const { selectedTime } = useSelector((state: RootState) => state.slots);

  const dispatch = useDispatch();

  const {isLoading,data} = useCheckAuthQuery();

  useEffect(() => {
    if(!isLoading && data?.isAuthenticated){
      console.log(data.isAuthenticated);
      dispatch(loginSuccess(data.isAuthenticated));
    }else{
      dispatch(logoutStatus());
    }
  },[isLoading,data,dispatch]);

  const {isAuthenticated,emailAdded} = useSelector((state:RootState)=>{
    return state.auth
  })

  console.log(isAuthenticated)
  const {isPaymentDone,isSeatSelected,isSlotSelected} = useSelector((state:RootState)=>{
    return state.booking
  })
  
  

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/home" element={<Homepage />} />
              <Route path="/my-tickets/*" element={<MyTickets />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/coming-soon" element={<ComingSoonPage />} />
              <Route path="/slots/:id" element={<SlotBooking />} />
              <Route
                path="/seat"
                element={
                  isSlotSelected ? <SeatBooking /> : <Navigate to="/slots/:id" />
                }
              />
              <Route path="/payment" element={
                  isSeatSelected ? <Payment /> : <Navigate to="/seat" />
                } />
              <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
              <Route path="/ticket" element={<Ticket />} />
            </Routes>
          </Layout>
        }
      />
      <Route element={isAuthenticated && <Navigate to='/' />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/email-input"
        element={<EmailInput />}
      />
      </Route>
    </Routes>
  );
};

export default App;
