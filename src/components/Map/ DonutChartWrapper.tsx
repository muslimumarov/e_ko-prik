import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import DonutChart from "../../assets/icons/DonutChart.tsx";

interface Props {
  data: { Jarayonda: number; Rejalashtirilgan: number; Tugallangan: number };
  position: [number, number];
  onClick?: () => void;
}

const DonutChartWrapper = ({ data, position, onClick }: Props) => {
  const values = [
    data.Rejalashtirilgan || 0,
    data.Jarayonda || 0,
    data.Tugallangan || 0,
  ];

  // DonutChart uchun React komponentini SVG ga aylantirib, Leaflet DivIcon yaratamiz
  // Bu usul marker o'rnida diagramma ko'rsatish uchun ishlatiladi
  const iconHtml = `
      <div style="width: 50px; height: 50px;">
        <svg viewBox="0 0 100 100" width="50" height="50">
          <!-- Siz xohlagan diagramma svg shaklida bo'lishi mumkin,
          yoki rasmdan foydalangan holda -->
          <circle cx="50" cy="50" r="45" fill="#eee" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#333">${values.reduce((a, b) => a + b, 0)}</text>
        </svg>
      </div>
    `;

  const customIcon = new L.DivIcon({
    html: iconHtml,
    className: "", // Leaflet default classni o'chirish uchun
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={onClick ? { click: onClick } : {}}
    >
      <Popup>
        <div style={{ width: 150, height: 150 }}>
          <DonutChart values={values} />
        </div>
      </Popup>
    </Marker>
  );
};

export default DonutChartWrapper;
