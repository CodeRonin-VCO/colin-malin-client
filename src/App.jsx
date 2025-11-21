import "./styles/variables-colors.scss";
import './App.css';
import { Route, Routes } from "react-router";
import HomeRoute from "./pages/home/home.route.jsx";
import GetStartedPage from "./pages/getStarted/getStarted.route.jsx";
import QuizConfigPage from "./pages/quiz-config/quiz-config.route.jsx";
import QuizPage from "./pages/quiz/quiz.jsx";
import StatPage from "./pages/stats/stat.route.jsx";
import AdminPage from "./pages/admin/admin.route.jsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route index element={<HomeRoute />} />
                <Route
                    path="/getStarted"
                    element={
                        <ProtectedRoute>
                            <GetStartedPage />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/quiz-config"
                    element={
                        <ProtectedRoute>
                            <QuizConfigPage />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/quiz"
                    element={
                        <ProtectedRoute>
                            <QuizPage />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/stat"
                    element={
                        <ProtectedRoute>
                            <StatPage />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    } />
            </Routes>
        </>
    )
}

export default App;