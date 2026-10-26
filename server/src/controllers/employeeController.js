const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees & GET /api/employeelist
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id & GET /api/employeelist/:id
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees & POST /api/employeelist
exports.createEmployee = async (req, res, next) => {
  try {
    const { name, designation, position, location, salary, email } = req.body;

    const newEmployee = new Employee({
      name,
      designation: designation || position,
      position: position || designation,
      location,
      salary: Number(salary),
      email: email || `${(name || 'user').toLowerCase().replace(/\s+/g, '.')}@example.com`
    });

    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee by ID
// @route   PUT /api/employees/:id & PUT /api/employeelist
exports.updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id || req.body._id || req.body.id;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Employee ID is required for update' });
    }

    const { name, designation, position, location, salary, email } = req.body;

    const updated = await Employee.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...((designation || position) && {
          designation: designation || position,
          position: position || designation
        }),
        ...(location && { location }),
        ...(salary !== undefined && { salary: Number(salary) }),
        ...(email && { email })
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ status: 'ok', success: true, result: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee by ID
// @route   DELETE /api/employees/:id & DELETE /api/employeelist/:id
exports.deleteEmployee = async (req, res, next) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.status(200).json({ status: 'ok', success: true, message: 'Employee deleted successfully', result: deleted });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed sample employees (useful for evaluation / demos)
// @route   POST /api/employees/seed
exports.seedEmployees = async (req, res, next) => {
  try {
    const count = await Employee.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: 'Database already has records', count });
    }

    const initialData = [
      { name: 'Leanne Graham', designation: 'Senior Software Architect', location: 'Bengaluru, India', salary: 125000, email: 'sincere@april.biz' },
      { name: 'Ervin Howell', designation: 'Frontend Specialist', location: 'Kochi, India', salary: 85000, email: 'shanna@melissa.tv' },
      { name: 'Clementine Bauch', designation: 'Product Designer', location: 'Trivandrum, India', salary: 92000, email: 'nathan@yesenia.net' },
      { name: 'Patricia Lebsack', designation: 'DevOps Engineer', location: 'Hyderabad, India', salary: 110000, email: 'julianne.oconner@kory.org' },
      { name: 'Chelsey Dietrich', designation: 'Full Stack Engineer', location: 'Remote', salary: 95000, email: 'lucio_hettinger@annie.ca' }
    ];

    const inserted = await Employee.insertMany(initialData);
    res.status(201).json({ message: 'Seeded successfully', count: inserted.length, data: inserted });
  } catch (error) {
    next(error);
  }
};
