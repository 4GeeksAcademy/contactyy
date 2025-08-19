import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getAllContacts, updateContact, deleteContact } from "../services/fetch.js";
import ContactItem from "../components/ContactItem.jsx";
import ContactForm from "../components/ContactForm.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAllContacts(dispatch);
  }, [dispatch]);

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  const handleSaveEdit = async (form) => {
    await updateContact(dispatch, editingId, form);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar este contacto?")) {
      await deleteContact(dispatch, id);
    }
  };

  if (store.loading) return <div className="container mt-4">Cargando...</div>;
  if (store.error)   return <div className="container mt-4 text-danger">Error: {store.error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Contacts</h2>
        <Link to="/new" className="btn btn-success">Add new contact</Link>
      </div>

      {store.contactos.length === 0 ? (
        <div className="alert alert-light border">No contacts yet</div>
      ) : (
        <ul className="list-group">
          {store.contactos.map((c) => (
            <li key={c.id} className="list-group-item">
              {editingId === c.id ? (
                <ContactForm
                  initialValues={{
                    name: c.name ?? "",
                    address: c.address ?? "",
                    phone: c.phone ?? "",
                    email: c.email ?? "",
                  }}
                  submitLabel="Save changes"
                  onSubmit={handleSaveEdit}
                  onCancel={cancelEdit}
                  submitting={store.loading}
                />
              ) : (
                <ContactItem
                  contacto={c}
                  onView={() => {}}
                  onEdit={() => startEdit(c.id)}
                  onDelete={() => handleDelete(c.id)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
