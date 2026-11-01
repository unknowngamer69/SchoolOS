"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { initialSchoolData, isSchoolData, type SchoolData } from "@/lib/school/school-data";
