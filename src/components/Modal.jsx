import React, { useState } from 'react';

const Modal = ({ onClose,Yes,No }) => {
    console.log("modal>>>>>>>>>>",onclose)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white opacity-90 z-50" onClick={onClose}>
      <div
        className="card bg-blue-100 text-blue-600 w-96 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the modal
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">Deleting Message</h2>
          <p>We are using cookies for no reason.</p>
          <div className="card-actions justify-end w-full mt-4">
            <button className="btn btn-secondary" onClick={Yes}>Accept</button>
            <button className="btn btn-danger" onClick={No}>Deny</button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Modal;
