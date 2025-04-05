import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import NotFoundPic from '../../assets/images/notFoundPic.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {selectNewsLoading, selectOneNews} from "./newsSlice.ts";
import {fetchNewsById} from "./newsThunks.ts";
import {apiUrl} from "../../globalConstants.ts";


const FullNews = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectOneNews);
    const fetchLoading = useAppSelector(selectNewsLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && news ?
                <Card sx={{ width: "50%", margin: "0 auto" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={news?.image ? apiUrl + '/' + news.image : NotFoundPic}
                            alt={news.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {news.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {news.description}
                            </Typography>
                        </CardContent>
                        <IconButton component={NavLink} to='/'>
                            <ArrowBackIcon sx={{fontSize: "14px"}}/>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "10px" }}>
                                Go back To News
                            </Typography>
                        </IconButton>
                    </CardActionArea>
                </Card>
                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default FullNews;