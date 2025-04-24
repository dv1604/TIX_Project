import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { slotsActions } from "../../../store/features/Slots/SlotsSlice";
import useDragScroll from "../../../hooks/useDragScroll"; // Import custom hook
import { useGetSeatsQuery } from "../../../store/features/Slots/SeatApi";
import { RootState } from "../../../store/store";
import { seatLayout } from "../../../utils/seatLayout";
import { Seat } from "../../../types/Seats";
import { setSeatId } from "../../../store/features/Payment/PaymentSlice";

const soldOutSeats = new Set([
  "A9", "A10", "B3", "B4", "B8", "B9", "B10", "C4", "C5", "C8", "C9", "C10",
  "D7", "D8", "D9", "D10", "B11", "B12", "B13", "B14", "C11", "C12", "C13",
  "C14", "C15", "D11", "D12", "D13", "D14", "E11", "E12", "E13"
]);


const SeatGrid: React.FC = () => {

  const {slotId ,selectedSeats : storedSeats} = useSelector((state:RootState) =>{
    return state.slots
  })

  const {data} = useGetSeatsQuery(slotId);
  const [seats, setSeats] = useState<Seat[][]>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    // convert 160 seats into seat layout format
    if(data){
      const grid = seatLayout(data);
      setSeats(grid);
    }

    if(storedSeats && selectedSeats.length === 0 && storedSeats?.length > 0){
      setSelectedSeats(storedSeats);
    }

    setSeats((prevSeats) => {
      return prevSeats?.map(row => {
        return row.map((s) => {
          if(selectedSeats.includes(s.label)){
            return {...s,status : "Selected"} //change seat status
          }else{
            return {...s,status: s.status === "Booked" ? "Booked" : "Available"}; //keep status same
          }
        })
      })
    })
  },[data,storedSeats,selectedSeats])

  console.log(selectedSeats)

  const dispatch = useDispatch();
  const { containerRef, handleMouseDown, isDragging } = useDragScroll();

  const handleSeatClick = (clickedSeatId : string) => {

    setSelectedSeats((prevSelectedSeats) => {

      const isAlreadySelected = prevSelectedSeats.includes(clickedSeatId);
      let updatedSeats = [...prevSelectedSeats];

      // deselection
      if(isAlreadySelected){
        // if seat selected deselect
        updatedSeats = updatedSeats.filter((seat) => seat !== clickedSeatId);
        dispatch(slotsActions.decreaseTotalAmount()); //subtract ticket price

      }else{ //if not selected then select it(limit 5)

        if(updatedSeats.length >= 5){
          // remove old one and add new one
          updatedSeats = [...updatedSeats.slice(1),clickedSeatId];

        }else{
          // add new one
          updatedSeats = [...updatedSeats,clickedSeatId];
          dispatch(slotsActions.increaseTotalAmount()); //add ticket price
        }
      }

      dispatch(slotsActions.setSelectedSeats(updatedSeats));


      return updatedSeats;

    })


  }


  return (
    <Box
      ref={containerRef}
      onMouseDown={handleMouseDown}
      sx={{
        display: "flex",
        width: "110%",
        cursor: isDragging ? "grabbing" : "grab",
        justifyContent: { md: "flex-start" },
        mt: 4,
        overflowX: "auto",
        scrollBehavior: "smooth",
        userSelect: "none",
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: { xs: "50%", lg: "100%" },
        }}
      >
        {seats?.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "6rem",
            }}
          >
            <Box sx={{ display: "flex", gap: "7px" }}>
              {row.slice(0, 10).map((seat) => (
                <Button
                  key={seat.id}
                  variant="contained"
                  sx={{
                    minWidth: 45,
                    width: 45,
                    height: 45,
                    boxShadow: "none",
                    backgroundColor:
                      seat.status === "Booked"
                        ? "royalblue.main"
                        : seat.status === "Selected"
                          ? "links.main"
                          : "primary.main",
                    color: seat.status === "Available" ? "grey.800" : "primary.main",
                    fontWeight: 700,
                    border: "1px solid #ccc",
                    cursor: seat.status === "Booked" ? "not-allowed" : "pointer",
                    "&:hover": {
                      backgroundColor:
                        seat.status === "Selected"
                          ? "links.main"
                          : "royalblue.main",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    console.log("clicked")
                    if (seat.status !== "Booked"){
                       handleSeatClick(seat.label);
                       dispatch(setSeatId(seat.id));
                      }
                  }}
                >
                  {seat.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: "7px" }}>
              {row.slice(10, 20).map((seat) => (
                <Button
                  key={seat.id}
                  variant="contained"
                  sx={{
                    minWidth: 45,
                    width: 45,
                    height: 45,
                    boxShadow: "none",
                    backgroundColor:
                      seat.status === "Booked"
                        ? "royalblue.main"
                        : seat.status === "Selected"
                          ? "links.main"
                          : "primary.main",
                    color: seat.status === "Available" ? "grey.800" : "primary.main",
                    fontWeight: 700,
                    border: "1px solid #ccc",
                    cursor: seat.status === "Booked" ? "not-allowed" : "pointer",
                    "&:hover": {
                      backgroundColor:
                        seat.status === "Selected"
                          ? "links.main"
                          : "royalblue.main",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    if (seat.status !== "Booked") {
                      handleSeatClick(seat.label);
                      dispatch(setSeatId(seat.id));
                    }
                  }}
                >
                  {seat.label}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SeatGrid;
