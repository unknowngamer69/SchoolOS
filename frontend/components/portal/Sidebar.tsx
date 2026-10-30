"use ckient"
import { Button } from "../ui/button"
import { BookOpen, Building2, GraduationCap, LayoutDashboard, User2, UserCheck, UserCircle } from "lucide-react"
import Link from "next/link"

export default function Sidebar(){
    return (
        <div className="bg-[#fdfcf9] h-full w-[310px] hidden md:block border-r"> 
         <div className="flex gap-3 items-center  mr-5 p-4">
      <div className="text-center p-2 px-4  bg-black rounded-md text-white">S</div>
      <div className="">
        <h1>SchoolOs</h1>
        <p className="text-xs">Campus Operationals Portal</p>
      </div>
        </div>
       
            <div className="m-5">
                <p className="text-xs tracking-wider mb-2 text-zinc-700">OVERVIEW</p>
                <div className="gap-2">
                    <Link href={"/liveportal"}>
                    <Button variant={"selected"} className="flex justify-start gap-2 items-center px-5 bg-black w-full">
                            <LayoutDashboard />
                            Dashboard
                    </Button>
                    </Link>
                    <p className="text-xs tracking-wider mt-5 text-zinc-700">ACADEMIC STRUCTURE</p>
                    <div className="gap-5">
                        <Link href="/liveportal/session">
                    <Button variant={"ghost"} className="flex justify-around items-center px-5 cursor-pointer">
                            <Building2 />
                            session and Terms
                    </Button> 
                    </Link>

                    <Link href="/liveportal/classes">
                    <Button variant={"ghost"} className="flex justify-around items-center px-5 cursor-pointer">
                            <GraduationCap />
                           Classes & Arms
                    </Button> 
                    </Link>
                       <Link href="/liveportal/subject">
                    <Button variant={"ghost"} className="flex justify-around items-center px-5 cursor-pointer">
                            <BookOpen />
                           Subjects
                    </Button> 
                    </Link>
                      <Link href="/liveportal/teacher">
                    <Button variant={"ghost"} className="flex justify-around items-center px-5 cursor-pointer">
                            <UserCheck />
                           Teacher Assignments
                    </Button> 
                    </Link>
                    </div>
                     <p className="text-xs tracking-wider mt-5 text-zinc-700">PEOPLE</p>
                    <div className="gap-5">
                        <Link href="/liveportal/people">
                    <Button variant={"ghost"} className="flex justify-around items-center px-5 cursor-pointer">
                        <User2 />
                        Students
                    </Button> 
                    </Link>

                    </div>
                </div>
                <div className="flex absolute bottom-0 p-2 gap-3 items-center jusrify-start self-start">
                    <UserCircle size={35}/>
                    <div className="text-xs">
                        <p className="font-bold ">Dr. Authur Dance</p>
                        <span className="text-[10px] text-zinc-500">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}