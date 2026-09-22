import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import OptionsManagerPage from './pages/OptionsManagerPage';
import AppLayout from './components/layout/AppLayout';
import { RegistrationProvider } from './contexts/RegistrationContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <RegistrationProvider>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<Navigate to="/register" replace />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/options" element={<OptionsManagerPage />} />
                        </Route>
                    </Routes>
                </RegistrationProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}