import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import HomePage from "./components/HomePage";
import DetailsPage from "./components/DetailsPage";
import ReviewPage from './components/ReviewPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:id" element={<DetailsPage />} />
                <Route path="/room/:id/review" element={<ReviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;
