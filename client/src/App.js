import { isLoggedIn } from "./utils/auth";
import './App.css';
import { BrowserRouter as Router, Routes, Route ,useLocation} from "react-router-dom";
import Layout from './components/Layout/Layout';
import GetStarted from "./pages/GetStarted/GetStarted";
import Home from "./pages/home/home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from './pages/register/register';
import Login from "./pages/login/login";
import { Toaster } from 'react-hot-toast';
import AddArtwork from "./components/AddArtwork/AddArtwork";
import ArtworkDetails from "./components/artworkDetails/artworkDetails";
import Artworks from "./components/Artworks/Artworks";
import Artists from "./components/Artists/Artists";
import WeeklyChallenge from "./pages/WeeklyChallenge/WeeklyChallenge";
import CreateWeeklyChallenge from "./pages/admin/admin";
import ContactUs from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";
import UserProfile from "./pages/UerProfile/UserProfile";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import AboutMe from "./pages/About/About";
import ArtworkManage from "./pages/ArtworkManage/ArtworkManage";



function AppRoutes() {
  const loggedIn = isLoggedIn();
  const location = useLocation();
  
  const noLayoutPages = ['/login', '/register', '/get-started'];
  const useLayout = !noLayoutPages.includes(location.pathname);
  return useLayout?(
     <Layout>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Home /> : <LandingPage />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/uploadArtwork" element={<AddArtwork/>}></Route>
          <Route path="/artworkDetails/:id" element={<ArtworkDetails/>}></Route>
          <Route path="/Artworks" element={<Artworks/>}></Route>
          <Route path="/Artists" element={<Artists/>}></Route>
          <Route path="/WeeklyChallenge" element={<WeeklyChallenge/>}></Route>
          <Route path="/AdminDashboard" element={<CreateWeeklyChallenge/>}></Route>
          <Route path="/contact" element={<ContactUs/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          <Route path="/PersonalInfo" element={<PersonalInfo/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/messages" element={<MessagesPage/>} />
          <Route path="/about" element={<AboutMe/>}></Route>
          <Route path="/artworks/:id/manage" element={<ArtworkManage/>}></Route>


        </Routes>
      </Layout>
    ):(
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    )}
function App() {

  return (
    <div className="App">
     <Router>
      <AppRoutes />
     </Router>
     <Toaster position="top-center" />

    </div>
  );
}

export default App;
