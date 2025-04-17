import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [dob, setDob] = useState('');
  const [dateSubmitted, setDateSubmitted] = useState(false);

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateSubmitted(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 p-6">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">🎉 Birthday Info App 🎉</h1>

        {!dateSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
            <label className="text-lg font-semibold align-center text-gray-700">Enter your Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              required
              className="p-3 border-2 border-purple-400 rounded-xl shadow-md"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition-all">
              Submit 🎂
            </button>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
              <Link to="/present-age">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md w-full">🎈 Present Age</button>
              </Link>
              <Link to="/age-at-year">
                <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg shadow-md w-full">📅 Age at Year</button>
              </Link>
              <Link to="/same-weekday-year">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-lg shadow-md w-full">🔁 Same Weekday</button>
              </Link>
              <Link to="/comments">
                <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg shadow-md w-full">💬 Comments</button>
              </Link>
            </div>

            <div className="mt-10">
              <Routes>
                <Route path="/present-age" element={<PresentAge dob={dob} />} />
                <Route path="/age-at-year" element={<AgeAtYear dob={dob} />} />
                <Route path="/same-weekday-year" element={<SameWeekday dob={dob} />} />
                <Route path="/comments" element={<Comments />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

function PresentAge({ dob }) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return <p className="text-2xl font-semibold text-center text-blue-700">🎂 You are {age} years old.</p>;
}

function AgeAtYear({ dob }) {
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const birthDate = new Date(dob);

  const calculateAge = () => {
    const y = parseInt(year);
    if (!isNaN(y)) {
      setAge(y - birthDate.getFullYear());
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <label className="text-lg font-semibold text-gray-700">Enter the Year:</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-3 border border-gray-400 rounded-lg"
      />
      <button onClick={calculateAge} className="bg-green-600 text-white px-5 py-2 rounded-lg">
        Calculate
      </button>
      {age !== null && <p className="text-lg text-green-700">📅 Your age in {year} will be {age} years</p>}
    </div>
  );
}

function SameWeekday({ dob }) {
  const [show, setShow] = useState(false);
  const birthDate = new Date(dob);

  // Function to find years when birthday falls on the same weekday
  const findSameWeekdays = () => {
    const years = [];
    const baseDay = birthDate.getDay();
    const day = birthDate.getDate();
    const month = birthDate.getMonth();
    for (let year = birthDate.getFullYear() + 1; year <= 2060; year++) {
      const temp = new Date(year, month, day);
      if (temp.getDay() === baseDay) years.push(year);
    }
    return years;
  };

  const sameYears = findSameWeekdays();

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={() => setShow(!show)}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-xl shadow-md transition-all"
      >
        🔍 Show Same Weekday Birthdays
      </button>
      {show && (
        <div className="bg-white rounded-xl p-4 shadow-lg max-w-lg text-center">
          <p className="text-lg font-medium text-gray-700 mb-3">
            📆 Years when your birthday is on the same weekday:
          </p>
          <div className="flex justify-center gap-3 text-purple-700 font-semibold">
            <span className="bg-purple-100 px-3 py-1 rounded-md">
              {sameYears.join(" ")} {/* Displaying years with space separation */}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


function Comments() {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (comment) setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <textarea
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-3 border border-gray-400 rounded-xl w-3/4"
      ></textarea>
      <button onClick={handleSubmit} className="bg-pink-600 text-white px-5 py-2 rounded-xl">
        💬 Submit
      </button>
      {submitted && <p className="text-green-700">✅ Thanks for your comment!</p>}
    </div>
  );
}

export default App;
