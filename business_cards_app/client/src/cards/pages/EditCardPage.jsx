import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import mapCardToModel from "../helpers/normalization/mapToModelCard";
import ROUTES from "../../routes/routerModel";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProviders";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import createCradSchema from "../models/joi-schema/createCardSchima";

const EditCardPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(initialCardForm, createCradSchema, () => {
    handleUpdateCard(card._id, {
      ...normalizeCard({ ...value.data }),
      bizNumber: card.bizNumber,
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
        <Form
          onSubmit={rest.onSubmit}
          onReset={rest.handleReset}
          errors={value.errors}
          onChange={rest.validateForm}
          styles={{ maxWidth: "800px" }}
          title="edit card"
          to={ROUTES.CARDS}
        >
          <Input
            name="title"
            label="title"
            error={value.errors.title}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="subtitle"
            label="subtitle"
            error={value.errors.subtitle}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="description"
            label="description"
            error={value.errors.description}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="phone"
            label="phone"
            error={value.errors.phone}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="email"
            label="email"
            error={value.errors.email}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="webUrl"
            label="web"
            error={value.errors.webUrl}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="imageUrl"
            label="imageUrl"
            error={value.errors.imageUrl}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="imageAlt"
            label="imageAlt"
            error={value.errors.imageAlt}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="state"
            label="state"
            error={value.errors.state}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="country"
            label="country"
            error={value.errors.country}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="city"
            label="city"
            error={value.errors.city}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="street"
            label="street"
            error={value.errors.street}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="houseNumber"
            label="houseNumber"
            error={value.errors.houseNumber}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
          <Input
            name="zip"
            label="zip"
            error={value.errors.zip}
            onChange={rest.handleChange}
            data={value.data}
            sm={6}
          />
        </Form>
      </Container>
    </>
  );
};

export default EditCardPage;