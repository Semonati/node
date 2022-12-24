import { CardMedia } from "@mui/material";

const CardHead = ({ image }) => {
  return (
    <div>
      <CardMedia component="img" height="140" image={image.url} alt={image.alt}></CardMedia>
    </div>
  );
};

export default CardHead;
