import { Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import mapCardToModel from "../helpers/normalization/mapToModel";

const EditCardPage = () => {
  const { cardId } = useParams();

  return (
    <Container>
      <PageHeader title="Edit card" subtitle="Here you can edit your card" />
      <Typography>card id: {cardId}</Typography>
    </Container>
  );
};

export default EditCardPage;
