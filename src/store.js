export const initialStore = () => ({
  contactos: [],
  contacto: null,
  loading: false,
  error: null,
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'contactos/fetchStart':
      return { ...store, loading: true, error: null };

    case 'contactos/fetchSuccess':
      return { ...store, loading: false, contactos: action.payload, error: null };

    case 'contactos/fetchError':
      return { ...store, loading: false, error: action.payload };

    case 'contactos/add':
      return { ...store, contactos: [action.payload, ...store.contactos] };

    case 'contactos/update': {
      const update = action.payload; // {id, name, phone, email, address}
      return {
        ...store,
        contactos: store.contactos.map(c =>
          c.id === update.id ? { ...c, ...update } : c
        ),
        contacto:
          store.contacto?.id === update.id
            ? { ...store.contacto, ...update }
            : store.contacto,
      };
    }

    case 'contactos/delete': {
      const id = action.payload;
      return {
        ...store,
        contactos: store.contactos.filter(c => c.id !== id),
        contacto: store.contacto?.id === id ? null : store.contacto,
      };
    }

    case 'contactos/select':
      return { ...store, contacto: action.payload };

    default:
      throw Error('Unknown action.');
  }
}
