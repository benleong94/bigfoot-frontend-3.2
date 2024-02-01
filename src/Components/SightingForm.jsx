import { useState, useEffect } from "react";
import Select from "react-select";

function SightingForm({axios, setSightings, Link}) {
  const [newSighting, setNewSighting] = useState({
    date: "",
    location: "",
    notes: ""
  });
  const [allCategories, setAllCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SOME_BACKEND_URL}/categories`)
      .then((response) => {
        setAllCategories(response.data);
      });
    // Only run this effect on component mount
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriesToSubmit = selectedCategories.map(
      (category) => category.value
    );
    
    axios
      .post(`${import.meta.env.VITE_SOME_BACKEND_URL}/sightings`, newSighting)
      .then((response) => {
        const sightingId = response.data.id;
        return axios.post(
          `${
            import.meta.env.VITE_SOME_BACKEND_URL
          }/categories/sightings-categories`,
          {
            sightingId: sightingId,
            categories: categoriesToSubmit,
          }
        );
      })
      .then((response) => {
        setSightings((prevState) => {
          return [...prevState, response.data];
        });
      });

    setNewSighting({
      date: "",
      location: "",
      notes: ""
    });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewSighting((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSelectChange = (selected) => {
    setSelectedCategories(selected);
  };

  return (
    <>
      <Link to="/">Home</Link>

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
            value={newSighting.date}
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
            value={newSighting.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <Select
            isMulti
            options={categoryOptions}
            onChange={handleSelectChange}
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
            value={newSighting.notes}
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
}

export default SightingForm;
