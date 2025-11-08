import "./styles/variables-colors.scss";
import './App.css';
import { Route, Routes } from "react-router";
import HomeRoute from "./pages/home/home.route.jsx";
import GetStartedPage from "./pages/getStarted/getStarted.route.jsx";
import QuizConfigPage from "./pages/quiz-config/quiz-config.route.jsx";
import QuizPage from "./pages/quiz/quiz.jsx";
import StatPage from "./pages/stats/stat.route.jsx";
import AdminPage from "./pages/admin/admin.route.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route index element={<HomeRoute />} />
                <Route path="/getStarted" element={<GetStartedPage />} />
                <Route path="/quiz-config" element={<QuizConfigPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/stat" element={<StatPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </>
    )
}

export default App;
