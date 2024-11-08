import { Route, Routes } from "react-router"
import HomePage from "./pages/Home"
import AuthLayout from "./pages/auth/Layout"
import LoginPage from "./pages/auth/Login"
import RegisterPage from "./pages/auth/Register"
import Navbar from "./components/Navbar/Navbar"
import Spinner from "./components/Spinner/Spinner"
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile"
import ModelImprovement from "./pages/ModelImprovement"
import About from "./pages/about/About"
import Queries from "./pages/Queries"
import QnA from "./pages/qa/QnA"
import Review from "./pages/review/Review"
import Reviews from "./pages/reviews/Reviews"

function App() {

  return <div>

    <Navbar />
    <div className="p-2">
      <Routes>
        <Route index element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/review" element={<Review />} />
        <Route path="/model-improvement" element={<ModelImprovement />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Spinner />
    </div>
    <ToastContainer />
  </div>

}

export default App
