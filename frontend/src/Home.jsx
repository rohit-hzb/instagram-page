import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Instagram</div>
        <div className="flex items-center gap-4">
          <button className="text-blue-500 font-medium hover:underline">
            Home
          </button>
          <button className="text-blue-500 font-medium hover:underline">
            Profile
          </button>
          <button className="text-blue-500 font-medium hover:underline">
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* User Info */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
         
          <div>
            <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">@john_doe</p>
          </div>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              
              <div className="p-3">
                <p className="text-sm text-gray-700">
                  Post description goes here...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
