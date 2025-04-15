import React, { useRef } from 'react'
import TicketCard from './sections/TicketCard'
import { Button, Container, Typography } from '@mui/material'
import Reciept from './sections/Reciept'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from 'react-redux'
import { movieActions } from '../../store/features/Movie/MovieSlice'
import { slotsActions } from '../../store/features/Slots/SlotsSlice'

const Ticket = () => {

  const targetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  const handleDownloadPDF = async () => {
    if (!targetRef.current) return;
  
    // Convert container into image
    const canvas = await html2canvas(targetRef.current, { scale: 3 }); // Higher scale for better clarity
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF("p", "mm", "a4");
  
    // Set proper dimensions for the image
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = 380; 
    const imgHeight = (canvas.height * imgWidth+100) / canvas.width;
  
    // Calculate the center position
    const xPos = (pageWidth - imgWidth) / 2;
    const yPos = (pageHeight - imgHeight) / 2;
  
    // Add image to PDF at the calculated position
    pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
    pdf.save("ticket.pdf");
    dispatch(movieActions.resetState());
    dispatch(slotsActions.resetSlot());
  navigate('/');
  };
  

  const navigate = useNavigate();

  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width:'100%',
          gap: 4,
          overflow:'hidden'
        }}
        ref={targetRef}>
        <Typography
          variant='h2'
          sx={{
            fontSize: '36px',
            fontWeight: 700
          }}>
          Transaction Details
        </Typography>
        <TicketCard onDownload={handleDownloadPDF}/>
        <Reciept />
      </Container>
      {/* back button */}
      <Button
        variant="outlined"
        onClick={() => navigate('/payment-confirmation')}
        startIcon={<ArrowBack />}
        sx={{
          color: 'royalblue.main',
          textTransform: 'capitalize',
          width: {xs:'fit-content',sm:'100%'},
          fontSize: '24px',
          fontWeight: 700,
          margin:'auto',
          display:'flex',
          justifyContent:'flex-start',
          mt:3
        }}
      >
        Back
      </Button>
    </>
  )
}

export default Ticket
