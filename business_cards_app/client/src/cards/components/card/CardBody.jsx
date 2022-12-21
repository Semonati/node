import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Phone from "@mui/icons-material/Phone";
import Edit from "@mui/icons-material/Edit";
import Favorite from "@mui/icons-material/Favorite";

const CardBody = ({ card }) => {
  return (
    <div>
      <Box>
        <CardHeader title="forth" subheader="Subtitle" />
        <Divider light={true} />
        <CardContent>
          <Typography variant="p" color="textSecondary" className="line">
            <p className="bold">Phone</p>:{card.phone}
          </Typography>
          <Typography variant="p" color="textSecondary" className="line">
            <p className="bold">Address</p>: {card.address.street}{" "}
            {card.address.houseNumber} {card.address.city}
          </Typography>
          <Typography variant="p" color="textSecondary" className="line">
            <p className="bold">Card Number</p>: {card.bizNumber}
          </Typography>
        </CardContent>
        <Box display="flex" className="icons" p={1}>
          <div className="left">
            <Delete color="action" />
            <Edit color="action" />
          </div>
          <div className="right">
            <Phone color="action" />
            <Favorite color="action" />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CardBody;
