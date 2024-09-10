import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TermsOfUsePage from "./components/layout/Main/TermsOfUsePage/TermsOfUsePage.tsx";
import NotFoundPage from "./components/layout/Main/NotFoundPage/NotFoundPage.tsx";
import PrivateRoute from "./components/layout/Main/PrivateRoute/PrivateRoute.tsx";
import UploadPage from "./components/layout/Main/UploadPage/UploadPage.tsx";
import SearchPage from "./components/layout/Main/SearchPage/SearchPage.tsx";
import LikesPage from "./components/layout/Main/LikesPage/LikesPage.tsx";
import GenrePage from "./components/layout/Main/GenrePage/GenrePage.tsx";
import AboutPage from "./components/layout/Main/AboutPage/AboutPage.tsx";
import MainPage from "./components/layout/Main/MainPage/MainPage.tsx";
import NewPage from "./components/layout/Main/NewPage/NewPage.tsx";
import Header from "./components/layout/Header/Header.tsx";
import Footer from "./components/layout/Footer/Footer.tsx";
import './App.scss'
import CookieInfoPage from "./components/layout/Main/CookieInfoPage/CookieInfoPage.tsx";


export default function App() {
    return (
        <Router>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/new" element={<NewPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/likes" element={<LikesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path='/Aggressive' element={<GenrePage />} />
                    <Route path='/Sad' element={<GenrePage />} />
                    <Route path='/Joyful' element={<GenrePage />} />
                    <Route path='/Dreamy' element={<GenrePage />} />
                    <Route path='/Mystical' element={<GenrePage />} />
                    <Route path='/Pop' element={<GenrePage />} />
                    <Route path='/Metal' element={<GenrePage />} />
                    <Route path='/Rock' element={<GenrePage />} />
                    <Route path='/Electronic' element={<GenrePage />} />
                    <Route path='/Hip-hop' element={<GenrePage />} />
                    <Route path='/Rap' element={<GenrePage />} />
                    <Route path='/R&B' element={<GenrePage />} />
                    <Route path='/Jazz' element={<GenrePage />} />
                    <Route path='/Phonk' element={<GenrePage />} />
                    <Route path='/Trance' element={<GenrePage />} />
                    <Route path='/Dubstep' element={<GenrePage />} />
                    <Route path='/Club' element={<GenrePage />} />
                    <Route path='/Classical' element={<GenrePage />} />
                    <Route path='/D&B' element={<GenrePage />} />
                    <Route path='/terms_of_use' element={<TermsOfUsePage />} />
                    <Route path='/cookie' element={<CookieInfoPage />} />
                    <Route path='/D&B' element={<GenrePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/upload" element={<UploadPage />} />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}