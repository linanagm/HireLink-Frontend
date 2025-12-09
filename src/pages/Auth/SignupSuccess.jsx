import React from "react";
import SuccessCard from "../../components/Main/SuccessCard"; 
import { getMailProviderUrl } from '../../utils/mail.js'

export default function SignupSuccess({ onClose, email }) {

      const mailProviderUrl = getMailProviderUrl(email);
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="relative">
        
        {/* success card */}
        <SuccessCard
          status="success"
          message="Account created successfully! Please verify your email."
          buttonText={mailProviderUrl ? 'Open Email' : 'Close'}
          buttonLink={mailProviderUrl} 
        />
        
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-1/4 right-2 "
        >
          <i class="fa-solid fa-x bolder text-slate-800 hover:text-red-900"></i>
        
        </button>

      </div>
    </div>
  );
}
