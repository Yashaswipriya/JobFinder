interface Job{
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    salaryType: "Yearly" | "Monthly" | "Weekly" |"Hourly";
    jobType: string[];
    negotiable: boolean;
    tags: string[];
    likes: string[];
    skills: string[];
    applicants: string[];
    createdBy:{
        profilePicture: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};
export type {Job}