import { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { distanceKm, direction } from './utils/distance';
import ServiceCard from './components/ServiceCard';
import EmergencyPanel from './components/EmergencyPanel';
import LocationPicker from './components/LocationPicker';

function App() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [town, setTown] = useState(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('services').select('*');
      if (error) console.error('Error fetching:', error);
      else setServices(data);
    }
    fetchServices();
  }, []);

  // Unique towns for the location picker
  const towns = useMemo(() => {
    return [...new Set(services.map((s) => s.town))].sort();
  }, [services]);

  // Unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = services.map((s) => s.category);
    return ['All', ...new Set(cats)];
  }, [services]);

  // Calculate "here" coordinates based on selected town (average of its services)
  const here = useMemo(() => {
    if (!town || services.length === 0) return null;
    const pts = services.filter((s) => s.town === town);
    if (pts.length === 0) return null;
    const lat = pts.reduce((a, s) => a + s.lat, 0) / pts.length;
    const lon = pts.reduce((a, s) => a + s.lon, 0) / pts.length;
    return { lat, lon };
  }, [town, services]);

  // Filter + sort services
  const filteredServices = useMemo(() => {
    let results = services.filter((service) => {
      const matchesCategory = category === 'All' || service.category === category;
      const term = search.toLowerCase();
      const matchesSearch =
        service.name.toLowerCase().includes(term) ||
        service.notes.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    // Sort by distance if location is set
    if (here) {
      results = [...results].sort(
        (a, b) =>
          distanceKm(here.lat, here.lon, a.lat, a.lon) -
          distanceKm(here.lat, here.lon, b.lat, b.lon)
      );
    }

    return results;
  }, [services, search, category, here]);

  return (
    <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {!isOnline && (
          <div style={{ backgroundColor: '#ffcc00', color: '#000', padding: '10px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', borderRadius: '8px' }}>
            📴 Offline Mode — Showing Cached Data
          </div>
        )}

        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1a4d2e', margin: '0 0 20px 0' }}>CommunityLink AU</h1>
          <p style={{ margin: '0', color: '#666' }}>Offline community navigator</p>
        </header>

        <EmergencyPanel />

        <LocationPicker towns={towns} town={town} setTown={setTown} />

        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: category === cat ? '#1a4d2e' : '#e0e0e0',
                color: category === cat ? '#fff' : '#333',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: '1rem', color: '#333', marginBottom: '15px' }}>
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          {here ? ` — nearest to ${town}` : ''}
        </h2>

        <div>
          {filteredServices.map((service) => {
            const d = here ? distanceKm(here.lat, here.lon, service.lat, service.lon) : null;
            const dir = here ? direction(here.lat, here.lon, service.lat, service.lon) : null;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                distance={d}
                direction={dir}
              />
            );
          })}
          {filteredServices.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888' }}>No services match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;