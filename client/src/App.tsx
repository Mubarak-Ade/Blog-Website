import { ProfileForm } from "@/components/Profile/ProfileForm";
import { Overview } from "@/pages/Dashboard/user/Overview";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import BlogSite from "./components/blog_home_auth";
import { CreatePost } from "./pages/CreatePost";
import { AdminDashboardLayout } from "./pages/Dashboard/admin/AdminDashboardLayout";
import { Create } from "./pages/Dashboard/user/CreatePost";
import { ManagePost } from "./pages/Dashboard/user/ManagePost";
import { Profile } from "./pages/Dashboard/user/Profile";
import { UserDashboardLayout } from "./pages/Dashboard/user/UserDashboardLayout";
import { Login } from "./pages/Login";
import Home from "./pages/Main/Home";
import { MainLayout } from "./pages/Main/MainLayout";
import { ViewPost } from "./pages/Main/ViewPost";
import { PostPage } from "./pages/PostPage";
import { Register } from "./pages/Register";
import { useAuthProvider } from "./store/store";
import { useThemeStore } from "./store/ThemeStore";
import { useEffect } from "react";

// import { Toaster } from "sonner";

function App() {
	const token = useAuthProvider((state) => state.token);
	const user = useAuthProvider((state) => state.user);
	const theme = useThemeStore(state => state.theme)
	const ProtectRoute = ({ children }: React.PropsWithChildren) => {
		return token ? children : <Navigate to="/login" />;
	};

	const AdminRoute = ({ children }: React.PropsWithChildren) => {
		if (!token || user?.role !== "admin") {
			return <Navigate to="/login" />;
		}
		return children;
	};

	useEffect(() => {
		const root = document.documentElement
		root.classList.remove("light", "dark")
		root.classList.add(theme)
	}, [theme])
	
	return (
		<BrowserRouter>
			{/* <Toaster /> */}
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="post/:id"
						element={<ViewPost />}
					/>
					<Route
						path="posts"
						element={<PostPage />}
					/>
				</Route>
				<Route
					path="/create-post"
					element={
						<ProtectRoute>
							<CreatePost />
						</ProtectRoute>
					}
				/>
				<Route
					path="login"
					element={<Login />}
				/>
				<Route
					path="register"
					element={<Register />}
				/>

				{/* user routes */}
				<Route
					path="user/dashboard"
					element={
						<ProtectRoute>
							<UserDashboardLayout />
						</ProtectRoute>
					}
				>
					<Route
						index
						element={<Overview />}
					/>
					<Route
						path="posts"
						element={<ManagePost />}
					/>
					<Route
						path="create"
						element={<CreatePost />}
					/>
					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="profile/edit"
						element={<ProfileForm />}
					/>
				</Route>
				<Route
					path="/i"
					element={<BlogSite />}
				/>

				{/* admin routes  */}
				<Route
					path="admin/dashboard"
					element={
						<AdminRoute>
							<AdminDashboardLayout />
						</AdminRoute>
					}
				>
					<Route
						index
						element={<Overview />}
					/>
					<Route
						path="posts"
						element={<ManagePost />}
					/>
					<Route
						path="create"
						element={<CreatePost />}
					/>
					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="profile/edit"
						element={<ProfileForm />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
