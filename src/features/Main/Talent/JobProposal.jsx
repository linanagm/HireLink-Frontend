import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import FieldError from "../../../components/UI/FieldError";
import InfoItem from "../../../components/UI/InfoItem";
import { applyToJob, getJobById, uploadTalentResume } from "../../../services/talent.service";
import { buildCloudinaryUrl } from "../../../utils/Helpers/cloudinary";
import { formatName } from "../../../utils/tools";
import { proposalSchema } from "../../../utils/validation/jobs.validators";

/**
 * Job proposal form component.
 * Handles the job proposal form submission and resume upload.
 * Displays the job description, form fields, and submission status.
 */
export default function JobProposal() {
  const [resumeFile, setResumeFile] = useState(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
	const fileInputRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });

  // Keep your extraction, but don't default to [] because job is an object
  const job = data?.data?.data ?? data?.data ?? null;

  const paymentType = useMemo(() => (job?.salary ? "Salary" : "Hourly"), [job]);
  const budget = useMemo(() => job?.salary ?? null, [job]);

  const formik = useFormik({
    initialValues: { coverLetter: "", resumeUrl: "" },
    onSubmit: handleApply,
    validationSchema: proposalSchema,
  });

  

/**
 * Handles the resume upload process.
 *
 * If the resume file is not set, it will return immediately.
 * It will then set the uploading state to true and reset the upload error.
 * It will then call the uploadTalentResume function and handle its response.
 * If the response is not ok, it will set the upload error to the response message or "Upload failed".
 * If the response publicId is not set, it will set the upload error to "Upload succeeded but no resumePublicId returned."
 * If the response URL is not set, it will set the upload error to "Upload succeeded but no URL returned."
 * Finally, it will set the resume file to null and set the uploading state to false.
 * @throws {Error} - If the upload fails, it will throw an error with the message "Upload failed".
 */
async function handleUploadResume() {
  if (!resumeFile) return;

  try {
    setIsUploadingResume(true);
    setUploadError("");

    const res = await uploadTalentResume(resumeFile);

    if (!res?.ok) {
      setUploadError(res?.message || "Upload failed");
      return;
    }

    const publicId =
      res?.data?.talentProfile?.resumePublicId ||
      res?.data?.data?.talentProfile?.resumePublicId;

    if (!publicId) {
      setUploadError("Upload succeeded but no resumePublicId returned.");
      return;
    }

    const url = buildCloudinaryUrl(publicId, "raw");
    if (!url) {
      setUploadError("Upload succeeded but no URL returned.");
      return;
    }

    formik.setFieldValue("resumeUrl", url);
    formik.setFieldTouched("resumeUrl", true, false);

    setResumeFile(null);
    
    
  } catch (e) {
    setUploadError(e?.message || "Upload failed");
  } finally {
    setIsUploadingResume(false);
  }
}

  
/**
 * Handles the application form submission.
 * @param {Object} values - Formik form values.
 * @returns {Promise} - Promise that resolves when the form is submitted successfully, or rejects with an error.
 */
  async function handleApply (values) {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      
      const existingUrl = (values.resumeUrl || "").trim();
      if (!existingUrl && !resumeFile) {
        setSubmitError("Please upload a resume or paste a URL.");
        return;
      }

      let finalResumeUrl = existingUrl;

      
      if (!finalResumeUrl && resumeFile) {
        const uploadRes = await uploadTalentResume(resumeFile);

        if (!uploadRes?.ok) {
          setSubmitError(uploadRes?.message || "Resume upload failed");
          return;
        }

		 const publicId =
        uploadRes?.data?.talentProfile?.resumePublicId ||
        uploadRes?.data?.data?.talentProfile?.resumePublicId;

      if (!publicId) {
        setSubmitError("Upload succeeded but no resumePublicId returned.");
        return;
      }

	  finalResumeUrl = buildCloudinaryUrl(publicId, 'raw');
        // خلي الفورم يعكس الـ URL
        formik.setFieldValue("resumeUrl", finalResumeUrl);
        formik.setFieldTouched("resumeUrl", true, false);
        setResumeFile(null);
      }

      // 2) Apply API
      const payload = {
        coverLetter: (values.coverLetter || "").trim() || null,
        resumeUrl: finalResumeUrl || null,
      };

      const res = await applyToJob(id, payload);

      if (res?.ok) {
        navigate(`/talent/applications`);
        return;
      }

      setSubmitError(res?.message || "Apply failed");
    } catch (e) {
      setSubmitError(e?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  if (isLoading) return <div className="px-10 py-10">Loading...</div>;
  if (isError) return <div className="px-10 py-10 text-red-600">{error?.message}</div>;
  if (!job) return <div className="px-10 py-10">Loading Job</div>;

  return (
    <>
      <Helmet>
        <title>Job Proposal</title>
      </Helmet>

      <div className="px-10 py-10">
        {/* JOB DESCRIPTION (read-only) */}
        <div className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">Job Description</h2>

          {/* job title . company name */}
          <h3 className="text-xl font-semibold mb-3">
            {job.title} .{" "}
            <span className="text-lg font-sans font-thin text-gray-600 mb-2">
              {job?.employer?.companyName}
            </span>
          </h3>

          <p className="text-gray-800 font-sans leading-relaxed mb-8">{job.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
            <InfoItem value={formatName(paymentType)} label="Payment Type" />
            <InfoItem value={budget} label="Budget" />
            <InfoItem value={formatName(job.jobType)} label="ًWork Arrangement" />
            <InfoItem value={formatName(job.experienceLevel)} label="Experience Level" />
            <InfoItem value={formatName(job.location)} label="Location" />
          </div>

          {/* RESPONSIBILITIES */}
          <h4 className="text-lg font-semibold mb-2 mt-2">Responsibilities:</h4>
          {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
            <ul className="list-disc ml-6 space-y-1 mb-8 text-gray-700">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-8">No responsibilities listed.</p>
          )}

          {/* SKILLS */}
          {Array.isArray(job?.requiredSkills) && job?.requiredSkills?.length > 0 ? (
            <>
              <h4 className="text-lg font-semibold mb-3 mt-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job?.requiredSkills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {/* Languages */}
          {Array.isArray(job?.requiredLanguages) && job?.requiredLanguages?.length > 0 ? (
            <>
              <h4 className="text-lg font-semibold mb-2 mt-6">Required Languages </h4>
              <div className="flex flex-wrap gap-2">
                {job?.requiredLanguages?.map((lang, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {lang.name} . {formatName(lang.minimumProficiency)}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Form Data */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white mx-auto max-w-4xl p-10 rounded-2xl shadow-sm border mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Terms</h2>

          <div className="space-y-6">

		  	{/* Cover Letter */}
		    <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                className="w-full border rounded-lg px-3 py-2 min-h-[140px]"
                value={formik.values.coverLetter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FieldError touched={formik.touched.coverLetter} error={formik.errors.coverLetter} />
            </div>

		  	{/* Resume */}
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Resume Url
              </label>

              <textarea
                id="resumeUrl"
                name="resumeUrl"
                className="w-full border rounded-lg px-3 py-2 min-h-[110px]"
                value={formik.values.resumeUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <FieldError touched={formik.touched.resumeUrl} error={formik.errors.resumeUrl} />

              {/* Upload section (same UI) */}
              <div className="mt-4">
                <input
				  ref={fileInputRef}
				  name="resumeFile"
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    setUploadError("");
                    setSubmitError("");
                    setResumeFile(e.currentTarget.files?.[0] ?? null);
                  }}
                />

                <label
                  htmlFor="resume-upload"
                  className="
                    inline-flex items-center gap-2
                    px-5 py-2
                    rounded-xl
                    border border-fuchsia-400
                    text-fuchsia-700
                    font-medium text-sm
                    cursor-pointer
                    hover:bg-fuchsia-50
                    transition
                  "
                >
                  <i className="fa-solid fa-link text-fuchsia-400"></i>
                  Upload
                </label>

                {resumeFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: <span className="font-medium">{resumeFile.name}</span>
                  </p>
                )}

                {uploadError ? <p className="mt-2 text-sm text-red-600">{uploadError}</p> : null}
              </div>

              {resumeFile && (
                <button
                  type="button"
                  disabled={isUploadingResume}
                  onClick={handleUploadResume}
                  className="
                    mt-3
                    px-6 py-2
                    bg-fuchsia-800 text-white
                    rounded-xl
                    hover:bg-fuchsia-600
                    transition
                    disabled:opacity-50
                  "
                >
                  {isUploadingResume ? "Uploading..." : "Confirm Upload"}
                </button>
              )}
            </div>
          </div>
        {/* Submit Button */}
          <div className="flex gap-4 mt-10">
            <button
              type="submit"
              className="px-8 py-3 bg-fuchsia-800 text-white rounded-xl hover:bg-fuchsia-600 duration-500"
              disabled={isSubmitting}
            >
              Submit Proposal
            </button>

            {submitError ? <p className="mt-4 text-sm text-red-600">{submitError}</p> : null}

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 border rounded-xl text-gray-700 border-fuchsia-600 hover:bg-fuchsia-700 hover:text-white  duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
