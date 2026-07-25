import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';
import { delay } from './mock-api';

export const PROJECT_STATUSES = ['Planning', 'In Progress', 'On Hold', 'Completed'] as const;
export const PROJECT_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectPriority = (typeof PROJECT_PRIORITIES)[number];

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  lead: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectListFilters {
  page?: number;
  limit?: number;
  statuses?: string | string[];
  search?: string;
  sort?: string;
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

const PROJECT_NAMES = [
  'Wind Farm Asset Portal',
  'Turbine Maintenance Planner',
  'Field Operations Mobile App',
  'Energy Forecasting Dashboard',
  'Grid Connection Tracker',
  'Safety Compliance Workspace',
  'Supplier Performance Review',
  'Environmental Reporting Hub',
  'Operations Data Migration',
  'Blade Inspection Programme',
  'Remote Monitoring Upgrade',
  'Employee Training Portal'
];

faker.seed(2026);

function generateProject(id: number): Project {
  const createdAt = faker.date.between({ from: '2025-01-01', to: '2026-06-30' });

  return {
    id,
    name: PROJECT_NAMES[(id - 1) % PROJECT_NAMES.length],
    description: faker.company.catchPhrase(),
    status: faker.helpers.arrayElement(PROJECT_STATUSES),
    priority: faker.helpers.arrayElement(PROJECT_PRIORITIES),
    lead: faker.person.fullName(),
    due_date: faker.date.between({ from: '2026-08-01', to: '2027-03-31' }).toISOString(),
    created_at: createdAt.toISOString(),
    updated_at: faker.date.between({ from: createdAt, to: '2026-07-15' }).toISOString()
  };
}

function parseMultiValue(value?: string | string[]): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : value.split(/[.,]/);
}

function sortProjects(projects: Project[], sort?: string): void {
  if (!sort) return;

  try {
    const [sortItem] = JSON.parse(sort) as { id: keyof Project; desc: boolean }[];
    if (!sortItem) return;

    const { id, desc } = sortItem;
    projects.sort((a, b) => {
      const result = String(a[id] ?? '').localeCompare(String(b[id] ?? ''), undefined, {
        numeric: true
      });
      return desc ? -result : result;
    });
  } catch {
    // Ignore malformed URL sort state and preserve the default record order.
  }
}

export const fakeProjects = {
  records: [] as Project[],

  // initialize(): void {
  //   this.records = Array.from({ length: 24 }, (_, index) => generateProject(index + 1));
  // },

  // initialize() update code, this update is Guard active.

  initialize(): void {
    if (this.records.length > 0) return;

    this.records = Array.from({ length: 24 }, (_, index) => generateProject(index + 1));
  },

  async getAll({ statuses = [], search }: { statuses?: string[]; search?: string }) {
    let projects = [...this.records];

    if (statuses.length > 0) {
      projects = projects.filter((project) => statuses.includes(project.status));
    }

    if (search) {
      projects = matchSorter(projects, search, {
        keys: ['name', 'description', 'lead', 'status', 'priority']
      });
    }

    return projects;
  },

  async getProjects({ page = 1, limit = 10, statuses, search, sort }: ProjectListFilters) {
    console.log('GET PROJECTS');
    console.log(this.records.length);

    await delay(150);
    const projects = await this.getAll({ statuses: parseMultiValue(statuses), search });
    sortProjects(projects, sort);

    const offset = (page - 1) * limit;

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'WorkTrack project data',
      total_projects: projects.length,
      offset,
      limit,
      projects: projects.slice(offset, offset + limit)
    };
  },

  async getProjectById(id: number) {
    await delay(250);
    const project = this.records.find((record) => record.id === id);

    if (!project) {
      return { success: false as const, message: `Project with ID ${id} not found` };
    }

    return {
      success: true as const,
      time: new Date().toISOString(),
      message: `Project with ID ${id} found`,
      project
    };
  },

  async createProject(data: ProjectInput) {
    await delay(200);
    const now = new Date().toISOString();
    const nextId = Math.max(0, ...this.records.map((project) => project.id)) + 1;
    const project: Project = { ...data, id: nextId, created_at: now, updated_at: now };

    this.records.push(project);
    // return { success: true as const, message: 'Project created successfully', project };

    const result = {
      success: true as const,
      message: 'Project created successfully',
      project
    };

    return result;
  },

  async updateProject(id: number, data: ProjectInput) {
    await delay(200);
    const index = this.records.findIndex((project) => project.id === id);

    if (index === -1) {
      return { success: false as const, message: `Project with ID ${id} not found` };
    }

    const project = { ...this.records[index], ...data, updated_at: new Date().toISOString() };
    this.records[index] = project;
    return { success: true as const, message: 'Project updated successfully', project };
  },

  async deleteProject(id: number) {
    await delay(200);
    const index = this.records.findIndex((project) => project.id === id);

    if (index === -1) {
      return { success: false as const, message: `Project with ID ${id} not found` };
    }

    this.records.splice(index, 1);
    return { success: true as const, message: 'Project deleted successfully' };
  }
};

fakeProjects.initialize();
