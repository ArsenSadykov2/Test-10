import {Typography} from "@mui/material";
import {NewsMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import NewsForm from "./components/newsForm/NewsForm.tsx";
import {createNews} from "./newsThunks.ts";

const newNews = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewProduct = async (news: NewsMutation) => {
        try {
            await dispatch(createNews(news)).unwrap();
            toast.success("Product was successfully created!");
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New product
            </Typography>
            <NewsForm onSubmitProduct={onCreateNewProduct}/>
        </>
    );
};

export default newNews;