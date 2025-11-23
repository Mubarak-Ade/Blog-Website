import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Main/Home";
import Navbar from "./components/Navbar";
import BlogSite from "./components/blog_home_auth";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { Create } from "./pages/Dashboard/user/CreatePost";
import { useAuthProvider } from "./state/store";
import { PostPage } from "./pages/Main/PostPage";
import { Overview } from "@/pages/Dashboard/user/Overview";
import { MainLayout } from "./pages/Main/MainLayout";
import { UserDashboardLayout } from "./pages/Dashboard/user/UserDashboardLayout";
import { Profile } from "./pages/Dashboard/user/Profile";
import { ProfileForm } from "@/components/Profile/ProfileForm";
import { ManagePost } from "./pages/Dashboard/user/ManagePost";
import { Toaster } from "./components/ui/sonner";
import { AdminDashboardLayout } from "./pages/Dashboard/admin/AdminDashboardLayout";
// import { Toaster } from "sonner";

function App() {
    const token = useAuthProvider((state) => state.token);
    const user = useAuthProvider((state) => state.user);
    const ProtectRoute = ({ children }: React.PropsWithChildren) => {
        return token ? children : <Navigate to="/login" />;
    };

    const AdminRoute = ({ children }: React.PropsWithChildren) => {
        if(!token || user?.role !== "admin") {
            return <Navigate to="/login" />;
        }
        return children
    };
    return (
            <BrowserRouter>
                {/* <Toaster /> */}
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

                     {/* user routes */}
                    <Route path="user/dashboard" element={<ProtectRoute><UserDashboardLayout /></ProtectRoute>}>
                        <Route index element={<Overview />} />
                        <Route path="posts" element={<ManagePost />} />
                        <Route path="create" element={<Create />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="profile/edit" element={<ProfileForm />} />
                    </Route>
                    <Route path="/i" element={<BlogSite />} />

                    {/* admin routes  */}
                    <Route path="admin/dashboard" element={<AdminRoute><AdminDashboardLayout /></AdminRoute>}>
                        <Route index element={<Overview />} />
                        <Route path="posts" element={<ManagePost />} />
                        <Route path="create" element={<Create />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="profile/edit" element={<ProfileForm />} />
                    </Route>
                </Routes>



            </BrowserRouter>
    );
}

export default App;
