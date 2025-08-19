const BASE = 'https://playground.4geeks.com/contact';
const SLUG = 'penelopesinp'; 
const AGENDA_URL   = `${BASE}/agendas/${SLUG}`;
const CONTACTS_URL = `${AGENDA_URL}/contacts`;



async function ensureAgenda() {
  const check = await fetch(AGENDA_URL, { headers: { Accept: 'application/json' } });
  if (check.ok) return;                       // ya existe
  if (check.status !== 404) throw new Error(`HTTP ${check.status}`);

  const create = await fetch(AGENDA_URL, { method: 'POST', headers: { Accept: 'application/json' } });
  if (!create.ok && create.status !== 409) throw new Error(`HTTP ${create.status}`); // 409 = ya existía
}

export async function getAllContacts(dispatch) {
  dispatch({ type: 'contactos/fetchStart' });
  try {
    await ensureAgenda();

    const response = await fetch(CONTACTS_URL, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();                 // { contacts: [...] } o [...]
    const contactos = Array.isArray(data) ? data : data.contacts;

    dispatch({ type: 'contactos/fetchSuccess', payload: contactos });
  } catch (error) {
    dispatch({ type: 'contactos/fetchError', payload: String(error.message || error) });
  }
}

export async function getSingleContact(dispatch, id) {
  dispatch({ type: 'contactos/fetchStart' });
  try {
    await ensureAgenda();

    const response = await fetch(`${CONTACTS_URL}/${id}`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contacto = await response.json();
    dispatch({ type: 'contactos/select', payload: contacto });
  } catch (error) {
    dispatch({ type: 'contactos/fetchError', payload: String(error.message || error) });
  }
}

export async function createContact(dispatch, form) {
  dispatch({ type: 'contactos/fetchStart' });
  try {
    await ensureAgenda();

    const res = await fetch(CONTACTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form), // { name, address, phone, email }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const nuevo = await res.json();
    dispatch({ type: 'contactos/add', payload: nuevo });
  } catch (error) {
    dispatch({ type: 'contactos/fetchError', payload: String(error.message || error) });
  }
}

export async function updateContact(dispatch, id, form) {
  dispatch({ type: 'contactos/fetchStart' });
  try {
    await ensureAgenda();

    const res = await fetch(`${CONTACTS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const actualizado = await res.json();
    dispatch({ type: 'contactos/update', payload: actualizado });
  } catch (error) {
    dispatch({ type: 'contactos/fetchError', payload: String(error.message || error) });
  }
}

export async function deleteContact(dispatch, id) {
  dispatch({ type: 'contactos/fetchStart' });
  try {
    await ensureAgenda();

    const res = await fetch(`${CONTACTS_URL}/${id}`, { method: 'DELETE', headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    dispatch({ type: 'contactos/delete', payload: id });
  } catch (error) {
    dispatch({ type: 'contactos/fetchError', payload: String(error.message || error) });
  }
}
