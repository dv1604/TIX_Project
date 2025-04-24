import React, { useEffect } from 'react'
import Confirmation from './sections/Confirmation'
import { useNavigate } from 'react-router';

const PaymentConfirmation = () => {

  const navigate = useNavigate();

  useEffect(() => {

    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/',{replace: true});
    }

    window.addEventListener('popstate', handlePopState)

    return() => {
      window.removeEventListener('popstate', handlePopState);
    }

  },[navigate])


  return (
    <Confirmation/>
  )
}

export default PaymentConfirmation
