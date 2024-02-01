import { comment } from "postcss";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentsDropdown({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]); 
  const [commentInput, setCommentInput] = useState("");
  const [editComment, setEditComment] = useState(null);


  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleInputChange = (event) => {
    setCommentInput(event.target.value)
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(`http://localhost:3000/sightings/${id}/comments`);
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}/comments`,
      {
        content: commentInput
      }
    );
    setComments(response.data)
    setCommentInput("")
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${id}/comments/${commentId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("There was an error deleting the item", error);
    }
  }

  return (
    <div className="bg-slate-200 max-w-96">
      <button onClick={toggleDropdown} className="my-3">
        {isOpen ? "Hide Comments" : "Show Comments"}
      </button>

      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            <div className="flex-grow text-left px-4 py-2 m-2 text-gray-700">
              {comment.content}
            </div>
            <button
              className="mx-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
            <button className="mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              Edit
            </button>
          </div>
        ))}
        <div className="mt-3">
          <input
            type="text"
            value={commentInput}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit} className="mx-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsDropdown;
