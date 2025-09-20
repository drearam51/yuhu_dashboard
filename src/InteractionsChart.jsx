import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import logo from '../public/yuhu_logo.png'; // Importa la imagen para que React la procese
import '../src/index.css';

function App() {
  // --- DATOS (En una app real, vendrían de una API) ---
  const rawInteractionsData = [
    { mes: 'feb', usuario: ' Eliud Ceballos', interacciones: 9 },
    { mes: 'feb', usuario: ' ðŸŒ·Yeny González', interacciones: 7 },
    { mes: 'feb', usuario: ' Jhon González', interacciones: 5 },
    { mes: 'feb', usuario: ' MP', interacciones: 4 },
    { mes: 'feb', usuario: ' Laura Plazasâ¤ï¸', interacciones: 4 },
    { mes: 'feb', usuario: ' Ange Fonseca', interacciones: 4 },
    { mes: 'feb', usuario: ' AdriRomero', interacciones: 4 },
    { mes: 'feb', usuario: ' Lina Paola', interacciones: 3 },
    { mes: 'feb', usuario: ' Anderson_moren', interacciones: 3 },
    { mes: 'feb', usuario: 'Andre', interacciones: 2 },
    { mes: 'feb', usuario: 'Camilo  Rodriguez', interacciones: 1 },
    { mes: 'feb', usuario: ' Saúl Araque', interacciones: 1 },
    { mes: 'feb', usuario: ' Camilo Parada â˜€ï¸', interacciones: 1 },
    { mes: 'feb', usuario: ' Camilo', interacciones: 1 },
    { mes: 'feb', usuario: ' Andrea Torres', interacciones: 1 },
    { mes: 'feb', usuario: ' Alejandra Morales', interacciones: 1 },
    { mes: 'mar', usuario: ' Jhon González', interacciones: 107 },
    { mes: 'mar', usuario: ' Eliud Ceballos', interacciones: 87 },
    { mes: 'mar', usuario: ' MP', interacciones: 82 },
    { mes: 'mar', usuario: ' Ange Fonseca', interacciones: 70 },
    { mes: 'mar', usuario: ' Lina Paola', interacciones: 53 },
    { mes: 'mar', usuario: ' Laura Plazasâ¤ï¸', interacciones: 46 },
    { mes: 'mar', usuario: ' AdriRomero', interacciones: 38 },
    { mes: 'mar', usuario: ' Camilo Parada â˜€ï¸', interacciones: 38 },
    { mes: 'mar', usuario: ' Camilo', interacciones: 33 },
    { mes: 'mar', usuario: ' Anderson_moren', interacciones: 31 },
    { mes: 'mar', usuario: 'Andre', interacciones: 30 },
    { mes: 'mar', usuario: ' Alejandra Morales', interacciones: 29 },
    { mes: 'mar', usuario: ' ðŸŒ·Yeny González', interacciones: 28 },
    { mes: 'mar', usuario: 'Carlos Embus', interacciones: 24 },
    { mes: 'mar', usuario: ' Javi Garzon', interacciones: 10 },
    { mes: 'mar', usuario: ' Ing Oscar Rodríguez...', interacciones: 9 },
    { mes: 'mar', usuario: ' Andrea Torres', interacciones: 8 },
    { mes: 'mar', usuario: ' Jorge', interacciones: 6 },
    { mes: 'mar', usuario: ' Laura Rodríguez', interacciones: 2 },
    { mes: 'mar', usuario: 'DSostenible, Patricia Niño', interacciones: 1 },
    { mes: 'mar', usuario: ' Saúl Araque', interacciones: 1 },
    { mes: 'abr', usuario: ' Eliud Ceballos', interacciones: 107 },
    { mes: 'abr', usuario: ' Lina Paola', interacciones: 79 },
    { mes: 'abr', usuario: ' Jhon González', interacciones: 76 },
    { mes: 'abr', usuario: ' MP', interacciones: 76 },
    { mes: 'abr', usuario: ' Camilo', interacciones: 68 },
    { mes: 'abr', usuario: ' Anderson_moren', interacciones: 61 },
    { mes: 'abr', usuario: ' Camilo Parada â˜€ï¸', interacciones: 51 },
    { mes: 'abr', usuario: ' Laura Plazasâ¤ï¸', interacciones: 50 },
    { mes: 'abr', usuario: ' Ange Fonseca', interacciones: 50 },
    { mes: 'abr', usuario: ' AdriRomero', interacciones: 46 },
    { mes: 'abr', usuario: ' Alejandra Morales', interacciones: 39 },
    { mes: 'abr', usuario: ' ðŸŒ·Yeny González', interacciones: 32 },
    { mes: 'abr', usuario: 'Andre', interacciones: 26 },
    { mes: 'abr', usuario: ' Ing Oscar Rodríguez...', interacciones: 21 },
    { mes: 'abr', usuario: 'Carlos Embus', interacciones: 13 },
    { mes: 'abr', usuario: ' Javi Garzon', interacciones: 13 },
    { mes: 'abr', usuario: ' Jorge', interacciones: 9 },
    { mes: 'abr', usuario: ' Andrea Torres', interacciones: 9 },
    { mes: 'abr', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 3 },
    { mes: 'abr', usuario: ' Saúl Araque', interacciones: 2 },
    { mes: 'abr', usuario: 'DSostenible, Patricia Niño', interacciones: 1 },
    { mes: 'abr', usuario: ' Laura Rodríguez', interacciones: 1 },
    { mes: 'may', usuario: ' Lina Paola', interacciones: 140 },
    { mes: 'may', usuario: ' Jhon González', interacciones: 138 },
    { mes: 'may', usuario: ' Eliud Ceballos', interacciones: 99 },
    { mes: 'may', usuario: ' Ange Fonseca', interacciones: 98 },
    { mes: 'may', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 75 },
    { mes: 'may', usuario: ' Laura Plazasâ¤ï¸', interacciones: 68 },
    { mes: 'may', usuario: ' Camilo Parada â˜€ï¸', interacciones: 66 },
    { mes: 'may', usuario: ' Andrés', interacciones: 48 },
    { mes: 'may', usuario: ' Camilo', interacciones: 37 },
    { mes: 'may', usuario: ' AdriRomero', interacciones: 34 },
    { mes: 'may', usuario: ' ðŸŒ·Yeny González', interacciones: 24 },
    { mes: 'may', usuario: ' Anderson_moren', interacciones: 23 },
    { mes: 'may', usuario: 'Camilo C Cubides', interacciones: 22 },
    { mes: 'may', usuario: 'Andre', interacciones: 20 },
    { mes: 'may', usuario: ' Jorge', interacciones: 20 },
    { mes: 'may', usuario: ' Alejandra Morales', interacciones: 16 },
    { mes: 'may', usuario: ' Javi Garzon', interacciones: 8 },
    { mes: 'may', usuario: ' Andrea Torres', interacciones: 7 },
    { mes: 'may', usuario: ' Laura Rodríguez', interacciones: 7 },
    { mes: 'may', usuario: 'MGTE, Yenifer Casagua ðŸ’ž', interacciones: 7 },
    { mes: 'may', usuario: ' MP', interacciones: 6 },
    { mes: 'may', usuario: ' Ing Oscar Rodríguez...', interacciones: 5 },
    { mes: 'may', usuario: ' Saúl Araque', interacciones: 4 },
    { mes: 'may', usuario: 'Carlos Embus', interacciones: 3 },
    { mes: 'may', usuario: ' Alejo', interacciones: 1 },
    { mes: 'jun', usuario: ' Eliud Ceballos', interacciones: 129 },
    { mes: 'jun', usuario: ' Camilo Parada â˜€ï¸', interacciones: 110 },
    { mes: 'jun', usuario: ' Ange Fonseca', interacciones: 108 },
    { mes: 'jun', usuario: ' Jhon González', interacciones: 104 },
    { mes: 'jun', usuario: ' Lina Paola', interacciones: 104 },
    { mes: 'jun', usuario: ' Laura Plazasâ¤ï¸', interacciones: 95 },
    { mes: 'jun', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 93 },
    { mes: 'jun', usuario: ' ðŸŒ·Yeny González', interacciones: 60 },
    { mes: 'jun', usuario: ' Andrés', interacciones: 51 },
    { mes: 'jun', usuario: ' AdriRomero', interacciones: 50 },
    { mes: 'jun', usuario: ' Anderson_moren', interacciones: 40 },
    { mes: 'jun', usuario: 'Camilo C Cubides', interacciones: 35 },
    { mes: 'jun', usuario: ' Camilo', interacciones: 32 },
    { mes: 'jun', usuario: ' MP', interacciones: 30 },
    { mes: 'jun', usuario: ' Alejandra Morales', interacciones: 25 },
    { mes: 'jun', usuario: ' Javi Garzon', interacciones: 25 },
    { mes: 'jun', usuario: ' Laura Rodríguez', interacciones: 22 },
    { mes: 'jun', usuario: ' Jorge', interacciones: 16 },
    { mes: 'jun', usuario: ' Ing Oscar Rodríguez...', interacciones: 14 },
    { mes: 'jun', usuario: ' Andrea Torres', interacciones: 12 },
    { mes: 'jun', usuario: 'Andre', interacciones: 11 },
    { mes: 'jun', usuario: ' Saúl Araque', interacciones: 5 },
    { mes: 'jun', usuario: ' JUAN CORREDOR', interacciones: 2 },
    { mes: 'jun', usuario: 'Carlos Embus', interacciones: 1 },
    { mes: 'jul', usuario: ' Eliud Ceballos', interacciones: 207 },
    { mes: 'jul', usuario: ' Camilo Parada â˜€ï¸', interacciones: 153 },
    { mes: 'jul', usuario: ' Lina Paola', interacciones: 130 },
    { mes: 'jul', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 116 },
    { mes: 'jul', usuario: ' Andrés', interacciones: 108 },
    { mes: 'jul', usuario: ' Ange Fonseca', interacciones: 75 },
    { mes: 'jul', usuario: ' Jhon González', interacciones: 69 },
    { mes: 'jul', usuario: ' Laura Plazasâ¤ï¸', interacciones: 63 },
    { mes: 'jul', usuario: 'Camilo C Cubides', interacciones: 40 },
    { mes: 'jul', usuario: ' ðŸŒ·Yeny González', interacciones: 39 },
    { mes: 'jul', usuario: ' AdriRomero', interacciones: 36 },
    { mes: 'jul', usuario: ' Camilo', interacciones: 35 },
    { mes: 'jul', usuario: ' Javi Garzon', interacciones: 32 },
    { mes: 'jul', usuario: ' Anderson_moren', interacciones: 17 },
    { mes: 'jul', usuario: ' Jorge', interacciones: 13 },
    { mes: 'jul', usuario: ' JUAN CORREDOR', interacciones: 11 },
    { mes: 'jul', usuario: ' Alejandra Morales', interacciones: 8 },
    { mes: 'jul', usuario: ' Laura Rodríguez', interacciones: 8 },
    { mes: 'jul', usuario: 'Andre', interacciones: 6 },
    { mes: 'jul', usuario: ' Saúl Araque', interacciones: 6 },
    { mes: 'jul', usuario: 'MGTE, Yenifer Casagua ðŸ’ž', interacciones: 5 },
    { mes: 'jul', usuario: ' MP', interacciones: 3 },
    { mes: 'jul', usuario: ' Ing Oscar Rodríguez...', interacciones: 2 },
    { mes: 'ago', usuario: ' Jhon González', interacciones: 101 },
    { mes: 'ago', usuario: ' Camilo Parada â˜€ï¸', interacciones: 75 },
    { mes: 'ago', usuario: ' Lina Paola', interacciones: 64 },
    { mes: 'ago', usuario: ' Eliud Ceballos', interacciones: 54 },
    { mes: 'ago', usuario: ' Ange Fonseca', interacciones: 51 },
    { mes: 'ago', usuario: ' Javi Garzon', interacciones: 51 },
    { mes: 'ago', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 49 },
    { mes: 'ago', usuario: ' Laura Plazasâ¤ï¸', interacciones: 38 },
    { mes: 'ago', usuario: ' Andrés', interacciones: 35 },
    { mes: 'ago', usuario: ' ðŸŒ·Yeny González', interacciones: 31 },
    { mes: 'ago', usuario: ' AdriRomero', interacciones: 31 },
    { mes: 'ago', usuario: ' MP', interacciones: 24 },
    { mes: 'ago', usuario: ' Anderson_moren', interacciones: 18 },
    { mes: 'ago', usuario: ' Jorge', interacciones: 14 },
    { mes: 'ago', usuario: ' Laura Rodríguez', interacciones: 10 },
    { mes: 'ago', usuario: ' JUAN CORREDOR', interacciones: 9 },
    { mes: 'ago', usuario: ' Alejandra Morales', interacciones: 8 },
    { mes: 'ago', usuario: 'Camilo C Cubides', interacciones: 7 },
    { mes: 'ago', usuario: ' Camilo', interacciones: 7 },
    { mes: 'ago', usuario: ' Saúl Araque', interacciones: 6 },
    { mes: 'ago', usuario: 'Andre', interacciones: 4 },
    { mes: 'ago', usuario: 'MGTE, Yenifer Casagua ðŸ’ž', interacciones: 2 },
    { mes: 'ago', usuario: ' Ing Oscar Rodríguez...', interacciones: 1 },
    { mes: 'sep', usuario: ' Laura Plazasâ¤ï¸', interacciones: 169 },
    { mes: 'sep', usuario: ' Camilo Parada â˜€ï¸', interacciones: 160 },
    { mes: 'sep', usuario: ' Lina Paola', interacciones: 126 },
    { mes: 'sep', usuario: ' Jhon González', interacciones: 114 },
    { mes: 'sep', usuario: ' Javi Garzon', interacciones: 89 },
    { mes: 'sep', usuario: ' Eliud Ceballos', interacciones: 84 },
    { mes: 'sep', usuario: ' Ange Fonseca', interacciones: 74 },
    { mes: 'sep', usuario: 'Camilo C Cubides', interacciones: 72 },
    { mes: 'sep', usuario: ' ðŸŒ»Cami BetancourtðŸŒ»', interacciones: 51 },
    { mes: 'sep', usuario: ' ðŸŒ·Yeny González', interacciones: 44 },
    { mes: 'sep', usuario: ' Camilo', interacciones: 41 },
    { mes: 'sep', usuario: ' AdriRomero', interacciones: 41 },
    { mes: 'sep', usuario: ' Jorge', interacciones: 33 },
    { mes: 'sep', usuario: ' Anderson_moren', interacciones: 30 },
    { mes: 'sep', usuario: ' MP', interacciones: 19 },
    { mes: 'sep', usuario: ' Laura Rodríguez', interacciones: 14 },
    { mes: 'sep', usuario: ' JUAN CORREDOR', interacciones: 14 },
    { mes: 'sep', usuario: ' Andrés', interacciones: 13 },
    { mes: 'sep', usuario: 'Andre', interacciones: 12 },
    { mes: 'sep', usuario: ' Saúl Araque', interacciones: 8 },
    { mes: 'sep', usuario: ' Ing Oscar Rodríguez...', interacciones: 8 },
    { mes: 'sep', usuario: 'MGTE, Yenifer Casagua ðŸ’ž', interacciones: 7 },
    { mes: 'sep', usuario: ' Alejandra Morales', interacciones: 5 },
    { mes: 'sep', usuario: 'Carlos Embus', interacciones: 2 },
  ];

  const scheduleData = [
    { Materia: "GESTIÓN DE PROCESOS EMPRESARIALES", Profesor: "CARLOS RAFAEL ROBLES NÚÑEZ", Fecha: "martes, 5 de agosto de 2025", Salon: "1-208" },
    { Materia: "GESTIÓN DE PROCESOS EMPRESARIALES", Profesor: "CARLOS RAFAEL ROBLES NÚÑEZ", Fecha: "miércoles, 6 de agosto de 2025", Salon: "1-407" },
    { Materia: "ESTRATEGIAS DIGITALES", Profesor: "CARLOS ANDRÉS GÓMEZ", Fecha: "miércoles, 13 de agosto de 2025", Salon: "H-602" },
  ];

  // --- ESTADO DEL COMPONENTE ---
  const [selectedMonth, setSelectedMonth] = useState('sep'); // Mes inicial
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  // Obtener meses únicos para el selector
  const availableMonths = [...new Set(rawInteractionsData.map(item => item.mes))];

  // --- LÓGICA PARA ACTUALIZAR EL GRÁFICO ---
  useEffect(() => {
    const filteredData = rawInteractionsData.filter(item => item.mes === selectedMonth);
    const sortedData = filteredData.sort((a, b) => b.interacciones - a.interacciones);

    setChartData({
      labels: sortedData.map(item => item.usuario),
      values: sortedData.map(item => item.interacciones),
    });
  }, [selectedMonth]); // Se ejecuta cada vez que 'selectedMonth' cambia

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div style={styles.dashboardContainer}>
      
      {/* Encabezado */}
      <header style={styles.header}>
        <img src={logo} alt="Logo Universitario" style={styles.logo} />
        <h1 style={styles.title}>Dashboard Universitario MGTD</h1>
      </header>
      
      {/* Sección de Gráficos */}
      <section style={styles.card}>
        <h2 style={styles.cardTitle}>Interacciones por Usuario</h2>
        <div style={styles.filterContainer}>
          <label htmlFor="month-select">Seleccionar Mes: </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.select}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <Plot
          data={[
            {
              x: chartData.labels,
              y: chartData.values,
              type: 'bar',
              marker: { color: '#004C6D' },
            },
          ]}
          layout={{
            title: `Interacciones en ${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}`,
            xaxis: { tickangle: -45, automargin: true },
            yaxis: { title: 'Número de Interacciones' },
            margin: { l: 60, r: 20, b: 120, t: 80 },
          }}
          style={{ width: '100%' }}
          config={{ responsive: true }}
        />
      </section>     
            
    </div>
  );
}

// --- ESTILOS (Alternativa a un archivo CSS) ---
const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f6',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logo: {
    width: '80px',
    height: '80px',
    marginRight: '1.5rem',
  },
  title: {
    color: '#004C6D',
    fontSize: '2.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '2rem',
    marginBottom: '2rem',
  },
  cardTitle: {
    color: '#333',
    borderBottom: '2px solid #004C6D',
    paddingBottom: '0.5rem',
    marginBottom: '1.5rem',
  },
  filterContainer: {
    marginBottom: '1rem',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginLeft: '10px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#004C6D',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
};

export default App;