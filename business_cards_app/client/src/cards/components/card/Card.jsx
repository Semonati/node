import React from "react";
import { Card, CardActionArea } from "@mui/material";

import "./style/cardStyle.css";
import CardBody from "./CardBody";
import CardHead from "./CardHead";

const CardComponent = () => {
  const card = {
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
    bizNumber: 6480165,
    createdAt: "2022-12-08T17:42:04.379Z",
    user_id: "638503e4caa1f3d9dbbcf7bc",
    likes: ["639221ec70962dd4df2b70a3"],
    __v: 0,
  };

  return (
    <Card sx={{ width: 250, m: 2 }} square raised>
      <CardActionArea>
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
