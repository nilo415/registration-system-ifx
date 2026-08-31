import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" replace />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}