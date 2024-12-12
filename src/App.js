import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  RefreshCcw, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart2 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [results, setResults] = useState([]);
  const [medicalResults, setMedicalResults] = useState([]);
  const [animateResults, setAnimateResults] = useState(false);
  const [inputError, setInputError] = useState("");

  const addSubject = () => {
    const trimmedSubject = newSubject.trim();
    
    if (subjects.some(s => s.name.toLowerCase() === trimmedSubject.toLowerCase())) {
      setInputError("This subject already exists!");
      return;
    }

    if (trimmedSubject) {
      setSubjects([
        ...subjects,
        { 
          name: trimmedSubject, 
          maxHours: "", 
          attendedHours: "",
          id: Date.now()
        },
      ]);
      setNewSubject("");
      setInputError("");
    } else {
      setInputError("Subject name cannot be empty!");
    }
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    setResults(results.filter(result => 
      subjects.find(s => s.id === id && s.name === result.name)
    ));
    setMedicalResults(medicalResults.filter(result => 
      subjects.find(s => s.id === id && s.name === result.name)
    ));
  };

  const updateField = (id, field, value) => {
    const updatedSubjects = subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const calculateAttendance = () => {
    const calculatedResults = subjects.map((subject) => {
      const maxHours = parseInt(subject.maxHours) || 0;
      const attendedHours = parseInt(subject.attendedHours) || 0;

      const attendancePercentage = ((attendedHours / maxHours) * 100) || 0;
      const remainingClasses =
        attendancePercentage < 75
          ? Math.ceil((0.75 * maxHours - attendedHours) / 0.25)
          : 0;

      return {
        id: subject.id,
        name: subject.name,
        percentage: Number(attendancePercentage.toFixed(2)),
        attendedHours,
        maxHours,
        remainingClasses,
      };
    });
    
    setResults(calculatedResults);
    setAnimateResults(true);
    setTimeout(() => setAnimateResults(false), 1000);
  };

  const calculateMedicalDays = () => {
    const calculatedMedicalResults = subjects.map((subject) => {
      const maxHours = parseInt(subject.maxHours) || 0;
      const attendedHours = parseInt(subject.attendedHours) || 0;

      const attendancePercentage = ((attendedHours / maxHours) * 100) || 0;
      const medicalDays =
        attendancePercentage >= 65 && attendancePercentage < 75
          ? Math.ceil((0.75 * maxHours - attendedHours))
          : 0;

      return {
        id: subject.id,
        name: subject.name,
        percentage: Number(attendancePercentage.toFixed(2)),
        medicalDays,
      };
    });
    
    setMedicalResults(calculatedMedicalResults);
    setAnimateResults(true);
    setTimeout(() => setAnimateResults(false), 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSubject();
    }
  };

  // Prepare data for charts
  const attendanceChartData = results.map(result => ({
    name: result.name,
    'Attended Hours': result.attendedHours,
    'Max Hours': result.maxHours
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-8 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg flex items-center justify-center gap-4">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
          Attendance Tracker
          <AlertTriangle className="w-12 h-12 text-yellow-400" />
        </h1>

        {/* Add Subject Section */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="text-green-400" /> Add Subject
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Subject Name"
              value={newSubject}
              onChange={(e) => {
                setNewSubject(e.target.value);
                setInputError("");
              }}
              onKeyPress={handleKeyPress}
              className="flex-grow p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white 
                         placeholder-gray-300 border border-white/20 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={addSubject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white 
                         px-6 py-3 rounded-lg transition duration-300 
                         transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <PlusCircle /> Add Subject
            </button>
          </div>
          {inputError && (
            <p className="text-red-400 mt-2 animate-bounce">{inputError}</p>
          )}
        </div>

        {/* Subjects List */}
        {subjects.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl mb-8">
            <h2 className="text-xl font-semibold mb-4">Subjects</h2>
            {subjects.map((subject) => (
              <div 
                key={subject.id} 
                className="mb-4 p-4 bg-white/10 rounded-lg flex items-center gap-4 hover:bg-white/20 transition"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <div className="flex gap-4 mt-2">
                    <input
                      type="number"
                      placeholder="Max Hours"
                      value={subject.maxHours}
                      onChange={(e) =>
                        updateField(subject.id, "maxHours", e.target.value)
                      }
                      className="w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300"
                    />
                    <input
                      type="number"
                      placeholder="Attended Hours"
                      value={subject.attendedHours}
                      onChange={(e) =>
                        updateField(subject.id, "attendedHours", e.target.value)
                      }
                      className="w-1/2 p-2 rounded bg-white/20 text-white placeholder-gray-300"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => deleteSubject(subject.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <div className="flex gap-4 mt-4">
              <button
                onClick={calculateAttendance}
                className="bg-purple-600 hover:bg-purple-700 text-white 
                           px-6 py-3 rounded-lg transition duration-300 
                           transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <RefreshCcw /> Calculate Attendance
              </button>
              <button
                onClick={calculateMedicalDays}
                className="bg-green-600 hover:bg-green-700 text-white 
                           px-6 py-3 rounded-lg transition duration-300 
                           transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BarChart2 /> Medical Days
              </button>
            </div>
          </div>
        )}

        {/* Visualization Section */}
        {results.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Bar Chart for Hours */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart2 className="text-blue-400" /> Hours Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="Attended Hours" fill="#8884d8" />
                  <Bar dataKey="Max Hours" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart for Attendance Status */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-400" /> Attendance Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { 
                        name: 'Above 75%', 
                        value: results.filter(r => r.percentage >= 75).length 
                      },
                      { 
                        name: 'Below 75%', 
                        value: results.filter(r => r.percentage < 75).length 
                      }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[0, 1].map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Attendance Results */}
        {results.length > 0 && (
          <div 
            className={`bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl mb-8 
                        ${animateResults ? 'animate-pulse' : ''}`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" /> Attendance Results
            </h2>
            {results.map((result) => (
              <div 
                key={result.id} 
                className="mb-4 p-4 bg-white/10 rounded-lg"
              >
                <h3 className="font-semibold text-lg">{result.name}</h3>
                <p>Attendance Percentage: {result.percentage}%</p>
                {result.remainingClasses > 0 ? (
                  <p className="text-yellow-400">
                    You need to attend <strong>{result.remainingClasses}</strong>{" "}
                    more classes to reach 75%.
                  </p>
                ) : (
                  <p className="text-green-400">Attendance is above 75%! 🎉</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Medical Days Results */}
        {medicalResults.length > 0 && (
          <div 
            className={`bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl 
                        ${animateResults ? 'animate-pulse' : ''}`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-400" /> Medical Days Needed
            </h2>
            {medicalResults.map((result) => (
              <div 
                key={result.id} 
                className="mb-4 p-4 bg-white/10 rounded-lg"
              >
                <h3 className="font-semibold text-lg">{result.name}</h3>
                <p>Attendance Percentage: {result.percentage}%</p>
                {result.medicalDays > 0 ? (
                  <p className="text-yellow-400">
                    You need to apply for <strong>{result.medicalDays}</strong>{" "}
                    medical days to reach 75%.
                  </p>
                ) : (
                  <p className="text-gray-400">
                    No medical days needed or attendance is below 65%.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;