// src/components/EmergencyPanel.jsx
import { useState } from 'react';

const EMERGENCY_CONTACTS = [
  { name: 'Emergency (Police / Fire / Ambulance)', number: '000' },
  { name: 'Emergency from any mobile (no SIM)', number: '112' },
  { name: '13YARN - Aboriginal crisis support', number: '13 92 76' },
  { name: 'Lifeline', number: '13 11 14' },
  {
    name: 'Services Australia Indigenous Call Centre',
    number: '1800 136 380',
  },
];

export default function EmergencyPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#c0392b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {isOpen ? '▼ Hide Emergency Contacts' : '🚨 Emergency & Support Numbers'}
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: '#fff5f5',
            border: '2px solid #c0392b',
            borderRadius: '8px',
            padding: '15px',
            marginTop: '10px',
          }}
        >
          {EMERGENCY_CONTACTS.map((contact) => (
            <div
              key={contact.number}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #f0d0d0',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#333', flex: 1 }}>
                {contact.name}
              </span>
              <a
                href={`tel:${contact.number.replace(/\s/g, '')}`}
                style={{
                  backgroundColor: '#c0392b',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  marginLeft: '10px',
                }}
              >
                {contact.number}
              </a>
            </div>
          ))}
          <p
            style={{
              fontSize: '0.8rem',
              color: '#888',
              marginTop: '10px',
              marginBottom: '0',
            }}
          >
            💡 Tip: 112 works on any mobile network, even without your own SIM or
            coverage.
          </p>
        </div>
      )}
    </div>
  );
}