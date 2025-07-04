import React from "react";
export default function SubmissionCard({ submission, page, index, totalPages }) {

  console.log("submission=>>>>",submission.imgLink)
  return (
    <div className="bg-white border border-blue-200 rounded-2xl shadow p-6 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl overflow-hidden">
          {submission.imgLink ? (
            <img
              src={submission.imgLink}
              alt={submission.studentName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            submission.studentName?.[0]?.toUpperCase() || "S"
          )}
        </div>
        <div>
          <div className="font-semibold text-blue-700 text-lg">{submission.studentName}</div>
          <div className="text-blue-400 text-xs">ID: {submission.studentId}</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="font-bold text-blue-600">Title: {submission.title}</div>
        <div className="text-blue-500 text-sm">{submission.description}</div>
      </div>
      <div className="mb-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            submission.status === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {submission.status === "approved" ? "Approved" : "Pending"}
        </span>
      </div>
      {submission.fileUrl && (
        <a
          href={submission.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm font-medium cursor-pointer hover:text-blue-800"
        >
          View Attachment
        </a>
      )}
      <div className="text-right text-md text-blue-500 mt-2">
        {submission.createdAt
          ? new Date(submission.createdAt).toLocaleString()
          : ""}
      </div>
    </div>
  );
}