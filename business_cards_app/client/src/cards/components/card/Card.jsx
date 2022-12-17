import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Phone from "@mui/icons-material/Phone";
import Edit from "@mui/icons-material/Edit";
import Favorite from "@mui/icons-material/Favorite";

import "./style/cardStyle.css";

const CardComponent = () => {
  return (
    <Card sx={{ width: 250, m: 2 }} square raised>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc93G-imIa1bod1o14Uk10KhQ2CRExJ4DYuw&usqp=CAU"
        />
        <Box>
          <CardHeader title="forth" subheader="Subtitle" />
          <Divider light="true" />
          <CardContent>
            <Typography variant="body2" color="textSecondary" className="line">
              <p className="bold">Phone</p>: 050-0000000
            </Typography>
            <Typography variant="body2" color="textSecondary" className="line">
              <p className="bold">Address</p>: Shinkin 3 Tel-Aviv
            </Typography>
            <Typography variant="body2" color="textSecondary" className="line">
              <p className="bold">Card Number</p>: 40000000
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
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
