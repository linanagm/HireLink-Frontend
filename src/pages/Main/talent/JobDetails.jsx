import React from "react";
import { useParams } from "react-router-dom";

export default function JobDetail() {
  const { jobId } = useParams(); // ناخد ال id من ال URL
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Job Detail Page</h1>
      <p>Details for Job ID: {jobId}</p>
    </div>
  );
}
