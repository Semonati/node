import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import mapCardToModel from "../helpers/normalization/mapToModelCard";
import ROUTES from "../../routes/routerModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProviders";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import createCradSchema from "../models/joi-schema/createCardSchima";
import CardForm from "../components/CardForm";

const EditCardPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(initialCardForm, createCradSchema, () => {
    handleUpdateCard(card._id, {
      ...normalizeCard({ ...value.data }),
      user_id: user._id,
    });
  });

  const {
    handleUpdateCard,
    handleGetCard,
    value: { card },
  } = useCards();

  const { user } = useUser();

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      if (user._id !== data.user_id) return navigate(ROUTES.CARDS);
      const modeledCard = mapCardToModel(data);
      rest.setData(modeledCard);
    });
  }, []);
  
  console.log(value.data);
  // if (user.isAdmin)
  //   return <Navigate replace to={`${ROUTES.CHANGE_BIZ_NUMBER}/${cardId}`} />;
  if (!user) return <Navigate replace to={ROUTES.CARDS} />;


  return (
    <>
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardForm
          title="edit card"
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          data={value.data}
        />
      </Container>
    </>
  );
};

export default EditCardPage;
