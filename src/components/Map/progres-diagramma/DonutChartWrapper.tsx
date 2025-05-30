import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend } from "chart.js";
import { useTranslation } from "react-i18next";

Chart.register(ArcElement, Legend);

interface Props {
  data: { Jarayonda: number; Rejalashtirilgan: number; Tugallangan: number };
  position: [number, number];
  regionName: string;
  onClick?: () => void;
  options?: number;
}

const DonutChartWrapper = ({ data, position, regionName, onClick }: Props) => {
  const { t } = useTranslation();
  const values = [
    data.Rejalashtirilgan || 0,
    data.Jarayonda || 0,
    data.Tugallangan || 0,
  ];

  const colors = ["#d3504e", "#49dd00", "#FFCE56"];

  const total = values.reduce((a, b) => a + b, 0);
  const iconHtml = `
  <div style="
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: conic-gradient(
      ${colors[0]} ${(values[0] / total) * 360}deg,
      ${colors[1]} ${(values[0] / total) * 360}deg ${((values[0] + values[1]) / total) * 360}deg,
      ${colors[2]} ${((values[0] + values[1]) / total) * 360}deg
    );
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
  ">
    <div style="
      width: 60%;
      height: 60%;
      border-radius: 50%;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      color: black;
      font-size: 12px;
      font-weight: bold;
    ">
      ${total}
    </div>
  </div>
`;

  const customIcon = new L.DivIcon({
    html: iconHtml,
    className: "",
  });

  const chartData = {
    labels: [t("planned"), t("in_progress"), t("completed")],
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverOffset: 0,
        borderWidth: 5,
        cutout: "60%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          textAlign: "left" as const,
          usePointStyle: true,
          padding: 10,
        },
      },
    },
    cutout: "65%",
  };

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={onClick ? { click: onClick } : {}}
    >
      <Tooltip direction="top" opacity={1} permanent={false} sticky={true}>
        <div style={{ width: 200, height: 217, position: "relative" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              color: "#f35a02",
            }}
          >
            {t(`regions.${regionName}`)}
          </div>
          <Doughnut data={chartData} options={options} />
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "19px",
              borderRadius: "10%", // to'liq doira
              color: "#000",
            }}
          >
            {total}
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default DonutChartWrapper;
