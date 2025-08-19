import { useEffect, useState } from "react";

export default function ContactForm({
  initialValues = { name: "", address: "", phone: "", email: "" },
  onSubmit,
  submitLabel = "Save",
  onCancel,
  submitting = false,
}) {
  const [form, setForm] = useState(initialValues);

  useEffect(() => setForm(initialValues), [initialValues]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form); // devuelve { name, address, phone, email }
  };

  return (
    <form onSubmit={handleSubmit} className="container" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Add new contact</h2>
        {onCancel && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Back
          </button>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          name="name"
          className="form-control"
          placeholder="Mike Tyson"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="mike.Tyson@example.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          className="form-control"
          placeholder="(870) 288-4149"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          name="address"
          className="form-control"
          placeholder="1234 Myke Tyson Rd"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success" disabled={submitting}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
