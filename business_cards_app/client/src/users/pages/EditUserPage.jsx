import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Checkbox, Container, FormControlLabel, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import ROUTES from "../../routes/routerModel";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { useUser } from "../../users/providers/UserProviders";
import useForm from "../../forms/hooks/useForm";
import normalizeUser from "../helpers/normalization/normalizeUser";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/joi-schema.js/signupSchema";
import useUsers from "../hooks/useUsers";
import mapUserToModel from "../helpers/normalization/mapToModelUser";

const EditUserPage = () => {
  const { user } = useUser();
  const { handleGetUser, handleEditUser, userValue } = useUsers();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(initialSignupForm, signupSchema, () => {
    handleEditUser(userValue.user._id, {
      ...normalizeUser({ ...value.data }),
      isAdmin: userValue.isAdmin,
    });
  });

  useEffect(() => {
    handleGetUser(userId).then((data) => {
      if (data._id !== userId) return navigate(ROUTES.CARDS);
      const modeledUser = mapUserToModel(data);
      rest.setData(modeledUser);
    });
  }, []);
  
  if (!user) return <Navigate replace to={ROUTES.CARDS} />;
// console.log(reuserValuest);
  return (
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
        title="edit user"
        to={ROUTES.CARDS}
      >
        <Input
          name="first"
          label="first"
          error={value.errors.first}
          onChange={rest.handleChange}
          data={value.data}
          sm={6}
        />
        <Input
          name="middle"
          label="middle"
          error={value.errors.middle}
          onChange={rest.handleChange}
          data={value.data}
          sm={6}
        />
        <Input
          name="last"
          label="last"
          error={value.errors.last}
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
          name="imageUrl"
          label="url"
          error={value.errors.imageUrl}
          onChange={rest.handleChange}
          data={value.data}
          sm={6}
        />
        <Input
          name="imageAlt"
          label="alt"
          error={value.errors.imageUrl}
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
        <Grid item>
          <FormControlLabel
            onChange={(e) => {
              rest.setData({ ...value.data, isBusiness: !!e.target.checked });
            }}
            name="isBusiness"
            control={<Checkbox value={value.data.isBusiness} color="primary" />}
            label="Change business status"
          />
        </Grid>
      </Form>
    </Container>
  );
};

export default EditUserPage;
