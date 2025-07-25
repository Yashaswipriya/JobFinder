"use client";
import { useGlobalContext } from '@/context/globalContext';
import { useJobContext } from '@/context/jobsContext';
import { Job } from '@/types/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { Separator } from '../ui/separator';
import { Calendar } from 'lucide-react';
import { formatDates } from '@/utils/formatDates';
import formatMoney from '@/utils/formatMoney';
import { bookmark,bookmarkEmpty } from '@/utils/icons';
 
interface JobProps{
        job: Job;
        activeJob?: boolean;
    }

function JobCard({job, activeJob }: JobProps) {
   const {likeJob} = useJobContext();
   const {userProfile, isAuthenticated} = useGlobalContext();
   const {
    title,
    location,
    salaryType,
    createdBy,
    applicants,
    jobType,
    createdAt,
    salary,
   } = job;

   
  const name = job.createdBy?.name || "Unknown";
  const profilePicture = job.createdBy?.profilePicture || "/user.png";


   const router = useRouter();

    const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  useEffect(() => {
    setIsLiked(job.likes.includes(userProfile._id));
  }, [job.likes, userProfile._id]);

   const companyDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.";
   const jobTypeBg = (type: string) => {
    switch (type) {
      case "Full Time":
        return "bg-green-500/20 text-green-600";
      case "Part Time":
        return "bg-purple-500/20 text-purple-600";
      case "Contract":
        return "bg-red-500/20 text-red-600";
      case "Internship":
        return "bg-indigo-500/20 text-indigo-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <div className={`p-8 rounded-xl flex flex-col gap-5
    ${
      activeJob
        ? "bg-gray-50 shadow-md border-b-2 border-[#7263f3]"
        : "bg-white"
    }`}>
      <div className="flex justify-between">
        <div
          className="group flex gap-1 items-center cursor-pointer"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
            <Image
              src={profilePicture || "/user.png"}
              alt={name || "User"}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="group-hover:underline font-bold">{title}</h4>
            <p className="text-xs">
              {name}: {applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>
          </div>
        </div>

        <button
          className={`text-2xl ${
            isLiked ? "text-[#7263f3]" : "text-gray-400"
          } `}
          onClick={() => {
            isAuthenticated
              ? handleLike(job._id)
              : router.push("https://jobfinder-31ca.onrender.com/login");
          }}
        >
          {isLiked ? bookmark  : bookmarkEmpty}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {jobType.map((type, index) => (
          <span
            key={index}
            className={`py-1 px-3 text-xs font-medium rounded-md border ${jobTypeBg(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      <p>
        {companyDescription.length > 100
          ? `${companyDescription.substring(0, 100)}...`
          : companyDescription}
      </p>

      <Separator />

      <div className="flex justify-between items-center gap-6">
        <p>
          <span className="font-bold">{formatMoney( salary, "GBP")}</span>
          <span className="font-medium text-gray-400 text-lg">
            /
            {salaryType === "Yearly"
              ? "pa"
              : salaryType === "Monthly"
              ? "pcm"
              : salaryType === "Weekly"
              ? "pw"
              : "ph"}
          </span>
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-lg">
            <Calendar size={16} />
          </span>
          Posted: {formatDates(createdAt)}
        </p>
      </div>
    </div>
  )
}

export default JobCard
