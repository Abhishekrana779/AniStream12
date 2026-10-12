import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Browse = lazy(() => import("./pages/Browse"));
const Trending = lazy(() => import("./pages/Trending"));
const Popular = lazy(() => import("./pages/Popular"));
const Recent = lazy(() => import("./pages/Recent"));
const Upcoming = lazy(() => import("./pages/Upcoming"));
const Schedule = lazy(() => import("./pages/Schedule"));
const AnimeDetails = lazy(() => import("./pages/AnimeDetails"));
const Watch = lazy(() => import("./pages/Watch"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const History = lazy(() => import("./pages/History"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/watch/:anilistId/:episodeId" element={<Watch />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
