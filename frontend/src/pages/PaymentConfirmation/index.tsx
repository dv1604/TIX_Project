import React, { useEffect } from 'react'
import Confirmation from './sections/Confirmation'
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../../store/features/Authentication/authApi';
import { RootState } from '../../store/store';
import { useGetBookingStatusQuery } from '../../store/features/Payment/paymentApi';
import { toast } from 'react-toastify';

const PaymentConfirmation = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {bookingId} = useSelector((state : RootState) =>{
    return state.payment
  })

  const loaction = useLocation();

  const queryPaarams = new URLSearchParams(loaction.search);

  const sessionId = queryPaarams.get('session_id')

  const { data, isLoading, error } = useGetBookingStatusQuery({ bookingId: sessionId || '' },
    { skip: !bookingId}
  );

  useEffect(() => {
    if (data?.success) {
      // Toast is handled in rtkMiddleware for verifyCheckoutSession or manually here
      // toast.success('Payment confirmed successfully!');
      setTimeout(() => navigate('/ticket'), 2000);
    } else if (!data?.success) {
      // toast.error('Payment failed. Please try again.');
      setTimeout(() => navigate('/home'), 2000);
    } else if (error) {
      // toast.error('Payment verification failed. Please try again.');
      setTimeout(() => navigate('/home'), 2000);
    }
  }, [data, error, navigate]);



  useEffect(() => {



    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/', { replace: true });
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState);
    }

  }, [navigate])

  if (isLoading) {
    return <div>Verifying payment...</div>;
  }

  return (
    <Confirmation />
  )
}

export default PaymentConfirmation
