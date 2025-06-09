"use client";
import Link from 'next/link';
import Header from '@/Components/Header';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/Components/ui/card';
import {Briefcase,Building , CheckCircleIcon, SearchIcon, Users,} from "lucide-react";
import { Badge } from '@/Components/ui/badge';
import { CardHeader } from '@/Components/ui/card';
import Footer from '@/Components/Footer';
export default function Home() {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#7263f3]" />,
      title: "Diverse Opportunities",
      description:
        "Access thousands of job listings across various industries and experience levels.",
      benefits: [
        "100,000+ active job listings",
        "50+ job categories",
        "Remote and on-site options",
      ],
      cta: "Explore Jobs",
      ctaLink: "/findwork",
    },
    {
      icon: <Building className="w-6 h-6 text-[#7263f3]" />,
      title: "Top Companies",
      description:
        "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
      benefits: [
        "500+ verified employers",
        "Exclusive partnerships",
        "Direct application process",
      ],
      cta: "View Companies",
      ctaLink: "/findwork",
    },
    {
      icon: <Users className="w-6 h-6 text-[#7263f3]" />,
      title: "Talent Pool",
      description:
        "Employers can access a diverse pool of qualified candidates for their open positions.",
      benefits: [
        "1M+ registered job seekers",
        "Advanced search filters",
        "AI-powered matching",
      ],
      cta: "Post a Job",
      ctaLink: "/post",
    },
  ];
  return (
    <main>
      <Header/>
      <section className='py-20 bg-gradient-to-b from-[#D7DEDC] to-[#7263f3]/5 text-primary-foreground'>
        <div className='container mx-auto px-4 text-center text-black'></div>
        <h1 className='text-4xl text-[#7263f3] font-bold mb-6 text-center'>
          Find Your Dream Job or Perfect Candidate
      </h1>
      <p className='text-xl mb-8 text-center'>
        Connect with thousands of employers and job seekers on our platform.
      </p>
      <div className='max-w-2xl mx-auto flex gap-4'>
        <Input
          type="text"
          placeholder="Job title or keyword"
          className='flex-grow bg-white text-black'
          />
          <Button className='bg-[#7263f3] text-white hover:bg-black'>
            <SearchIcon className='w-6 h-6'/>
            Search Jobs</Button>
      </div>
      </section>
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Why Choose{" "}
            <span className='text-[#7263f3]'>JobFinder</span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {
              features.map((feature, index) => (
                <Card key={index} 
                className='flex flex-col h-full rounded-xl border-none'>
                  <CardHeader>
                    <div className='w-12 h-12 flex items-center justify-center mb-4 bg-[#7263f3]/10 rounded-full'>
                      {feature.icon}
                    </div>
                    <CardTitle className='text-xl mb-2'>{feature.title}</CardTitle>
                     <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <ul className='space-y-2'>
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className='flex items-center'>
                          <CheckCircleIcon className='w-5 h-5  text-green-500 mr-2 flex-shrink-0 mt-0.5'/>  
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className='w-full bg-[#7263f3] hover:bg-black text-white'>
                      <Link href={feature.ctaLink}>{feature.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            <div className='mt-12 text-center'>
              <Badge 
              variant={"outline"} 
              className='text-sm font-medium border-gray-400 '>
              Trusted by 10,000+ companies worldwide
              </Badge>
            </div>
          </div>
        </div>
      </section>
      <section className='py-[7rem] bg-[#d7dedc]'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-8'>Ready to Get Started?</h2>
          <div className='flex flex-col md:flex-row justify-center gap-4'>
              <Button size={"lg"} variant={"outline"} asChild className='bg-black text-white'>
                <Link href="/findwork">Find Work</Link>
              </Button>
              <Button size={"lg"} variant={"outline"} asChild className='bg-white text-black' >
                <Link href="/post">Post a Job</Link>
              </Button>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
