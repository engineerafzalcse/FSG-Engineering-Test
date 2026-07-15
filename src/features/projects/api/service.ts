// ============================================================
// Project Service — Data Access Layer
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
//    → return apiClient<ProjectsResponse>('/projects?...')
//    → Replace mock calls in route handlers (src/app/api/projects/) with ORM
//
// 3. BFF — Route Handlers proxy to external backend (Laravel, Go, etc.)
//    → import { apiClient } from '@/lib/api-client'
//    → return apiClient<ProjectsResponse>('/projects?...')
//    → Route handlers proxy requests to your external backend service
//
// 4. Direct external API (frontend-only, no Next.js backend)
//    → const res = await fetch('https://your-api.com/projects?...')
//    → return res.json()
//
// Current: Mock (in-memory fake data for demo/prototyping)
// ============================================================

import { fakeProjects } from '@/constants/mock-api-projects';
import type {
  ProjectFilters,
  ProjectsResponse,
  ProjectByIdResponse,
  ProjectMutationPayload
} from './types';

export async function getProjects(filters: ProjectFilters): Promise<ProjectsResponse> {
  return fakeProjects.getProjects(filters);
}

export async function getProjectById(id: number): Promise<ProjectByIdResponse> {
  return fakeProjects.getProjectById(id);
}

export async function createProject(data: ProjectMutationPayload) {
  return fakeProjects.createProject(data);
}

export async function updateProject(id: number, data: ProjectMutationPayload) {
  return fakeProjects.updateProject(id, data);
}

export async function deleteProject(id: number) {
  return fakeProjects.deleteProject(id);
}
