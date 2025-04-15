import { Container } from "@mui/material";
import React, { useRef } from "react";
import TheatreInfoCard from "./TheatreInfoCard";
import DownloadCard from "./DownloadCard";

interface DownloadCardProps {
  onDownload: () => void;
}

const TicketCard:React.FC<DownloadCardProps> = ({ onDownload }) => {
  

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {xs:450,sm:638},
        alignItems: "center",
      }}
    >
      <TheatreInfoCard />
      <DownloadCard onDownload={onDownload} />
    </Container>
  );
};

export default TicketCard;
