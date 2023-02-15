import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../users/providers/UserProviders";

const ChangeBizNumber = () => {
  const { cardId } = useParams();
  const { user } = useUser();
  // console.log(user);
  return <div>{cardId}</div>;
};

export default ChangeBizNumber;
