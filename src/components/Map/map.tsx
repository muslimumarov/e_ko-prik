import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server'; // Lucide ikonka

// Leaflet marker default ikonkasini sozlash (agar kerak bo‘lsa)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// TypeScript interfeysi
interface Location {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
}

function MyMapPage() {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        // Backenddan ma'lumotni olish
        axios.get('http://192.168.100.230:3000/bridges/1/')
            .then(response => {
                setLocations(response.data.locations);
                console.log(response.data.locations);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }, []);

    // Lucide marker icon yasash
    const createLucideIcon = () =>
        divIcon({
            html: renderToStaticMarkup(<MapPin size={24} color="red" />),
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
        });

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {locations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={[loc.latitude, loc.longitude]}
                    icon={createLucideIcon()} // 🔥 icon prop to‘g‘ri joyda
                >
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MyMapPage;
