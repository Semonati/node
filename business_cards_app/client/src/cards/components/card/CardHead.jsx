import { CardMedia } from "@mui/material";

const CardHead = ({ image }) => {
  return (
    <div>
      <CardMedia component="img" height="140" image={image.url}></CardMedia>
    </div>
  );
};

export default CardHead;
