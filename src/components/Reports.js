import React, { useState } from "react";

const mockReports = {
    "gpa-by-major": [
        {
            major: "Computer Science",
            highestGPA: 4.0,
            lowestGPA: 2.5,
            averageGPA: 3.2,
        },
        {
            major: "Mathematics",
            highestGPA: 3.9,
            lowestGPA: 2.7,
            averageGPA: 3.4,
        },
    ],
    "department-ranking": [
        { department: "Engineering", averageGPA: 3.5 },
        { department: "Science", averageGPA: 3.3 },
        { department: "Humanities", averageGPA: 3.2 },
    ],
    "course-enrollment": [
        {
            course: "Introduction to Programming",
            semester: "Fall 2023",
            enrollment: 120,
            averageGrade: 3.1,
        },
        {
            course: "Data Structures",
            semester: "Spring 2024",
            enrollment: 80,
            averageGrade: 3.3,
        },
    ],
};

const Reports = () => {
    const [reportType, setReportType] = useState("");
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        setReportData(mockReports[reportType]);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-semibold mb-4">Reports</h2>
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">Select Report Type</option>
                        <option value="gpa-by-major">GPA by Major</option>
                        <option value="department-ranking">
                            Department Ranking
                        </option>
                        <option value="course-enrollment">
                            Course Enrollment
                        </option>
                    </select>
                    <button
                        onClick={generateReport}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Generate Report
                    </button>
                    {reportData && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2">
                                Report Results
                            </h3>
                            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                                {JSON.stringify(reportData, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
