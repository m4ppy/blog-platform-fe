import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DraftsPage from "../pages/DraftsPage"
import PostPage from "../pages/PostPage"
import CategoryPage from "../pages/CategoryPage"
import TagPage from "../pages/TagPage"
import EditPostPage from "../pages/EditPostPage"

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/tag" element={<TagPage />} />
            <Route path="/edit-post" element={<EditPostPage />} />
        </Routes>
    )
}

export default AppRouter
