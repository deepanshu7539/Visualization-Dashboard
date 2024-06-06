import React from "react";
import DataChart from "./components/DataChart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 py-4">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <h1 className="text-white text-3xl font-semibold">
            Visualization Dashboard
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DataChart />
      </main>
    </div>
  );
}

export default App;
