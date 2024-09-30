import React, { useState } from "react";

const Analysis = () => {
    const [currentGPA, setCurrentGPA] = useState("");
    const [targetGPA, setTargetGPA] = useState("");
    const [numCourses, setNumCourses] = useState("");
    const [result, setResult] = useState(null);

    const performAnalysis = () => {
        // Mock analysis logic
        const current = parseFloat(currentGPA);
        const target = parseFloat(targetGPA);
        const courses = parseInt(numCourses);

        if (target > current) {
            const requiredGPA =
                (target * (courses + 4) - current * 4) / courses;
            setResult(
                `To achieve a GPA of ${target}, you need to maintain an average GPA of ${requiredGPA.toFixed(
                    2
                )} in your next ${courses} courses.`
            );
        } else {
            setResult(
                `Your current GPA (${current}) is already higher than or equal to your target GPA (${target}).`
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-semibold mb-4">
                        What-If Analysis
                    </h2>
                    <input
                        type="number"
                        placeholder="Current GPA"
                        value={currentGPA}
                        onChange={(e) => setCurrentGPA(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                        type="number"
                        placeholder="Target GPA"
                        value={targetGPA}
                        onChange={(e) => setTargetGPA(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                        type="number"
                        placeholder="Number of Courses"
                        value={numCourses}
                        onChange={(e) => setNumCourses(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <button
                        onClick={performAnalysis}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Perform Analysis
                    </button>
                    {result && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <h3 className="text-xl font-semibold mb-2">
                                Analysis Result
                            </h3>
                            <p>{result}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analysis;
