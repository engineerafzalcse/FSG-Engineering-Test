// ============================================================
// Route Handler — Single Employee (update + delete)
// ============================================================
// See src/app/api/employees/route.ts for pattern documentation.
// ============================================================

import { fakeEmployees } from '@/constants/mock-api-employees';
import { NextRequest, NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const data = await fakeEmployees.updateEmployee(Number(id), body);

  if (!data.success) {
    return NextResponse.json(data, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const data = await fakeEmployees.deleteEmployee(Number(id));

  if (!data.success) {
    return NextResponse.json(data, { status: 404 });
  }

  return NextResponse.json(data);
}
