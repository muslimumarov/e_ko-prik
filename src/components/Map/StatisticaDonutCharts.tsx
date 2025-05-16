// import React, { useRef, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import type { Chart as ChartJS } from "chart.js";
//
// interface DonutChartWrapperProps {
//     data: {
//         Jarayonda: number;
//         Rejalashtirilgan: number;
//         Tugallangan: number;
//     };
//     position: [number, number];
//     onClick?: () => void;
// }
//
// const DonutChartWrapper: React.FC<DonutChartWrapperProps> = ({ data, onClick }) => {
//     // Refni aniq "doughnut" turiga moslab olamiz
//     const chartRef = useRef<ChartJS<"doughnut", number[], unknown> | null>(null);
//
//     useEffect(() => {
//         // Component o'chirilganda chartni destroy qilamiz
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//             }
//         };
//     }, []);
//
//     const chartData = {
//         labels: ["Jarayonda", "Rejalashtirilgan", "Tugallangan"],
//         datasets: [
//             {
//                 data: [data.Jarayonda, data.Rejalashtirilgan, data.Tugallangan],
//                 backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//                 hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//             },
//         ],
//     };
//
//     return (
//         <div onClick={onClick} style={{ cursor: "pointer" }}>
//             <Doughnut ref={chartRef} data={chartData} />
//         </div>
//     );
// };
//
// export default DonutChartWrapper;
