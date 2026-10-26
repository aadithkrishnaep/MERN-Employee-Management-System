// Centralized API Client Module (as per Section 7.2 of ICTAK Guidelines)
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Helper to handle fetch responses and error parsing
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || errorData.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

export const employeeService = {
  // 1. Get all employees (primary endpoint /api/employees, fallback /api/employeelist)
  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE}/employees`);
      return await handleResponse(res);
    } catch (err) {
      // Fallback try employeelist
      const res = await fetch(`${API_BASE}/employeelist`);
      return await handleResponse(res);
    }
  },

  // 2. Get single employee by ID
  getById: async (id) => {
    const res = await fetch(`${API_BASE}/employees/${id}`);
    return await handleResponse(res);
  },

  // 3. Create a new employee
  create: async (employeeData) => {
    const res = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    });
    return await handleResponse(res);
  },

  // 4. Update an existing employee
  update: async (id, employeeData) => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...employeeData, _id: id })
    });
    return await handleResponse(res);
  },

  // 5. Delete an employee
  delete: async (id) => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // 6. Seed sample data
  seed: async () => {
    const res = await fetch(`${API_BASE}/employees/seed`, {
      method: 'POST'
    });
    return await handleResponse(res);
  }
};
