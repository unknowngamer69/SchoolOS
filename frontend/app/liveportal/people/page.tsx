"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Ellipsis, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function People() {
  const data = [
    {
      code: "ARA/2023/048",
      name: "Chukwu, Oluwaseun David",
      genderDob: "Male • DOB: 14 Apr 2011",
      classroom: "JSS 2 Gold",
      loginEmail: "student@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Dr. Emeka Chukwu",
      status: "Active",
    },
    {
      code: "ARA/2023/049",
      name: "Bello, Fatima Zahra",
      genderDob: "Female • DOB: 22 Aug 2012",
      classroom: "JSS 1 Diamond",
      loginEmail: "fatima.bello@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Alhaji Kabir Bello",
      status: "Active",
    },
    {
      code: "ARA/2023/050",
      name: "Okafor, Chinedu Emmanuel",
      genderDob: "Male • DOB: 03 Nov 2010",
      classroom: "JSS 3 Gold",
      loginEmail: "chinedu.o@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Mrs. Nneka Okafor",
      status: "Active",
    },
    {
      code: "ARA/2023/051",
      name: "Adeyemi, Folake Mary",
      genderDob: "Female • DOB: 18 Jan 2009",
      classroom: "SSS 1 Science",
      loginEmail: "folake.a@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Chief Tunde Adeyemi",
      status: "Active",
    },
    {
      code: "ARA/2023/052",
      name: "Danjuma, Ibrahim Sani",
      genderDob: "Male • DOB: 09 May 2011",
      classroom: "JSS 2 Diamond",
      loginEmail: "ibrahim.d@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Mallam Sani Danjuma",
      status: "Suspended",
    },
    {
      code: "ARA/2022/012",
      name: "Sowore, Temitope Samuel",
      genderDob: "Male • DOB: 15 Dec 2008",
      classroom: "SSS 2 Arts",
      loginEmail: "temitope.s@apexroyal.sch.ng",
      passwordHint: "Password: ••••••••",
      guardian: "Engr. Olufemi Sowore",
      status: "Archived",
    },
  ]

  return (
    <div className="p-8 w-full">
      <div className="text-xs text-zinc-500 mb-3">
        Academia <span className="mx-1">&gt;</span> Admin <span className="mx-1">&gt;</span>{" "}
        <span className="text-zinc-900 font-medium">Students &amp; Enrollment</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-zinc-900 text-2xl font-bold tracking-tight">
            Student Enrollment Register
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Comprehensive official student records, biological information, parent linkages, and portal login credentials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-md bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-1" /> Enroll Student
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[380px]">
          <Search className="absolute left-3 top-1 h-4 w-4 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search students by name or admission no..."
            className="pl-9 bg-white border-zinc-300 focus-visible:ring-zinc-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span className="text-zinc-500 text-xs font-medium">Class:</span>
            <select className="px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-xs font-medium text-zinc-800 shadow-2xs focus:outline-hidden cursor-pointer">
              <option value="">All Classes</option>
              <option value="JSS 1 Gold">JSS 1 Gold</option>
              <option value="JSS 2 Gold">JSS 2 Gold</option>
              <option value="SSS 1 Science">SSS 1 Science</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span className="text-zinc-500 text-xs font-medium">Status:</span>
            <select className="px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-xs font-medium text-zinc-800 shadow-2xs focus:outline-hidden cursor-pointer">
              <option value="">All Students</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-12 bg-emerald-50/40 px-6 py-3 border-b border-zinc-200 text-xs font-semibold text-emerald-800/80 tracking-wider">
          <div className="col-span-2">ADM NO</div>
          <div className="col-span-3">STUDENT NAME</div>
          <div className="col-span-2">CLASSROOM</div>
          <div className="col-span-2">PORTAL ACCOUNT</div>
          <div className="col-span-1">GUARDIAN</div>
          <div className="col-span-1 text-center">STATUS</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        <div className="divide-y divide-zinc-200">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-50/80 transition-colors"
            >
              <div className="col-span-2">
                <span className="inline-block px-2 py-1 bg-zinc-100 border border-zinc-200 text-zinc-800 rounded text-xs font-mono font-bold">
                  {item.code}
                </span>
              </div>

              <div className="col-span-3 flex flex-col pr-2">
                <span className="font-semibold text-xs text-zinc-900">{item.name}</span>
                <span className="font-normal text-[11px] text-zinc-500 mt-0.5">{item.genderDob}</span>
              </div>

              <div className="col-span-2 pr-2">
                <span className="inline-block px-2 py-0.5 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded text-[13px] font-medium">
                  {item.classroom}
                </span>
              </div>

              <div className="col-span-2 flex flex-col pr-2">
                <span className="font-medium text-xs text-zinc-800 truncate">{item.loginEmail}</span>
                <span className="font-normal text-[11px] text-zinc-400 mt-0.5">{item.passwordHint}</span>
              </div>

              <div className="col-span-1 flex flex-col pr-1">
                <span className="font-medium text-xs text-zinc-800 truncate">{item.guardian}</span>
              </div>

              <div className="col-span-1 flex justify-center">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === "Active"
                      ? "bg-emerald-800 text-white"
                      : item.status === "Suspended"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="col-span-1 flex justify-end">
                <button className="w-8 h-8 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Ellipsis className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <p className="text-zinc-500 text-xs">
          Showing 1 to {data.length} of {data.length} records
        </p>
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
  )
}