import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {selectCommentLoading, selectComments} from "./commentsSlice.ts";
import CommentItem from "./CommentItem/CommentItem.tsx";
import {fetchAllComments} from "./commentsThunks.ts";


const Comments = () => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const productsFetchLoading = useAppSelector(selectCommentLoading);

    useEffect(() => {
        dispatch(fetchAllComments());
    }, [dispatch])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Products
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/products/new'>
                        Add product
                    </Button>
                </Grid>
            </Grid>
            {productsFetchLoading ? <Spinner /> :
                <>
                    {comments.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {comments.map(comment => (
                                <CommentItem
                                    key={comment.id}
                                    title={comment.title}
                                    id={comment.id}
                                    description={comment.description}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Comments;