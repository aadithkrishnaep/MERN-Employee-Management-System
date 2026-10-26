const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  seedEmployees
} = require('../controllers/employeeController');

// Routes mapping for employee resources
router.route('/')
  .get(getEmployees)
  .post(createEmployee)
  .put(updateEmployee); // Handles PUT /api/employeelist with body._id

router.route('/seed')
  .post(seedEmployees);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
