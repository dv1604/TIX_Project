import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { slotsActions } from "../../../store/features/Slots/SlotsSlice";
import useDragScroll from "../../../hooks/useDragScroll"; // Import custom hook

type Seat = {
  id: string;
  status: "available" | "sold" | "selected";
};

const rows = 8;
const cols = 20;
const soldOutSeats = new Set([
  "A9", "A10", "B3", "B4", "B8", "B9", "B10", "C4", "C5", "C8", "C9", "C10",
  "D7", "D8", "D9", "D10", "B11", "B12", "B13", "B14", "C11", "C12", "C13",
  "C14", "C15", "D11", "D12", "D13", "D14", "E11", "E12", "E13"
]);

// Generate Seats
const generateSeats = (): Seat[][] => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => {
      const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
      return {
        id: seatId,
        status: soldOutSeats.has(seatId) ? "sold" : "available",
      };
    })
  );
};

const SeatGrid: React.FC = () => {
  const [seats, setSeats] = useState<Seat[][]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { containerRef, handleMouseDown, isDragging } = useDragScroll();

  // Handle Seat Click
  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.includes(seatId);
      let updatedSelection = [...prevSelectedSeats];

      if (isSelected) {
        // Deselect seat
        updatedSelection = prevSelectedSeats.filter((s) => s !== seatId);
        dispatch(slotsActions.decreaseTotalAmount());
      } else {
        if (prevSelectedSeats.length >= 5) {
          // Remove first seat and add new one
          const removedSeat = prevSelectedSeats[0];
          updatedSelection = [...prevSelectedSeats.slice(1), seatId];

          dispatch(slotsActions.decreaseTotalAmount()); // Remove price of old seat
          dispatch(slotsActions.increaseTotalAmount()); // Add price of new seat

          // Update seats to reflect removal
          setSeats((prevSeats) =>
            prevSeats.map((row) =>
              row.map((seat) => {
                if (seat.id === removedSeat) {
                  return { ...seat, status: "available" }; // Old seat becomes available
                }
                if (seat.id === seatId) {
                  return { ...seat, status: "selected" }; // New seat gets selected
                }
                return seat;
              })
            )
          );
        } else {
          // Directly add new seat if < 5 selected
          updatedSelection = [...prevSelectedSeats, seatId];
          dispatch(slotsActions.increaseTotalAmount());
        }
      }

      dispatch(slotsActions.setSelectedSeats(updatedSelection)); // Update Redux immediately

      // Update seat colors correctly
      setSeats((prevSeats) =>
        prevSeats.map((row) =>
          row.map((seat) => ({
            ...seat,
            status: updatedSelection.includes(seat.id)
              ? "selected"
              : soldOutSeats.has(seat.id)
                ? "sold"
                : "available",
          }))
        )
      );

      return updatedSelection;
    });
  };

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
        {seats.map((row, rowIndex) => (
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
                      seat.status === "sold"
                        ? "royalblue.main"
                        : seat.status === "selected"
                          ? "links.main"
                          : "primary.main",
                    color: seat.status === "available" ? "grey.800" : "primary.main",
                    fontWeight: 700,
                    border: "1px solid #ccc",
                    cursor: seat.status === "sold" ? "not-allowed" : "pointer",
                    "&:hover": {
                      backgroundColor:
                        seat.status === "selected"
                          ? "links.main"
                          : "royalblue.main",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    if (seat.status !== "sold") handleSeatClick(seat.id);
                  }}
                >
                  {seat.id}
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
                      seat.status === "sold"
                        ? "royalblue.main"
                        : seat.status === "selected"
                          ? "links.main"
                          : "primary.main",
                    color: seat.status === "available" ? "grey.800" : "primary.main",
                    fontWeight: 700,
                    border: "1px solid #ccc",
                    cursor: seat.status === "sold" ? "not-allowed" : "pointer",
                    "&:hover": {
                      backgroundColor:
                        seat.status === "selected"
                          ? "links.main"
                          : "royalblue.main",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    if (seat.status !== "sold") handleSeatClick(seat.id);
                  }}
                >
                  {seat.id}
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
