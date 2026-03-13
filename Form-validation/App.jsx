import React, { useState } from "react";
import "./index.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    checkbox: false,
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";

    if (
      !formData.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Invalid email";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!file) {
      errors.file = "File is required";
    } else if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      errors.file = "Only Doc , PDF files allowed";
    } else if (file.size > 5 * 1024 * 1024) {
      errors.file = "File size should be less than 5MB";
    }

    if (!formData.checkbox) {
      errors.checkbox = "Please agree to terms";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      console.log("File submitted:", file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error-msg">{errors.password}</span>}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        {errors.phone && <span className="error-msg">{errors.phone}</span>}
      </div>

      <div>
        <input 
        type="file" 
        name="file" 
        onChange={handleChange} />
        {errors.file && <span className="error-msg">{errors.file}</span>}
      </div>

      <div>
        <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
        <label>I agree to terms</label>
        {errors.checkbox && (
          <span className="error-msg">{errors.checkbox}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;