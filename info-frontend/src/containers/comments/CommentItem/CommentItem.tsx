import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";


interface Props {
    title: string;
    description: string;
    id: string;
}

const CommentItem: React.FC<Props> = ({title, description, id}) => {

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    alt={title}
                />
                <CardHeader title={title} />
                <CardContent>{description}</CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/news/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CommentItem;