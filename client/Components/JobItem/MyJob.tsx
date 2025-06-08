"use client";
import { useJobContext } from '@/context/jobsContext';
import { Job } from '@/types/types';
import React from 'react'
import Image from 'next/image';
import { CardTitle } from '../ui/card';
import { formatDates } from '@/utils/formatDates';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface JobProps{
    job: Job;
}
function MyJob({job} : JobProps) {
    const {deleteJob} = useJobContext();
    const router = useRouter();
  return (
    <div className='p-6 bg-white rounded-xl flex flex-col gap-5'>
      <div className="flex items-center soace-x-4 mb-2 cursor-pointer"
      onClick={() => router.push(`/job/${job._id}`)}
      >
       <div className='flex gap-4'>
         <Image
        alt={`logo`}
        src={job.createdBy.profilePicture || "/user.png"}
        width = {48}
        height={48}
        className="rounded-full"
        />
        <div>
            <CardTitle className='text-xl font-bold truncate'>
                {job.title}
            </CardTitle>
            <p className='text-sm text-muted-foreground'>{job.createdBy.name}</p>
            </div>
      </div>
       </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.createdAt)}
          </p>
          <div className='flex justify-between'>
            <div>
                <div className='flex flex-wrap gap-2 mb-4'>
                    {job.skills.map((skill, index) =>(
                        <Badge key={index} variant = 'secondary'>
                            {skill}
                        </Badge>
                    ))}
                </div>
                 <div className='flex flex-wrap gap-2 mb-4'>
                    {job.tags.map((tag, index) =>(
                        <Badge key={index} variant = 'outline'>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className='self-end flex items-center gap-2'>
                    <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500">
                        <Pencil size={14}/>
                    </Button>
                    <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() =>deleteJob(job._id)}>
                        <Trash size={14}/>
                    </Button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MyJob
