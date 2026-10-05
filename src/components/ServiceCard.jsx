// src/components/ServiceCard.jsx
export default function ServiceCard({
  service,
  distance,
  direction,
  isSaved,
  onToggleSave,
}) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderLeft: '5px solid #1a4d2e',
        color: '#333',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', flex: 1 }}>
          {service.name}
        </h3>
        <button
          onClick={onToggleSave}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
            padding: '0 0 0 10px',
            color: '#f39c12'
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save service'}
        >
          {isSaved ? '⭐' : '☆'}
        </button>
      </div>

      {distance !== null && distance !== undefined && (
        <div
          style={{
            backgroundColor: '#e8f5e9',
            color: '#1a4d2e',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            display: 'inline-block',
          }}
        >
          📍 {distance.toFixed(1)} km {direction} of you
        </div>
      )}

      <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#666' }}>
        <strong>Type:</strong> {service.category} | <strong>Town:</strong>{' '}
        {service.town}
      </p>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#666' }}>
        <strong>Phone:</strong> {service.phone} | <strong>Hours:</strong>{' '}
        {service.hours}
      </p>
      <p
        style={{
          margin: '0',
          fontSize: '0.85rem',
          color: '#888',
          fontStyle: 'italic',
        }}
      >
        {service.notes}
      </p>
    </div>
  );
}