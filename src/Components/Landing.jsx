import CommentsDropdown from "./CommentDropdown";

export default function Landing({sightings, Link, handleDelete}) {

  return (
    <>
      <h1 className="text-3xl font-bold underline text-gray-800 mb-8">
        Sightings
      </h1>
      <Link
        to="/add-sightings"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add a Sighting
      </Link>
      {sightings && sightings.length > 0 ? (
        sightings.map((sighting) => {
          return (
            <div
              key={sighting.id}
              className="w-3/5 mx-auto bg-gray-400 shadow-md rounded-lg p-5 my-5"
            >
              <h4 className="text-xl mb-2">
                <div>
                  <strong>Date:</strong> {sighting.date.split("T")[0]}
                </div>
                <div>
                  <strong>Location:</strong> {sighting.location}
                </div>
              </h4>
              <div className="flex justify-center">
                <p className="font-bold">Categories: </p>
                {sighting.categories.map((category, index) => (
                  <p className="mx-1" key={index}>
                    {category.name}
                  </p>
                ))}
              </div>
              <div className="flex justify-center mx-auto bg-blue-200 my-3 w-64">
                <Link
                  to={`/sightings/${sighting.id}`}
                  className="text-black hover:underline mx-4"
                >
                  View
                </Link>
                <Link
                  to={`/sightings/${sighting.id}/edit-sightings`}
                  className="text-black hover:underline mx-4"
                >
                  Edit
                </Link>
                <div
                  onClick={() => handleDelete(sighting.id)}
                  className="text-black cursor-pointer hover:underline mx-4"
                >
                  Delete
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <CommentsDropdown id={sighting.id} />
              </div>
            </div>
          );
        })
      ) : (
        <p>No Sightings</p>
      )}
    </>
  );
}
