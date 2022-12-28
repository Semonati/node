import { shape, string, number, arrayOf } from "prop-types";

import addressType from "./AddressType";
import imageType from "./ImageType";

const cardType = shape({
  _id: string,
  title: string.isRequired,
  subtitle: string.isRequired,
  description: string.isRequired,
  address: addressType.isRequired,
  image: imageType.isRequired,
  bizNumber: number.isRequired,
  phone: string.isRequired,
  likes: arrayOf(string).isRequired || undefined.isRequired,
  web: string.isRequired || undefined.isRequired,
  email: string.isRequired,
  userId: string.isRequired,
  createdAt: string.isRequired,
});

export default cardType;
