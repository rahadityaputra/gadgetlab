import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/api.js"


const ReviewSection = ({deviceId}) => {
  console.log(deviceId);
  const [newReviewText, setNewReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchDeviceReviews = async() => {
     try {
      const result = await api.getDeviceReviews(deviceId);
        setReviews(result);
      } catch (error) {
        throw error;
       }
    } 
    
    fetchDeviceReviews();

  }, [deviceId]);

  const handleAddReview = async () => {
    const reviewInput = document.getElementById("comment-input");
    const newReviewText = reviewInput.value;
    reviewInput.value = "";
    try {
      const response = await api.addReview(deviceId, newReviewText, 4);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  }

  return (
      <div className="max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      <div className="flex mb-4">
        <input
          id="comment-input"
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          placeholder="Add New Review..."
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          onClick={handleAddReview}
        >
          Send
        </button>
      </div>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-md m-3 p-5 border-b border-gray-300 py-2 flex ">
              <div className="flex items-center flex-none">
                <img
                    src={`https://ui-avatars.com/api/?name=${review.users.name}&size=128&background=random`}
                    alt="User Avatar"
                    className="rounded-full border-4 border-white shadow-md"
                  style={{width: "200px"}}
                />
              </div>
              <div className="flex flex-col p-3 flex-1">
                <p className="font-semibold">{review.users.username}</p>
                <p className="w-full break-words">{review.review_text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  )
}

export default ReviewSection;
