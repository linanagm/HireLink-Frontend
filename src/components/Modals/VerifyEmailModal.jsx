import React from "react";
import SuccessCard from "../Main/SuccessCard";

export default function VerifyEmailModal({ status, message, onClose, buttonLink }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-0">

        {/* Success / Loading / Error Card */}
        <SuccessCard
          status={status}
          message={message}
          buttonText={buttonLink ? "Go to Login" : null}
          buttonLink={buttonLink}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
