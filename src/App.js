import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import AdvisorDashboard from "./components/AdvisorDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import StaffDashboard from "./components/StaffDashboard";

function App() {
    const [user, setUser] = useState(null);

    const handleSignOut = () => {
        setUser(null);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Navigate to={`/${user.role}`} />
                            ) : (
                                <Login setUser={setUser} />
                            )
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            user && user.role === "student" ? (
                                <StudentDashboard
                                    user={user}
                                    onSignOut={handleSignOut}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/advisor"
                        element={
                            user && user.role === "advisor" ? (
                                <AdvisorDashboard
                                    user={user}
                                    onSignOut={handleSignOut}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/instructor"
                        element={
                            user && user.role === "instructor" ? (
                                <InstructorDashboard
                                    user={user}
                                    onSignOut={handleSignOut}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/staff"
                        element={
                            user && user.role === "staff" ? (
                                <StaffDashboard
                                    user={user}
                                    onSignOut={handleSignOut}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
