import "./App.css";
import { useState, useEffect } from "react";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import Landing from "./Components/Landing";
import SightingProfile from "./Components/SightingProfile";
import SightingForm from "./Components/SightingForm";
import EditSightingForm from "./Components/EditSightingForm";

function App() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings`
        );
        let unPacked = data.data;
        setSightings(unPacked);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}`
      );
      const newSightings = sightings.filter((item) => item.id !== id);
      setSightings(newSightings);
    } catch (error) {
      console.error("There was an error deleting the item", error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing sightings={sightings} Link={Link} handleDelete={handleDelete}/>,
    },
    {
      path: "/sightings/:id",
      element: <SightingProfile axios={axios} Link={Link} />,
    },
    {
      path: "/add-sightings",
      element: (
        <SightingForm axios={axios} setSightings={setSightings} Link={Link} />
      ),
    },
    {
      path: "/sightings/:id/edit-sightings",
      element: <EditSightingForm axios={axios} Link={Link} />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
