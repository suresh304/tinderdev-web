import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../constants';
import { removeFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';
import { log } from '../utils/helpers';

const FeedCard = (feed) => {
  const dispatch = useDispatch();
  const { age, first_name, last_name, gender, photo_url, about, id } = feed;
  log(feed);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const randomBio = "Passionate traveler, coffee enthusiast, and part-time poet. Always curious, always learning.";

  return (
    <div className="card bg-base-100 shadow-md my-4 w-full max-w-xl mx-auto">
      <div className="card-body p-5">
        <div className="flex gap-4 items-start">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={photo_url || 'https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg'}
                alt="User"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title">{first_name} {last_name}</h2>
                {age && (
                  <p className="text-sm text-gray-500">{age} yrs • {gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
                )}
              </div>
            </div>

           

            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-700">Bio</h3>
              <p className="text-sm text-gray-600">{about||randomBio}</p>
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSendRequest('interested', id)}
              >
                Interested
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleSendRequest('ignored', id)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
