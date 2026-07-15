// ============================================================
// Employee Service — Data Access Layer
// ============================================================
// This is the ONLY file you modify when connecting to your backend.
// Queries (queries.ts) and components import from here — they never change.
//
// Pick your pattern and replace the function bodies below:
//
// 1. Server Actions + ORM (Prisma / Drizzle / Supabase)
//    → Add 'use server' at the top of this file
//    → Call your ORM directly in each function
//
// 2. Route Handlers + ORM
//    → import { apiClient } from '@/lib/api-client'
//    → return apiClient<EmployeesResponse>('/employees?...')
//    → Replace mock calls in route handlers (src/app/api/employees/) with ORM
//
// 3. BFF — Route Handlers proxy to external backend (Laravel, Go, etc.)
//    → import { apiClient } from '@/lib/api-client'
//    → return apiClient<EmployeesResponse>('/employees?...')
//    → Route handlers proxy requests to your external backend service
//
// 4. Direct external API (frontend-only, no Next.js backend)
//    → const res = await fetch('https://your-api.com/employees?...')
//    → return res.json()
//
// Current: Mock (in-memory fake data for demo/prototyping)
// ============================================================

import { fakeEmployees } from '@/constants/mock-api-employees';
import type { EmployeeFilters, EmployeesResponse, EmployeeMutationPayload } from './types';

export async function getEmployees(filters: EmployeeFilters): Promise<EmployeesResponse> {
  return fakeEmployees.getEmployees(filters);
}

export async function createEmployee(data: EmployeeMutationPayload) {
  return fakeEmployees.createEmployee(data);
}

export async function updateEmployee(id: number, data: EmployeeMutationPayload) {
  return fakeEmployees.updateEmployee(id, data);
}

export async function deleteEmployee(id: number) {
  return fakeEmployees.deleteEmployee(id);
}
