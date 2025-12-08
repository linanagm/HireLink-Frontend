import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function JobProposal() {
  const location = useLocation();
  const job = location.state || {}; // البيانات المرسلة من الصفحة السابقة

  // ===== FORM STATES =====
  const [duration, setDuration] = useState("");
  const [hourlyRate, setHourlyRate] = useState(job?.hourlyRate || "");
  const [coverLetter, setCoverLetter] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [certificateName, setCertificateName] = useState("");

  // ===== HANDLE CANCEL (RESET FORM) =====
  const handleCancel = () => {
    setDuration("");
    setHourlyRate(job?.hourlyRate || "");
    setCoverLetter("");
    setAttachmentName("");
    setCertificateName("");
  };

  // ===== HANDLE FILE CHANGE =====
  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) setAttachmentName(e.target.files[0].name);
    else setAttachmentName("");
  };

  const handleCertificateChange = (e) => {
    if (e.target.files.length > 0) setCertificateName(e.target.files[0].name);
    else setCertificateName("");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">

      {/* JOB DESCRIPTION BOX */}
      <div className="bg-white p-8 rounded-xl shadow-sm border mb-10">
        <h2 className="text-2xl font-bold mb-4">{job?.title || "Job Title"}</h2>
        <p className="text-gray-600 mb-6">{job?.description || "Job Description"}</p>

        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          <div>
            <p className="font-semibold">Hourly</p>
            <p className="text-gray-500 text-sm">Payment Type</p>
          </div>
          <div>
            <p className="font-semibold">{job?.hourlyRate || "$0/hr"}</p>
            <p className="text-gray-500 text-sm">Budget</p>
          </div>
          <div>
            <p className="font-semibold">{job?.level || "Level"}</p>
            <p className="text-gray-500 text-sm">Experience Level</p>
          </div>
          <div>
            <p className="font-semibold">{job?.location || "Location"}</p>
            <p className="text-gray-500 text-sm">Location</p>
          </div>
        </div>

        {/* Responsibilities */}
        {job?.responsibilities && (
          <>
            <h4 className="font-semibold text-lg mb-2">Responsibilities:</h4>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Skills */}
        {job?.skills && (
          <>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* TERMS / FORM BOX */}
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold mb-6">Terms & Proposal</h2>

        {/* Duration */}
        <label className="block mb-2 font-medium">How long will this project take?</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        >
          <option value="">Select Duration</option>
          <option value="1 week">1 week</option>
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
        </select>

        {/* Hourly Rate */}
        <label className="block mb-2 font-medium">Hourly Rate</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          placeholder="Hourly rate/hr"
          className="w-full border p-3 rounded-lg mb-6"
        />

        {/* Cover Letter */}
        <label className="block mb-2 font-medium">Cover Letter</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows="6"
          placeholder="Write your cover letter..."
          className="w-full border p-3 rounded-lg mb-6"
        ></textarea>

        {/* Attach File */}
        <label className="block mb-2 font-medium">Attach File</label>
        <input
          type="file"
          onChange={handleAttachmentChange}
          className="mb-2"
        />
        {attachmentName && <p className="text-gray-500 mb-4">Selected: {attachmentName}</p>}

        {/* Certificate */}
        <label className="block mb-2 font-medium">Certificate</label>
        <input
          type="file"
          onChange={handleCertificateChange}
          className="mb-2"
        />
        {certificateName && <p className="text-gray-500 mb-4">Selected: {certificateName}</p>}

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
            Submit Proposal
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
