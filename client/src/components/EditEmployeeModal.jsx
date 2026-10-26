import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { employeeService } from '../services/api';

const EditEmployeeModal = ({ show, onHide, employee, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        designation: employee.designation || employee.position || '',
        location: employee.location || '',
        salary: employee.salary !== undefined ? employee.salary : ''
      });
      setError(null);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee) return;

    setLoading(true);
    setError(null);
    try {
      await employeeService.update(employee._id || employee.id, {
        ...formData,
        salary: Number(formData.salary)
      });
      onUpdated();
      onHide();
    } catch (err) {
      setError(err.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fs-5 fw-bold">
            <i className="bi bi-pencil-square me-2"></i> Edit Employee Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="editName">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editDesignation">
            <Form.Label className="fw-semibold">Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editLocation">
            <Form.Label className="fw-semibold">Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editSalary">
            <Form.Label className="fw-semibold">Salary</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
