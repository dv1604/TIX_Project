import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./Layout/Layout";

// Page imports...
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
import { loginSuccess, logoutStatus, setLoginName } from "./store/features/Authentication/authSlice";
import { resetPaymentDetails, setUserId } from "./store/features/Payment/PaymentSlice";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedMovie } = useSelector((state: RootState) => state.movie);
  const { selectedTime } = useSelector((state: RootState) => state.slots);
  const { isLoading, data } = useCheckAuthQuery();

  useEffect(() => {
    if (!isLoading && data?.isAuthenticated) {
      dispatch(loginSuccess(data.isAuthenticated));
      dispatch(setUserId(data.id));
      dispatch(setLoginName(data.name))
    } else {
      dispatch(logoutStatus());
    }
  }, [isLoading, data, dispatch ]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isPaymentDone, isSeatSelected, isSlotSelected } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (location.pathname === "/home") {
      dispatch(resetPaymentDetails());
    }
    window.scrollTo(0, 0);
  }, [location, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Protected layout with header/footer */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Homepage />} />
          <Route path="my-tickets/*" element={<MyTickets />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="coming-soon" element={<ComingSoonPage />} />
          <Route path="slots/:id" element={<SlotBooking />} />
          <Route path="seat" element={isSlotSelected ? <SeatBooking /> : <Navigate to="/home" />} />
          <Route path="payment" element={isSeatSelected ? <Payment /> : <Navigate to="/seat" />} />
          <Route path="payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>

        {/* Auth-only pages */}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/email-input" element={<EmailInput />} />
          </>
        )}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
