import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import OptionsManagerPage from './pages/OptionsManagerPage';
import { RegistrationProvider } from './contexts/RegistrationContext';

export default function App() {
    return (
        <BrowserRouter>
            <RegistrationProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/register" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/options" element={<OptionsManagerPage />} />
                </Routes>
            </RegistrationProvider>
        </BrowserRouter>
    );
}