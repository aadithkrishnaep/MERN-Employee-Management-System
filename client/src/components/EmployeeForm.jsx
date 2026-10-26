import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { employeeService } from '../services/api';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setError(null);

    try {
      await employeeService.create({
        ...formData,
        salary: Number(formData.salary)
      });
      setSuccess(true);
      setFormData({ name: '', designation: '', location: '', salary: '' });
      setValidated(false);
    } catch (err) {
      setError(err.message || 'Failed to submit employee data.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', designation: '', location: '', salary: '' });
    setValidated(false);
    setError(null);
    setSuccess(false);
  };

  return (
    <Container className="py-4">
      <div className="mb-4 pb-2 border-bottom">
        <h2 className="fw-bold mb-1 d-flex align-items-center">
          <i className="bi bi-person-plus-fill text-primary me-2"></i>
          Employee Registration Form
        </h2>
        <p className="text-muted mb-0">
          Add a new employee to the database with server-side Mongoose validation
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          {success && (
            <Alert variant="success" className="shadow-sm mb-4 border-0 p-4" dismissible onClose={() => setSuccess(false)}>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-check-circle-fill fs-3 text-success me-2"></i>
                <h5 className="mb-0 fw-bold">Employee Registered Successfully!</h5>
              </div>
              <p className="text-muted mb-3">
                The new employee record has been saved to MongoDB. You can view the record on the dashboard.
              </p>
              <div className="d-flex gap-2">
                <Button variant="primary" size="sm" onClick={() => navigate('/')}>
                  <i className="bi bi-arrow-left me-1"></i> Go to Dashboard
                </Button>
                <Button variant="outline-success" size="sm" onClick={() => setSuccess(false)}>
                  <i className="bi bi-plus-lg me-1"></i> Add Another
                </Button>
              </div>
            </Alert>
          )}

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-primary text-white py-3 px-4">
              <h5 className="mb-0 fw-semibold">
                <i className="bi bi-ui-checks me-2"></i> Enter Employee Information
              </h5>
            </Card.Header>

            <Card.Body className="p-4">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Field 1: Name */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="fw-semibold">
                    Full Name <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light">
                      <i className="bi bi-person-fill text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter employee full name.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Field 2: Designation */}
                <Form.Group className="mb-3" controlId="formDesignation">
                  <Form.Label className="fw-semibold">
                    Designation / Role <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light">
                      <i className="bi bi-briefcase-fill text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="designation"
                      placeholder="e.g. Full Stack Developer / Project Manager"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid job designation.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Field 3: Location */}
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label className="fw-semibold">
                    Work Location <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light">
                      <i className="bi bi-geo-alt-fill text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="e.g. Kochi, Kerala / Remote"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter employee location.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Field 4: Salary */}
                <Form.Group className="mb-4" controlId="formSalary">
                  <Form.Label className="fw-semibold">
                    Annual / Monthly Salary ($) <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light">
                      <i className="bi bi-cash-stack text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="salary"
                      placeholder="e.g. 75000"
                      min="1"
                      step="any"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid salary amount.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2 pt-2 border-top">
                  <Button variant="primary" type="submit" disabled={loading} className="px-4 fw-semibold">
                    {loading ? (
                      <>
                        <i className="bi bi-arrow-repeat spin me-1"></i> Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-1"></i> Submit to Database
                      </>
                    )}
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleReset} disabled={loading} className="px-3">
                    <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                  </Button>
                  <Button variant="link" onClick={() => navigate('/')} className="ms-auto text-decoration-none text-muted">
                    Cancel & Return
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeForm;
