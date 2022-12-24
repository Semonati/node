import React from "react";
import { Grid } from "@mui/material";
import CardComponent from "./card/Card";

const Cards = () => {
  const cards = [
    {
      _id: "639221ec70962dd4df2b709b",
      title: "Business Name",
      subtitle: "Business Headline",
      description: "some desc",
      phone: "0500000000",
      email: "admin@gmail.com",
      web: "https://www.hackampus.com",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc93G-imIa1bod1o14Uk10KhQ2CRExJ4DYuw&usqp=CAU",
        alt: "Wowww this is Apple Watch",
        _id: "639221ec70962dd4df2b709c",
      },
      address: {
        state: "israel",
        country: "israel",
        city: "Tel Aviv",
        street: "STREET",
        houseNumber: 1,
        zip: 123456,
        _id: "639221ec70962dd4df2b709d",
      },
      bizNumber: 6480161,
      createdAt: "2022-12-08T17:42:04.379Z",
      user_id: "638503e4caa1f3d9dbbcf7bc",
      likes: ["639221ec70962dd4df2b70a3"],
      __v: 0,
    },
    {
      _id: "639221ec70962dd4df2b709c",
      title: "Business Name",
      subtitle: "Business Headline",
      description: "some desc",
      phone: "0500000000",
      email: "admin@gmail.com",
      web: "https://www.hackampus.com",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc93G-imIa1bod1o14Uk10KhQ2CRExJ4DYuw&usqp=CAU",
        alt: "Wowww this is Apple Watch",
        _id: "639221ec70962dd4df2b709c",
      },
      address: {
        state: "israel",
        country: "israel",
        city: "Tel Aviv",
        street: "STREET",
        houseNumber: 1,
        zip: 123456,
        _id: "639221ec70962dd4df2b709d",
      },
      bizNumber: 6480162,
      createdAt: "2022-12-08T17:42:04.379Z",
      user_id: "638503e4caa1f3d9dbbcf7bc",
      likes: ["639221ec70962dd4df2b70a3"],
      __v: 0,
    },
    {
      _id: "639221ec70962dd4df2b709d",
      title: "Business Name",
      subtitle: "Business Headline",
      description: "some desc",
      phone: "0500000000",
      email: "admin@gmail.com",
      web: "https://www.hackampus.com",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc93G-imIa1bod1o14Uk10KhQ2CRExJ4DYuw&usqp=CAU",
        alt: "Wowww this is Apple Watch",
        _id: "639221ec70962dd4df2b709c",
      },
      address: {
        state: "israel",
        country: "israel",
        city: "Tel Aviv",
        street: "STREET",
        houseNumber: 1,
        zip: 123456,
        _id: "639221ec70962dd4df2b709d",
      },
      bizNumber: 6480163,
      createdAt: "2022-12-08T17:42:04.379Z",
      user_id: "638503e4caa1f3d9dbbcf7bc",
      likes: ["639221ec70962dd4df2b70a3"],
      __v: 0,
    },
  ];

  const handelCardDeletl = (bizNumber) =>
    console.log("You delete card no. " + bizNumber);
  const handelLikeCard = (bizNumber) =>
    console.log("You liked card no. " + bizNumber);
  const handelEditCard = (bizNumber) =>
    console.log("You edit card no. " + bizNumber);

  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
          <CardComponent
            card={card}
            deleteCard={handelCardDeletl}
            likeCard={handelLikeCard}
            editCard={handelEditCard}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
