import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Main/Home";
import Navbar from "./components/Navbar";
import BlogSite from "./components/blog_home_auth";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { Create } from "./pages/Dashboard/CreatePost";
import { useAuthProvider } from "./state/store";
import { PostPage } from "./pages/Main/PostPage";
import { Overview } from "./pages/Dashboard/Overview";
import { MainLayout } from "./pages/Main/MainLayout";
import { DashboardLayout } from "./pages/Dashboard/DashboardLayout";
import { Profile } from "./pages/Dashboard/Profile";
import { ProfileForm } from "./components/Profile/ProfileForm";
import { ManagePost } from "./pages/Dashboard/ManagePost";

function App() {
    const token = useAuthProvider((state) => state.token);
    const ProtectRoute = ({ children }) => {
        return token ? children : <Navigate to="/login" />;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path="/" element={<Home />} />
                    <Route path="post/:id" element={<PostPage />} />
                </Route>
                <Route
                    path="/create-post"
                    element={
                        <ProtectRoute>
                            <CreatePost />
                        </ProtectRoute>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="posts" element={<ManagePost />} />
                    <Route path="create" element={<Create />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/edit" element={<ProfileForm />} />
                </Route>
                <Route path="/i" element={<BlogSite />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
