import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 

const EditSightingForm = ({ axios }) => {
  const [editedSighting, setEditedSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSighting = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}`
        );
        setEditedSighting({
          date: response.data.date,
          location: response.data.location,
          notes: response.data.notes,
        });
      } catch (error) {
        console.error("Error fetching sighting data:", error);
      }
    };
    fetchSighting();
  }, []);

  const handleChange = (event) => {
    setEditedSighting({
      ...editedSighting,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}`,
      editedSighting
    );

  };

  return (
    <>
    <div className="mb-4">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Back to Home
      </Link>
    </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="date"
            value={editedSighting.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="location"
            value={editedSighting.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="notes"
            rows="4"
            cols="50"
            value={editedSighting.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Submit"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default EditSightingForm;
