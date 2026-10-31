"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Contact, Ellipsis, Mail, Phone, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Staff() {
  const data = [
    {
      code: "STF/2021/014",
      name: "Adeyemi, Folashade",
      genderDob: "Senior Mathematics Mistrcategory",
      category: "Teaching",
      academic: "B.Sc. Ed Mathematics (Unilag)",
      status: "Active",
      contact: "+234 802 119 4432",
      email: "teacher@apexroyal.sch.ng"
    },
    
  
  
  ]

  return (
    <div className="p-8 w-full">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
            <h1 className="text-zinc-900 text-2xl font-bold">Staff Directory</h1>
            <p className="text-zinc-500 text-sm mt-1">Comprehensive roster of teaching faculty, subject heads, and administrative personnel.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button>
                <Plus className="w-4 h-4 mr-1"/> Add Staff Member
            </Button>
        </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-[380px]">
            <Search className="absolute left-3 top-1 h-4 w-4 text-zinc-400"/>
            <input 
            type="search" 
            placeholder="Search by staff name or designation..."
            className="pl-9 bg-white border-black focus-visible:ring-black"
            />
        </div>

        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="text-zinc-500 text-xs font-medium">Category</span>
                <select name="" id=""  className="px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-xs font-medium text-zinc-800 shadow-2xs focus:outline-hidden cursor-pointer">
                    <option value="">All Categories</option>
                    <option value="">Teaching</option>
                    <option value="">Non-Teaching</option>
                </select>

            </div>

        <div className="flex items-center gap-2 text-zinc-600">
            <span className="text-zinc-500 text-xs font-medium ">Status</span>
            <select name="" id=""  className="px-3 py-1.5 bg-white border border-zinc-300 rounded-md text-xs font-medium text-zinc-800 shadow-2xs focus:outline-hidden cursor-pointer">
                <option value="">All Statuses</option>
                <option value="">Active</option>
                <option value="">On Leave</option>
                <option value="">Terminated</option>
            </select>
        </div>
        </div>

    </div>

        <div className="w-full bg-white rounded-lg border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="grid grid-cols-12 items-center bg-emerald-50/40 px-6 py-1 border-b border-zinc-200 text-xs font-semibold text-zinc-500/80 tracking-wider">
                <div className="col-span-1">STAFF ID </div>
                <div className="col-span-2 pl-10">STAFF NAME &amp; DESIGNATION</div>
                <div className="col-span-1 pl-4">CATEGORY</div>
                <div className="col-span-3 pl-15">ACADEMIC CREDENTIALS</div>
                <div className="col-span-1 pl-10">CONTACT</div>
                <div className="col-span-1 pl-10 ">STATUS</div>
                <div className="col-span-1 pl-10 ">ACTIONS</div>
            </div>

            <div className="divide-y divide-zinc-200">
                {data.map((item, index) => (
                    <div 
                      key={index}
                      className="grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-50/80 transition-colors"
                    >
                        <div className="col-span-1">
                          <span className="inline-block text-zinc-800 rounded text-[15px] font-semibold whitespace-nowrap">
                            {item.code}
                          </span>                        
                        </div>
                            
                            <div className="col-span-2 pl-10 flex flex-col">
                               <span className="font-semibold text-[14px] text-zinc-900">{item.name}</span>
                               <span className="font-normal text-[10px] text-zinc-500 mt-0.5">{item.genderDob}</span>
                            </div>

                            <div className="col-span-2 pl-4">
                                <span className="inline-block px-2 py-0.5 text-white bg-black/80 rounded text-[13px] font-medium">
                                {item.category}
                                </span>
                            </div>

                            <div className="col-span-3">
                                <span className="text-zinc-500 text-xs">{item.academic}</span>
                            </div>

                                <div className="col-span-1 flex flex-col gap-1 pr-2">
                                <span className="text-zinc-700 text-[10px] flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                {item.contact}
                                </span>
                                <span className="text-zinc-700 text-[10px] flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                {item.email}
                                </span>
                            </div>

                           <div className="col-span-1 flex justify-center">
                                <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                    item.status === "Active"
                                    ? "bg-emerald-800 text-white"
                                    : item.status === "Non-Teaching"
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
    </div>
  )
}