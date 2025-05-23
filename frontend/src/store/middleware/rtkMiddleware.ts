import { AnyAction, Dispatch, isFulfilled, isPending, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router';

const pendingToasts: Record<string, { timeoutId: NodeJS.Timeout; toastId?: string }> = {};

export const rtkMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch>) => (next) => (action) => {
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = action.type as string;

    if (
      actionType.includes('checkAuth') ||
      actionType.includes('movieApi') ||
      actionType.includes('newsApi') ||
      actionType.includes('seatApi') ||
      actionType.includes('bookingApi')
    ) {
      return next(action);
    }
  }

  // Handle pending
  if (isPending(action)) {
    const requestId = action.meta.requestId;

    // Set a timeout to delay showing the loading toast
    const timeoutId = setTimeout(() => {
      const toastId = toast.loading('Loading...', { autoClose: false });
      if (pendingToasts[requestId]) {
        pendingToasts[requestId].toastId = toastId as string;
      }
    }, 300); // Delay of 300ms before showing toast

    pendingToasts[requestId] = { timeoutId };
  }

  // Handle rejected
  // Handle rejected
  if (isRejectedWithValue(action)) {
    const requestId = action.meta?.requestId;
    const record = pendingToasts[requestId];
    if (record) {
      clearTimeout(record.timeoutId);
      if (record.toastId) {
        toast.dismiss(record.toastId);
      }
      delete pendingToasts[requestId];
    }

    const payload = action.payload as { status: number; data: { message: string } };
    const status = payload?.status;
    const message = payload?.data?.message || 'Something went wrong. Please try again';

    const endpoint = action.meta?.arg as { endpointName: string };
    const endpointName = endpoint?.endpointName;

    if (status === 401 && endpointName !== 'logout') {
      toast.error('Unauthorized. Please login again.');
    } else {
      toast.error(message);
    }
  }


  // Handle fulfilled
  if (isFulfilled(action)) {
    const requestId = action.meta?.requestId;
    const record = pendingToasts[requestId];
    if (record) {
      clearTimeout(record.timeoutId);
      if (record.toastId) {
        toast.dismiss(record.toastId);
      }
      delete pendingToasts[requestId];
    }

    const endpoint = action.meta?.arg as { endpointName: string };
    const endpointName = endpoint.endpointName;

    if (['login', 'signUp', 'createCheckoutSession', 'getBookingStatus', 'logout'].includes(endpointName)) {

      if (endpointName === 'createCheckoutSession') {
        const payload = action.payload as { url: string }
        if (payload) {
          toast.success('Redirecting to Payment ... ');
        } else {
          toast.error('Failed to initiate Payment')
        }
      } else if (endpointName === 'getBookingStatus') {
        const payload = action.payload as { success: boolean };
        if (payload.success === true) {
          toast.success('Payment confirmed successfully!');
        } else if (payload.success === false) {
          toast.error('Payment failed. Please try again.');
        }
      } else {
        toast.success(
          endpointName === 'login' ? 'Logged in successfully!' : endpointName === 'logout' ? 'Logout successfully!' : 'Signed up successfully!'
        );
      }

    }
  }

  return next(action);
};
