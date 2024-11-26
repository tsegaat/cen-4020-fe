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
import Cookies from "js-cookie";
function App() {
    const [user, setUser] = useState(null);
    const userId = Cookies.get("cen-userId");
    const userRole = Cookies.get("cen-userRole");
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
                            userId && userRole ? (
                                <Navigate to={`/${userRole}`} />
                            ) : (
                                <Login setUser={setUser} />
                            )
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            userId && userRole === "student" ? (
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
                            userId && userRole === "advisor" ? (
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
                            userId && userRole === "instructor" ? (
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
                            userId && userRole === "staff" ? (
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
