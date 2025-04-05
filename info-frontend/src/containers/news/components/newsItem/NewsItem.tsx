import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import NotFoundPic from "../../../../assets/images/notFoundPic.jpg";
import {apiUrl} from "../../../../globalConstants.ts";


interface Props {
    title: string;
    description: string;
    id: string;
    image: File | undefined;
}

const NewsItem: React.FC<Props> = ({title, description, id, image}) => {
    let cartImage = NotFoundPic;

    if (image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title} />
                <CardContent>
                    <strong>{description}</strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/news/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;