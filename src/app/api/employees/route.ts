// ============================================================
// Route Handler — Employees (list + create)
// ============================================================
// Used with Pattern 2 (Route Handlers + ORM) or Pattern 3 (BFF).
//
// Fullstack (ORM): Replace fakeEmployees calls with your ORM
//   const employees = await db.query.employees.findMany({ ... })
//
// BFF (proxy): Replace with fetch to your external backend
//   const res = await fetch(`${BACKEND_URL}/employees?${searchParams}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   return NextResponse.json(await res.json())
//
// Current: Mock (in-memory fake data for demo/prototyping)
// ============================================================

import { fakeEmployees } from '@/constants/mock-api-employees';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 10);
  const roles = searchParams.get('roles') ?? undefined;
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const data = await fakeEmployees.getEmployees({
    page,
    limit,
    roles,
    search,
    sort
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = await fakeEmployees.createEmployee(body);
  return NextResponse.json(data, { status: 201 });
}
