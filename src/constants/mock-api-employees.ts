////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';

faker.seed(2042);

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  created_at: string;
  updated_at: string;
};

function generateRandomEmployeeData(id: number): Employee {
  const roles = [
    'Frontend Engineer',
    'Backend Engineer',
    'Product Designer',
    'QA Engineer',
    'Project Manager',
    'Engineering Lead'
  ];
  const statuses = ['Active', 'On Leave', 'Inactive'];

  return {
    id,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    status: faker.helpers.arrayElement(statuses),
    role: faker.helpers.arrayElement(roles),
    created_at: faker.date.between({ from: '2022-01-01', to: '2023-12-31' }).toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}

// Mock employee data store
export const fakeEmployees = {
  records: [] as Employee[],

  initialize() {
    const sampleEmployees: Employee[] = [];
    for (let i = 1; i <= 50; i++) {
      sampleEmployees.push(generateRandomEmployeeData(i));
    }

    this.records = sampleEmployees;
  },

  async getAll({ roles = [], search }: { roles?: string[]; search?: string }) {
    let employees = [...this.records];

    if (roles.length > 0) {
      employees = employees.filter((employee) => roles.includes(employee.role));
    }

    if (search) {
      employees = matchSorter(employees, search, {
        keys: ['first_name', 'last_name', 'email']
      });
    }

    return employees;
  },

  async createEmployee(data: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) {
    await delay(200);

    const newEmployee: Employee = {
      ...data,
      id: Math.max(0, ...this.records.map((employee) => employee.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.records.push(newEmployee);

    return {
      success: true,
      message: 'Employee created successfully',
      employee: newEmployee
    };
  },

  async updateEmployee(id: number, data: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) {
    await delay(200);

    const index = this.records.findIndex((employee) => employee.id === id);

    if (index === -1) {
      return { success: false, message: `Employee with ID ${id} not found` };
    }

    this.records[index] = {
      ...this.records[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Employee updated successfully',
      employee: this.records[index]
    };
  },

  async deleteEmployee(id: number) {
    await delay(200);

    const index = this.records.findIndex((employee) => employee.id === id);

    if (index === -1) {
      return { success: false, message: `Employee with ID ${id} not found` };
    }

    this.records.splice(index, 1);

    return {
      success: true,
      message: 'Employee deleted successfully'
    };
  },

  async getEmployees({
    page = 1,
    limit = 10,
    roles,
    search,
    sort
  }: {
    page?: number;
    limit?: number;
    roles?: string | string[];
    search?: string;
    sort?: string;
  }) {
    await delay(150);
    const rolesArray = roles ? (Array.isArray(roles) ? roles : String(roles).split(/[.,]/)) : [];
    const allEmployees = await this.getAll({
      roles: rolesArray,
      search
    });

    // Sorting
    if (sort) {
      try {
        const sortItems = JSON.parse(sort) as {
          id: string;
          desc: boolean;
        }[];
        if (sortItems.length > 0) {
          const { id, desc } = sortItems[0];
          allEmployees.sort((a, b) => {
            // Handle computed 'name' column
            const aVal =
              id === 'name' ? `${a.first_name} ${a.last_name}` : (a as Record<string, unknown>)[id];
            const bVal =
              id === 'name' ? `${b.first_name} ${b.last_name}` : (b as Record<string, unknown>)[id];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
              return desc ? bVal - aVal : aVal - bVal;
            }
            const aStr = String(aVal ?? '').toLowerCase();
            const bStr = String(bVal ?? '').toLowerCase();
            return desc ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
          });
        }
      } catch {
        // Invalid sort param — ignore
      }
    }

    const totalEmployees = allEmployees.length;

    const offset = (page - 1) * limit;
    const paginatedEmployees = allEmployees.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample data for testing and learning purposes',
      total_employees: totalEmployees,
      offset,
      limit,
      employees: paginatedEmployees
    };
  }
};

fakeEmployees.initialize();
