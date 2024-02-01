import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SightingProfile({axios, Link}) {
  const { id } = useParams();
  const [sighting, setSighting] = useState({});
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}`
        );
        let unPacked = data.data;
        console.log(unPacked)
        setSighting(unPacked);
        setCategories(unPacked.categories)
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
      <Link
        to="/"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out"
      >
        Home
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2"></h1>
      <h1 className="text-xl font-semibold text-gray-700">
        Sighting {sighting.id}
      </h1>
      <h4 className="text-md text-gray-600 mt-2 mb-4">
        <span className="font-semibold">Location:</span> {sighting.location}
        <br />
        <span className="font-semibold">Notes:</span> {sighting.notes}
      </h4>
      <div className="mt-4">
        <h4>Categories: </h4>
        {categories.map((category, index) => (
          <p key={index}>{category.name}</p>
        ))}
      </div>
    </div>
  );
}
