import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface DownloadCardProps {
  onDownload: () => void;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ onDownload }) => {

  const { selectedSeats } = useSelector((state: RootState) => {
    return state.slots
  })

  const {bookingId} = useSelector((state : RootState) => {
    return state.payment
  })

  const count = Array.from({length:15})

  const details = [
    {
      label: 'booking code',
      value: bookingId
    },
    {
      label: 'password key',
      value: '147294'
    },
    {
      label: 'Seat',
      value: selectedSeats?.join(' , ')
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: '100%',
          
        }}>
        <Card
          sx={{
            width: '100%',
            backgroundColor: "#f4c56a",
            position: "relative",
            padding: 3,
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: 'none'
          }}
        >
          <CardContent>
            {details.map((detail, index) => (

              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: {xs:1,sm:0},
                  alignItems: 'center'
                }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    width: '150px'
                  }}
                >{detail.label}</Typography>
                <Typography
                  sx={{
                    fontSize: {xs:'14px',sm:'18px'},
                    fontWeight: 500
                  }}
                >{detail.value}</Typography>
              </Box>
            ))}
          </CardContent>

          <IconButton
            onClick={onDownload}
            sx={{
              position: "absolute",
              right: 20,
              bottom: 35,
              border: '2px solid',
              borderColor: 'grey.900',
              borderRadius: 0,
              width: 80,
              height: 80,
            }}
          >
            <Download sx={{ fontSize: '55px' }} />
          </IconButton>
        </Card>
      </Box>
      <Box 
      sx={{
        display:'flex',
        gap:2.2
      }}>
      {count.map((circle,i)=>(
      <Box key={i}
      sx={{
        width:24,
        height:24,
        borderRadius:'50%',
        bgcolor:'primary.main',
        transform:'translateY(-50%)'
      }}/>
      ))}
      </Box>
    </>
  );
};

export default DownloadCard;
