import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { createContact } from "../services/fetch.js";

export default function New() {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const initialValues = { name: "", address: "", phone: "", email: "" };

  const handleSubmit = async (form) => {
    await createContact(dispatch, form); // POST + dispatch contactos/add
    navigate("/");                      // vuelve a Home
  };

  return (
    <div className="container mt-4">
      <ContactForm
        initialValues={initialValues}
        submitLabel="Save"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
