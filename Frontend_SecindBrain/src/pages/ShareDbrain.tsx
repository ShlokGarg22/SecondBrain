import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function ShareDbrain() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("API Response:", response.data); // Debug log to inspect API response
        setContents(response.data.content); // Access the 'content' array from the response
        console.log("Contents State:", response.data.content); // Log contents state
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    }

    fetchContents();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full xl:max-w-7xl mx-auto px-6 space-y-10">
        <header className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">Shared Brain</h1>
          <p className="text-gray-600 mt-2">Here is the Cotent</p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-16">
          {contents.length > 0 ? (
            contents.map(({ type, link, title }, index) => (
              <Card key={index} type={type} link={link} title={title} />
            ))
          ) : (
            <p className="text-center text-gray-600">No content available to display.</p>
          )}
        </main>
      </div>
    </div>
  );
}
