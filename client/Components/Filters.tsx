"use client";
import React from 'react'
import { Button } from './ui/button'
import { useJobContext } from '@/context/jobsContext';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import formatMoney from '@/utils/formatMoney';

function Filters() {
    const {searchJobs,
           handleFilterChange,
           filters,
           setFilters,
           minSalary,
           maxSalary,
           setMinSalary,
           setMaxSalary,
           setSearchQuery,
    } = useJobContext();

    const clearAllFilters = () => {
        setFilters({
            fullTime: false,
            partTime: false,
            contract: false,
            internship: false,
            devOps: false,
            backend: false,
            uiux: false,
            fullStack: false,
        });

        setSearchQuery({tags:"", location:"", title:""});
    };

    const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);
    if (value[0] > maxSalary) {
      setMaxSalary(value[0]);
    }
  };

  const handleMaxSalaryChange = (value: number[]) => {
    setMaxSalary(value[0]);
    if (value[0] < minSalary) {
      setMinSalary(value[0]);
    }
  };

  return (
    <div className='max-w-[18rem] pr-4 space-y-6'>
      <div className='space-y-2'>
        <div className='flex items-center w-full justify-between gap-8'>
            <h2 className='text-lg font-semibold'>Job Type</h2>
            <Button
            variant={"ghost"}
            className='text-sm font-medium h-auto p-0 text-red-500 hover:text-red-700 leading-none' 
            onClick={()=>{
                clearAllFilters();
                searchJobs();
            }}
            >
            Clear All
           </Button>
        </div>
        <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
                <Checkbox 
                id="fullTime"
                checked={filters.fullTime}
                onCheckedChange={() => handleFilterChange("fullTime")}
                />
                <Label htmlFor="fullTime">Full Time</Label>
            </div>
            <div className="flex items-center space-x-2">
            <Checkbox
              id="partTime"
               checked={filters.partTime}
               onCheckedChange={() => handleFilterChange("partTime")}
            />
            <Label htmlFor="partTime">Part Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
               checked={filters.contract}
               onCheckedChange={() => handleFilterChange("contract")}
            />
            <Label htmlFor="contract">Contract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internship"
               checked={filters.internship}
               onCheckedChange={() => handleFilterChange("internship")}
            />
            <Label htmlFor="internship">Internship</Label>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-lg font-semibold mb-4'>Tags</h2>
         <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullStack"
              checked={filters.fullStack}
              onCheckedChange={() => handleFilterChange("fullStack")}
            />
            <Label htmlFor="fullStack">FullStack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backend"
              checked={filters.backend}
              onCheckedChange={() => handleFilterChange("backend")}
            />
            <Label htmlFor="backend">Backend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="devOps"
              checked={filters.devOps}
              onCheckedChange={() => handleFilterChange("devOps")}
            />
            <Label htmlFor="devOps">DevOps</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="uiUx"
              checked={filters.uiUx}
              onCheckedChange={() => handleFilterChange("uiUx")}
            />
            <Label htmlFor="uiUx">UI/UX</Label>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-lg font-semibold mb-4'>Salary Range</h2>
        <div className='flex flex-col gap-4'>
            <Label htmlFor="minSalary">Minimum Salary</Label>
            <Slider 
            id="minSalary"
            min={0}
            max={5000000}
            step={50}
            value={[minSalary]}
            onValueChange={handleMinSalaryChange}
            className='w-full'
            />
            <span className='text-sm text-gray-500'>
                {formatMoney(minSalary,"GBP")}</span>
        </div>
         <div className='flex flex-col gap-4'>
            <Label htmlFor="maxSalary">Maximum Salary</Label>
            <Slider 
            id="maxSalary"
            min={0}
            max={5000000}
            step={50}
            value={[maxSalary]}
            onValueChange={handleMaxSalaryChange}
            className='w-full'
            />
            <span className='text-sm text-gray-500'>
                {formatMoney(maxSalary,"GBP")}</span>
        </div>
      </div>
    </div>
  )
}

export default Filters
