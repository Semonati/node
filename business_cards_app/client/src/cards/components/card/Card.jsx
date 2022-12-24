import React from "react";
import MuiCard from "@mui/material/Card";
import { CardActionArea } from "@mui/material";

import CardBody from "./CardBody";
import CardHead from "./CardHead";
import CardActionBar from "./CardActionBar";

const CardComponent = ({ card, likeCard, editCard, deleteCard }) => {
  return (
    <MuiCard sx={{ minWidth: 280, maxWidth: 250 }}>
      <CardActionArea>
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar
        deleteCard={deleteCard}
        likeCard={likeCard}
        editCard={editCard}
        bizNumber={card.bizNumber}
      />
    </MuiCard>
  );
};

export default CardComponent;
