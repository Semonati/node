import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { useUser } from "../../users/providers/UserProviders";
import ChangeBizNumber from "../pages/ChangeBizNumber";
import { useParams } from "react-router-dom";

const CardForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
  changeBizNumber,
}) => {
  const { user } = useUser();
    const { cardId } = useParams();
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      changeBizNumber={changeBizNumber}
    >
      <Input
        name="title"
        label="title"
        error={errors.title}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="subtitle"
        label="subtitle"
        error={errors.subtitle}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="webUrl"
        label="web"
        error={errors.webUrl}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
        required={false}
      />
      <Input
        name="imageUrl"
        label="image url"
        error={errors.imageUrl}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
        required={false}
      />
      <Input
        name="imageAlt"
        label="image alt"
        error={errors.imageAlt}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
        required={false}
      />
      <Input
        name="state"
        label="state"
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
        required={false}
      />
      <Input
        name="country"
        label="country"
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="houseNumber"
        label="houseNumber"
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
      />
      <Input
        name="zip"
        label="zip"
        type="number"
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={6}
        changeBizNumber={changeBizNumber}
        required={false}
      />
      {user.isAdmin && (
        <ChangeBizNumber errors={errors} onInputChange={onInputChange} data={data} />
      )}
    </Form>
  );
};

CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(CardForm);
