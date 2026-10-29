"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Ellipsis, ChevronRight, ChevronLeft, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Session() {
  const [activeTab, setActiveTab] = useState("Academic Sessions")

  const sessionsData = [
    {
      year: "2023/2024 Academic Year",
      startDate: "11 Sept 2023",
      endDate: "19 Jul 2024",
      status: "Archived / Inactive",
      Actions: <Ellipsis className="w-4 h-4"/>
    },
    {
      year: "2024/2025 Academic Year",
      startDate: "9 Sept 2024",
      endDate: "18 Jul 2025",
      status: "Current Active Session",
      Actions: <Ellipsis className="w-4 h-4"/>
    },
  ]

  const termsData = [
    {
      year: "First Term (2024/2025)",
      startDate: "9 Sept 2024",
      endDate: "15 Dec 2024",
      status: "Completed",
      Actions: <Ellipsis className="w-4 h-4"/>
    },
    {
      year: "Second Term (2024/2025)",
      startDate: "6 Jan 2025",
      endDate: "10 Apr 2025",
      status: "Current Active Term",
      Actions: <Ellipsis className="w-4 h-4"/>
    },
    {
      year: "Third Term (2024/2025)",
      startDate: "28 Apr 2025",
      endDate: "18 Jul 2025",
      status: "Upcoming",
      Actions: <Ellipsis className="w-4 h-4"/>
    },
  ]

  // Pick the data array based on active tab state
  const currentData = activeTab === "Academic Sessions" ? sessionsData : termsData

  return (
    <div className="p-10">
      <div className="md:flex gap-4 rounded-md justify-between relative isolate mb-3">
        <div>
          <h1 className="text-black text-2xl font-semibold">
            Sessions & Academic Terms
          </h1>
          <p className="text-xs text-gray-500">
            Configure academic years, resumption schedules and define the active institutional term
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-sm cursor-pointer"> <Plus /> New session</Button>
          <Button variant="ghost" className="rounded-sm border border-black cursor-pointer"> <Plus /> New Term</Button>
        </div>
      </div>

      {/* Tab Switcher Buttons */}
      <div className="flex gap-1 bg-zinc-200 p-1 w-[400px] rounded-md">
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab("Academic Sessions")}
          className={`flex-1 rounded-sm text-xs font-medium h-8 cursor-pointer ${
            activeTab === "Academic Sessions" 
              ? "bg-white text-black shadow-xs" 
              : "text-zinc-600 hover:text-black"
          }`}
        >
          Academic Sessions ({sessionsData.length})
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab("School Terms")}
          className={`flex-1 rounded-sm text-xs font-medium h-8 cursor-pointer ${
            activeTab === "School Terms" 
              ? "bg-white text-black shadow-xs" 
              : "text-zinc-600 hover:text-black"
          }`}
        >
          School Terms ({termsData.length})
        </Button>
      </div>

      <Input type="search" placeholder={`Search ${activeTab} (e.g. 2024/2025)...`} className="my-5 w-[400px]"/>

      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
          <div className="grid grid-cols-12 bg-white px-6 py-3 border-b border-zinc-200 text-xs font-semibold text-emerald-800/80 tracking-wider">
            <div className="col-span-4">{activeTab === "Academic Sessions" ? "Session Name" : "Term Name"}</div>
            <div className="col-span-3">Start Date</div>
            <div className="col-span-3">End Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-zinc-200">
            {currentData.map((item, index) => (
              <div key={index} className="grid grid-cols-12 items-center px-6 py-5 hover:bg-zinc-50/80 transition-colors">
                <div className="col-span-4 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-zinc-600"/>
                  <span className="text-xs font-medium text-zinc-800">{item.year}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs text-zinc-600">{item.startDate}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs text-zinc-600">{item.endDate}</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                    {item.Actions}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 bg-zinc-300 p-2 w-[400px] rounded-md">
            <Button variant="ghost">Academic Sessions (2)</Button>
            <Button variant="secondary">School Terms (3)</Button>
        </div>

        <div className="flex my-5 w-[400px] border items-center rounded-md">
            <Button variant="ghost">
            <Search className="text-zinc-400 text-xs"/>
            </Button>
            <Input type="search" placeholder="Search Sessions (e.g. 2024/2025)..." className=" w-full border-0 hover:border-0"/>
        </div>
        <div className="">
            <div className="">
                <div className="grid grid-cols-5 text-zinc-400 ">
                    <p>SESSION NAME </p>
                    <p>START DATE</p>
                    <p>END DATE</p>
                    <p>STATUS</p>
                    <p>ACTIONS</p>
                </div>
                <div className="grid grid-cols-5 ">
                    <div className=" flex gap-2 items-center w-[400px]">
                        <Calendar size="10px" />
                    <p className="semibold">2023/2024 Academic Year</p>
                    </div>
                    <p className="w-[300px]">11 sept 2023</p>
                    <p className="w-[300px]">9 sept 2024</p>
                    <p className="w-[300px]">archived/inactive</p>
                    <button className="mr-0 w-[200px]">
                        <Ellipsis />
                    </button>
                    <p></p>
                </div>
                <div className="grid grid-cols-5 ">
                    <div className=" flex gap-2 items-center w-[400px]">
                        <Calendar size="10px" />
                    <p className="semibold">2023/2024 Academic Year</p>
                    </div>
                    <p className="w-[300px]">11 sept 2023</p>
                    <p className="w-[300px]">9 sept 2024</p>
                    <p className="w-[300px]">archived/inactive</p>
                    <button className="mr-0 w-[200px]">
                        <Ellipsis />
                    </button>
                    <p></p>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-zinc-500 text-xs">Showing 1 to {currentData.length} of {currentData.length} records</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-300 disabled:opacity-40" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-zinc-600 font-medium text-xs">Page 1 of 1</span>
            <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-300 disabled:opacity-40" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}