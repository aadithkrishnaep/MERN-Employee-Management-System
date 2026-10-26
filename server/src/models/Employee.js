const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    designation: {
      type: String,
      required: [true, 'Designation / job role is required'],
      trim: true
    },
    position: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary cannot be negative']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to synchronize position and designation
employeeSchema.pre('save', function (next) {
  if (this.designation && !this.position) {
    this.position = this.designation;
  } else if (this.position && !this.designation) {
    this.designation = this.position;
  }
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
