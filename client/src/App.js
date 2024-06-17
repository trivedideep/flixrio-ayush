import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./Components/NavBar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/footer";
import Upload from "./Components/Upload.js";
import Dashboard from "./Pages/Dashboard.js";
import Favourites from "./Pages/Favourites.js";
import Profile from "./Pages/Profile.js";
import Search from "./Pages/Search.js";
import { darkTheme, lightTheme } from "./utils/Themes";
import { useSelector } from "react-redux";
import Login from "./Components/Login.js";
import Reagister from "./Components/Reagister.js";
import Showall from "./Pages/Showall.js";
import Showpodcasts from "./Pages/Showpodcasts.js";
import Myvid from "./Pages/Myvid.js";
import Showallre from "./Pages/Showallre.js";
import Feedback from "./Pages/Feedback.js"


const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [Feedbackopen, setFeedbackopen] = useState(false);

  const { opensi } = useSelector((state) => state.signin);
  const { opensu } = useSelector((state) => state.signup);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          {menuOpen && (
            <Sidebar
              setMenuOpen={setMenuOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setUploadOpen={setUploadOpen}
              setFeedbackopen={setFeedbackopen}
            />
              
          )}
         
          {uploadOpen && <Upload setUploadOpen={setUploadOpen} uploadOpen={uploadOpen} />}
          {Feedback && <Feedback setFeedbackopen={setFeedbackopen} Feedbackopen={Feedbackopen} />}

          <Frame>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {opensi && <Login />}
            {opensu && <Reagister />}

            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/favourites" exact element={<Favourites />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/Showall" exact element={<Showall />} />
              <Route path="/Showpodcasts/:categoryId" element={<Showpodcasts />} />
              <Route path="/Myvid" exact element={<Myvid />} />
              <Route path="/Showallre" exact element={<Showallre />} />
              <Route path="/feedback" exact element={<Feedback />} />
           
             
              


               {/* <Route path="/Reagister" exact element={<Reagister />} />  */}

              {/* <Route path="/podcast/:id" exact element={<PodcastDetails />} />
              <Route
                path="/showpodcasts/:type"
                exact
                element={<DisplayPodcasts />}
              /> */}
              {/* <Route path="/upload" exact element={<Upload />} /> */}
               {/* <Route path='/login' exact element={<Login />} />   */}
            </Routes>
            <Footer />
          </Frame>
          
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
