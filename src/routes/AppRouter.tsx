import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DraftsPage from "../pages/DraftsPage";
import PostPage from "../pages/PostPage";
import CategoryPage from "../pages/CategoryPage";
import TagPage from "../pages/TagPage";
import EditPostPage from "../pages/EditPostPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/drafts"
                element={
                    <ProtectedRoute>
                        <DraftsPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/tags" element={<TagPage />} />
            <Route 
                path="/posts/new" 
                element={
                    <ProtectedRoute>
                        <EditPostPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/posts/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditPostPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;
