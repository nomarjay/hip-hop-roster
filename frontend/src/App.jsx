import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/common/Home';
import RosterView from './components/roster/RosterView';
import ArtistDetailedView from './components/artist/ArtistDetailedView';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import { getAllArtists } from './components/services/api.js';

function App() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            setLoading(true);
            const data = await getAllArtists();
            setArtists(data);
            setError(null);
        } catch (err) {
            setError('Failed to load artists');
            console.error('Error fetching artists:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Router>
            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Public Routes with Navbar */}
                <Route
                    path="/*"
                    element={
                        <div className="min-h-screen bg-gray-950">
                            <Navbar />
                            <Routes>
                                {/* Home Page */}
                                <Route path="/" element={<Home />} />

                                {/* Roster Page */}
                                <Route
                                    path="/roster"
                                    element={
                                        loading ? (
                                            <div className="flex items-center justify-center h-screen">
                                                <div className="text-white text-2xl animate-pulse">
                                                    Loading roster...
                                                </div>
                                            </div>
                                        ) : error ? (
                                            <div className="flex items-center justify-center h-screen">
                                                <div className="text-red-500 text-2xl">{error}</div>
                                            </div>
                                        ) : (
                                            <div className="container mx-auto px-4 py-8">
                                                <RosterView artists={artists} />
                                            </div>
                                        )
                                    }
                                />

                                {/* Artist Detail Page */}
                                <Route
                                    path="/artist/:id"
                                    element={
                                        loading ? (
                                            <div className="flex items-center justify-center h-screen">
                                                <div className="text-white text-2xl animate-pulse">
                                                    Loading...
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="container mx-auto px-4 py-8">
                                                <ArtistDetailedView artists={artists} />
                                            </div>
                                        )
                                    }
                                />

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
