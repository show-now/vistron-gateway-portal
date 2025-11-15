// Placeholder API functions with simulated network delays
// All data operations return mocked data - backend will be connected later

const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

export interface Visitor {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  purpose: string;
  visit_type: 'Vendors' | 'Business' | 'Delivery Partner' | 'Meeting' | 'Interview' | 'Guest' | 'Contractor';
  whom_to_meet: string;
  visit_date: string;
  visit_time: string;
  status: 'pending' | 'approved' | 'rejected' | 'checked_in' | 'checked_out';
  qr_code?: string;
  created_at: string;
}

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  notifications_enabled: boolean;
  created_at: string;
}

// Mock data
const mockVisitors: Visitor[] = [
  {
    id: 'VIS-001',
    full_name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    purpose: 'Product Demo',
    visit_type: 'Business',
    whom_to_meet: 'Sarah Johnson',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '10:00',
    status: 'approved',
    qr_code: 'QR-VIS-001',
    created_at: new Date().toISOString(),
  },
  {
    id: 'VIS-002',
    full_name: 'Emily Davis',
    email: 'emily.d@company.com',
    phone: '+1234567891',
    purpose: 'Delivery Package',
    visit_type: 'Delivery Partner',
    whom_to_meet: 'Mike Wilson',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '14:30',
    status: 'checked_in',
    qr_code: 'QR-VIS-002',
    created_at: new Date().toISOString(),
  },
  {
    id: 'VIS-003',
    full_name: 'Robert Chen',
    email: 'robert.c@tech.com',
    phone: '+1234567892',
    purpose: 'Interview - Senior Developer',
    visit_type: 'Interview',
    whom_to_meet: 'David Lee',
    visit_date: new Date().toISOString().split('T')[0],
    visit_time: '11:00',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

const mockEmployees: Employee[] = [
  {
    id: 'EMP-001',
    full_name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1234567800',
    department: 'Sales',
    designation: 'Sales Manager',
    notifications_enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'EMP-002',
    full_name: 'Mike Wilson',
    email: 'mike.w@company.com',
    phone: '+1234567801',
    department: 'Operations',
    designation: 'Operations Lead',
    notifications_enabled: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'EMP-003',
    full_name: 'David Lee',
    email: 'david.l@company.com',
    department: 'Engineering',
    designation: 'Engineering Manager',
    notifications_enabled: false,
    created_at: new Date().toISOString(),
  },
];

// Visitor operations
export async function submitVisitorRegistration(data: Partial<Visitor>): Promise<Visitor> {
  await delay(1000);
  const newVisitor: Visitor = {
    id: `VIS-${String(mockVisitors.length + 1).padStart(3, '0')}`,
    full_name: data.full_name || '',
    email: data.email || '',
    phone: data.phone || '',
    purpose: data.purpose || '',
    visit_type: data.visit_type || 'Guest',
    whom_to_meet: data.whom_to_meet || '',
    visit_date: data.visit_date || '',
    visit_time: data.visit_time || '',
    status: 'pending',
    qr_code: `QR-VIS-${String(mockVisitors.length + 1).padStart(3, '0')}`,
    created_at: new Date().toISOString(),
  };
  mockVisitors.push(newVisitor);
  return newVisitor;
}

export async function fetchVisitors(): Promise<Visitor[]> {
  await delay(600);
  return mockVisitors;
}

export async function approveVisitor(id: string): Promise<void> {
  await delay(500);
  const visitor = mockVisitors.find(v => v.id === id);
  if (visitor) visitor.status = 'approved';
}

export async function rejectVisitor(id: string): Promise<void> {
  await delay(500);
  const visitor = mockVisitors.find(v => v.id === id);
  if (visitor) visitor.status = 'rejected';
}

export async function checkInVisitor(id: string): Promise<void> {
  await delay(500);
  const visitor = mockVisitors.find(v => v.id === id);
  if (visitor) visitor.status = 'checked_in';
}

export async function checkOutVisitor(id: string): Promise<void> {
  await delay(500);
  const visitor = mockVisitors.find(v => v.id === id);
  if (visitor) visitor.status = 'checked_out';
}

export async function scanQRCode(code: string): Promise<Visitor | null> {
  await delay(700);
  return mockVisitors.find(v => v.qr_code === code) || null;
}

// Employee operations
export async function listEmployees(): Promise<Employee[]> {
  await delay(600);
  return mockEmployees;
}

export async function createEmployee(data: Partial<Employee>): Promise<Employee> {
  await delay(800);
  const newEmployee: Employee = {
    id: `EMP-${String(mockEmployees.length + 1).padStart(3, '0')}`,
    full_name: data.full_name || '',
    email: data.email || '',
    phone: data.phone,
    department: data.department || '',
    designation: data.designation || '',
    notifications_enabled: data.notifications_enabled || false,
    created_at: new Date().toISOString(),
  };
  mockEmployees.push(newEmployee);
  return newEmployee;
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  await delay(700);
  const employee = mockEmployees.find(e => e.id === id);
  if (!employee) throw new Error('Employee not found');
  Object.assign(employee, data);
  return employee;
}

export async function deleteEmployee(id: string): Promise<void> {
  await delay(600);
  const index = mockEmployees.findIndex(e => e.id === id);
  if (index !== -1) mockEmployees.splice(index, 1);
}

// Auth operations (placeholders)
export async function signupUser(email: string, password: string, role: 'security' | 'admin'): Promise<void> {
  await delay(1000);
  console.log(`[Mock] User signup: ${email} as ${role}`);
}

export async function loginUser(email: string, password: string): Promise<void> {
  await delay(800);
  console.log(`[Mock] User login: ${email}`);
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  await delay(900);
  return otp === '123456'; // Mock OTP validation
}

// Analytics data
export async function getAnalyticsData() {
  await delay(700);
  return {
    totalVisitors: 245,
    pendingApprovals: 12,
    approvedToday: 28,
    totalEmployees: 85,
    weeklyData: [
      { day: 'Mon', visitors: 35 },
      { day: 'Tue', visitors: 42 },
      { day: 'Wed', visitors: 38 },
      { day: 'Thu', visitors: 45 },
      { day: 'Fri', visitors: 52 },
      { day: 'Sat', visitors: 18 },
      { day: 'Sun', visitors: 15 },
    ],
    monthlyData: [
      { month: 'Jan', visitors: 820 },
      { month: 'Feb', visitors: 750 },
      { month: 'Mar', visitors: 890 },
      { month: 'Apr', visitors: 920 },
      { month: 'May', visitors: 1050 },
      { month: 'Jun', visitors: 980 },
    ],
    visitTypeBreakdown: [
      { type: 'Business', count: 85 },
      { type: 'Interview', count: 45 },
      { type: 'Delivery Partner', count: 60 },
      { type: 'Meeting', count: 35 },
      { type: 'Vendors', count: 20 },
    ],
  };
}
