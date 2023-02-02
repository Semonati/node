import React from "react";
import MuiCard from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";

import CardBody from "./CardBody";
import CardHead from "./CardHead";
import CardActionBar from "./CardActionBar";
import cardType from "../../models/types/cardTypes";
import ROUTES from "../../../routes/routerModel";

const CardComponent = ({ card, onDelete, handleLikeCard }) => {
  const navigate = useNavigate();

  // handleLikeCard()
  return (
    <MuiCard sx={{ minWidth: 280, maxWidth: 250 }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAILS}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar
        onDelete={onDelete}
        handleLikeCard={handleLikeCard}
        card={card}
      />
    </MuiCard>
  );
};

CardComponent.propTypes = {
  card: cardType.isRequired,
  onDelete: func.isRequired,
  // handleLikeCard: func.isRequired,
};
export default CardComponent;
