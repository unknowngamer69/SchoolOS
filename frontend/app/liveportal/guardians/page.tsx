"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Ellipsis, Mail, Phone, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Guardians() {
  const data = [
    {
      name: "Chukwu, Emeka",
      subName: "Consultant Radiologist",
      contact: "+234 803 123 4567",
      relationship: "Father",
      email: "parent@apexroyal.sch.ng",
      wards: "Oluwaseun Chukwu (JSS 2)",
      wards2: "Chioma (SSS 1 Science)",

    },
    {
      name: "Bello, Kabir",
      subName: "Senior Civil Engineer",
      contact: "+234 802 987 6543",
      relationship: "Father",
      email: "kabir.bello@gmail.com",
      wards: "Fatima Bello (JSS 1)",
    },
    {
      name: "Okafor, Nneka",
      subName: "Chartered Accountant",
      contact: "+234 809 456 7890",
      relationship: "Mother",
      email: "nneka.okafor@yahoo.com",
      wards: "Chinedu Okafor (JSS 3)",
    },
      {
      name: "Abubakar, Zainab",
      subName: "Legal Practitioner",
      contact: "+234 818 902 3311",
      relationship: "Aunt",
      email: "z.abubakar@hotmail.com",
      wards: "Bilal (JSS 2 Gold)",
    },
  ]

  return (
    <div className="p-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-zinc-900 text-2xl font-bold tracking-tight">
            Parents &amp; Guardians Directory
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Maintain emergency contact numbers, email addresses, and ward associations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-md bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-1" /> Add Guardian
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[380px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search guardian by name or phone..."
            className="pl-9 bg-white border-zinc-300 focus-visible:ring-zinc-400"
          />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-12 bg-emerald-50/40 px-6 py-3 border-b border-zinc-200 text-xs font-semibold text-emerald-800/80 tracking-wider">
          <div className="col-span-3">GUARDIAN NAME</div>
          <div className="col-span-2">RELATIONSHIP</div>
          <div className="col-span-3">CONTACT INFO</div>
          <div className="col-span-3">LINKED WARDS</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        <div className="divide-y divide-zinc-200">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-50/80 transition-colors"
            >
              <div className="col-span-3 flex flex-col pr-2">
                <span className="font-semibold text-xs text-zinc-900">{item.name}</span>
                <span className="font-normal text-[11px] text-zinc-500 mt-0.5">{item.subName}</span>
              </div>

              <div className="col-span-2">
                <span className="inline-block px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-black-800 rounded-md text-xs font-semibold">
                  {item.relationship}
                </span>
              </div>

              <div className="col-span-3 flex flex-col gap-1 pr-2">
                <span className="text-zinc-700 text-xs flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  {item.contact}
                </span>
                <span className="text-zinc-700 text-xs flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  {item.email}
                </span>
              </div>

              <div className="col-span-3 pr-2">
                <span className="inline-block px-2 py-0.5 text-zinc-700 border border-zinc-200 rounded text-[11px] font-medium">
                  {item.wards}
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