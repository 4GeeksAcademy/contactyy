export default function ContactItem({ contacto, onView, onEdit, onDelete }) {
  const { id, name, address, phone, email } = contacto;

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div
        className="d-flex align-items-center gap-3"
        role="button"
        tabIndex={0}
        onClick={() => onView?.(id)}
        onKeyDown={(e) => e.key === "Enter" && onView?.(id)}
      >
        <img
          src={`https://i.pravatar.cc/96?u=${id}`}
          alt={name}
          width="72"
          height="72"
          className="rounded-circle"
        />
        <div className="text-start">
          <h5 className="mb-1">{name}</h5>
          <div className="small text-muted">📍 {address}</div>
          <div className="small text-muted">📞 {phone}</div>
          <div className="small text-muted">✉️ {email}</div>
        </div>
      </div>

      <div className="btn-group">
        <button type="button" className="btn btn-link" title="Edit" onClick={() => onEdit?.(id)}>
          ✎
        </button>
        <button
          type="button"
          className="btn btn-link text-danger"
          title="Delete"
          onClick={() => onDelete?.(id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
