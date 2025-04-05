import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {selectNews, selectNewsLoading} from "./newsSlice.ts";
import {fetchAllNews} from "./newsThunks.ts";
import NewsItem from "./components/newsItem/NewsItem.tsx";


const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const newsFetchLoading = useAppSelector(selectNewsLoading);

    useEffect(() => {
        dispatch(fetchAllNews());
    }, [dispatch])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        News
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/news/new'>
                        Add News
                    </Button>
                </Grid>
            </Grid>
            {newsFetchLoading ? <Spinner /> :
                <>
                    {news.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {news.map(news => (
                                <NewsItem
                                    key={news.id}
                                    title={news.title}
                                    description={news.description}
                                    id={news.id}
                                    image={news.image || undefined}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default News;