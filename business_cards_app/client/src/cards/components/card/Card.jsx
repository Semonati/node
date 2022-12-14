import React from "react";
import MuiCard from "@mui/material/Card";
import { CardActionArea } from "@mui/material";

import CardBody from "./CardBody";
import CardHead from "./CardHead";
import CardActionBar from "./CardActionBar";

const CardComponent = (props) => {
  const { card, likeCard, deleteCard } = props;
  
  return (
    <MuiCard sx={{ minWidth: 280, maxWidth: 250 }}>
      <CardActionArea>
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar
        deleteCard={deleteCard}
        likeCard={likeCard}
        cardId={card._id}
      />
    </MuiCard>
  );
};

export default CardComponent;
