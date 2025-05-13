import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen overflow-hidden">
                <img
                    src="/images/IMG_2016.JPG"
                    alt="img"
                    className="home-video"
                />
                <Navbar /> {/* Har doim ko‘rinadi */}
                <Route />  {/* Sahifalarni boshqaradi */}
            </div>
        </BrowserRouter>
    );
};

export default App;
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LeafletMouseEvent } from 'leaflet';
//
// // GeoJSON fayllar (masalan, butun O‘zbekiston)
// import uzbData from '../data/uzbekistan.json';
//
// // Har bir viloyat uchun alohida ma'lumot (faqat misol uchun)
// import toshkentData from '../data/toshkent.json';
// import fargonaData from '../data/fargona.json';
//
// // Viloyatlar uchun ma'lumotlar tipi
// interface RegionData {
//     [key: string]: any;
// }
//
// const regionData: RegionData = {
//     Toshkent: toshkentData,
//     Fargona: fargonaData,
//     Andijon: uzbData, // Andijon viloyatiga misol
//     // boshqa viloyatlarni shu yerga qo‘shing
// };
//
// const UzbekistanMap: React.FC = () => {
//     const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
//
//     // Davlat bosilganda
//     const handleCountryClick = () => {
//         console.log('Uzbekistan clicked');
//     };
//
//     // Viloyat bosilganda
//     const handleRegionClick = (_: LeafletMouseEvent, layer: L.Layer) => {
//         const feature: any = (layer as any).feature;
//         const name = feature?.properties?.NAME_1;
//
//         if (regionData[name]) {
//             setSelectedRegion(name);
//         }
//     };
//
//     return (
//         <MapContainer center={[41.3, 69.3]} zoom={6} className="h-screen w-full">
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="© OpenStreetMap contributors"
//             />
//
//             {!selectedRegion && (
//                 <GeoJSON
//                     data={uzbData}
//                     onEachFeature={(_, layer) => {
//                         layer.on({
//                             click: handleCountryClick,
//                         });
//                     }}
//                     style={() => ({
//                         color: 'green',
//                         weight: 2,
//                         fillOpacity: 0.2,
//                     })}
//                 />
//             )}
//
//             {selectedRegion && (
//                 <GeoJSON
//                     data={regionData[selectedRegion]}
//                     onEachFeature={(feature, layer) => {
//                         layer.on({
//                             click: () => setSelectedRegion(null), // viloyatdan chiqish
//                         });
//                     }}
//                     style={() => ({
//                         color: 'blue',
//                         weight: 2,
//                         fillOpacity: 0.3,
//                     })}
//                 />
//             )}
//         </MapContainer>
//     );
// };
//
// export default UzbekistanMap;
