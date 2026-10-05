// src/components/LocationPicker.jsx
export default function LocationPicker({ towns, town, setTown }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ fontSize: '0.9rem', color: '#555', display: 'block', marginBottom: '6px' }}>
        📍 Where are you closest to?
      </label>
      <select
        value={town || ''}
        onChange={(e) => setTown(e.target.value || null)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          color: '#333',           // ← ADD THIS
          boxSizing: 'border-box'
        }}
      >
        <option value="" style={{ color: '#333', backgroundColor: '#fff' }}>
          — Select a town —
        </option>
        {towns.map((t) => (
          <option
            key={t}
            value={t}
            style={{ color: '#333', backgroundColor: '#fff' }}  // ← ADD THIS
          >
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}