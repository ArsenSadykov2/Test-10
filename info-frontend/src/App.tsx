import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar.tsx";
import News from "./containers/news/News.tsx";
import FullNews from "./containers/news/FullNews.tsx";
import NewNews from "./containers/news/NewNews.tsx";


const App = () => {

  return (
      <>
        <CssBaseline />
        <ToastContainer/>
        <header>
          <AppToolBar/>
        </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<News/>}/>
              <Route path="/news/:id" element={<FullNews/>}/>
              <Route path="/comments" element={<Comments/>}/>
              <Route path="/news/new" element={<NewNews/>}/>
              <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
            </Routes>
          </Container>
        </main>
      </>
  )
};

export default App
