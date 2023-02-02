import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import cardType from "../../models/types/cardTypes";

const CardBody = ({ card }) => {
  const { title, subtitle, phone, address, bizNumber } = card;
  const { street, houseNumber, city } = address;

  return (
    <CardContent>
      <CardHeader title={title} subheader={subtitle} sx={{ p: 0, mb: 1 }} />
      <Divider />
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Phone:{" "}
          </Typography>
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address: </strong>
          {street} {houseNumber} {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Card Number: </strong>
          {bizNumber}
        </Typography>
      </Box>
    </CardContent>
  );
};

CardBody.propTypes = {
  card: cardType.isRequired,
};

export default CardBody;
