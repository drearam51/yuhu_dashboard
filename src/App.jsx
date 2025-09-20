import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BarChart3, FileText, CalendarDays, BookOpen, Star } from "lucide-react";
import InteractionsChart from './InteractionsChart'; // Asegúrate de la ruta correcta

export default function App() {
  // Estados
  const [interacciones, setInteracciones] = useState([]);
  const [mesesInteracciones, setMesesInteracciones] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState("sep");

  const [temas, setTemas] = useState([]);
  const [mesesTemas, setMesesTemas] = useState([]);
  const [semanasTemas, setSemanasTemas] = useState([]);
  const [mesTemaSeleccionado, setMesTemaSeleccionado] = useState("");
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("");

  const [eventos, setEventos] = useState([]);
  const [libros, setLibros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // 📊 Interacciones
  useEffect(() => {
    fetch("/data/chat_interacciones.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1).filter((r) => r.trim() !== "");
        const data = rows.map((r) => {
          const [mes, usuario, interacciones] = r.split(",");
          return {
            mes,
            usuario,
            interacciones: Number(interacciones),
          };
        });
        setInteracciones(data);

        const meses = [...new Set(data.map((d) => d.mes))];
        setMesesInteracciones(meses);
        setMesSeleccionado("sep");
      });
  }, []);

  // 📝 Temas relevantes
  useEffect(() => {
    fetch("/data/chat_temas.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1).filter((r) => r.trim() !== "");
        const data = rows.map((r) => {
          const [mes, semana, tema] = r.split(",");
          return { mes, semana, tema };
        });
        setTemas(data);

        const meses = [...new Set(data.map((d) => d.mes))];
        setMesesTemas(meses);

        const semanas = [...new Set(data.map((d) => d.semana))];
        setSemanasTemas(semanas);

        // últimos valores por defecto
        setMesTemaSeleccionado(meses[meses.length - 1]);
        setSemanaSeleccionada(semanas[semanas.length - 1]);
      });
  }, []);

  // 📅 Calendario
  useEffect(() => {
    fetch("/data/horario.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1).filter((r) => r.trim() !== "");
        // const events = rows.map((r) => {
        //   const [fecha, hora, salon, materia, docente] = r.split(";");
        //   return {
        //     title: `📍 ${salon}\n👨‍🏫 ${docente}\n📘 ${materia}\n🕑 ${hora}`,
        //     date: fecha,
        //   };
        // });
        // setEventos(events);
        const events = rows.map((r) => {
            const [fecha, hora, salon, materia, docente] = r.split(";");
            if (!fecha || !materia) return null;

            return {
                title: salon.trim(), // El título principal ahora es solo la materia
                date: fecha.trim(),
                extendedProps: { // Guarda el resto de la información aquí
                    salon: materia.trim(),
                    docente: docente.trim(),
                    hora: hora.trim(),
                }
            };
        }).filter(Boolean);

        setEventos(events);
      });
  }, []);

  // 📚 Libros
  useEffect(() => {
    fetch("/data/libros.txt")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").filter((l) => l.trim() !== "");
        const librosData = lines.map((l) => ({
          titulo: l,
          url: `https://www.amazon.com/s?k=${encodeURIComponent(l)}`,
        }));
        setLibros(librosData);
      });
  }, []);

  // ⭐ Favoritos
  useEffect(() => {
    fetch("/data/favoritos.html")
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const enlaces = [...doc.querySelectorAll("a")].map((a) => ({
          titulo: a.textContent,
          url: a.href,
        }));
        setFavoritos(enlaces);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-green-700 to-green-900 text-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-green-600 flex flex-col items-center">
          <img src="/yuhu_logo.png" alt="Yuhu Logo" className="mb-3 w-24" />
          <h2 className="text-lg font-bold text-center">
            MAESTRÍA DE TRANSFORMACIÓN DIGITAL
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a href="#interacciones" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <BarChart3 className="w-5 h-5" /> Interacciones
          </a>
          <a href="#temas" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <FileText className="w-5 h-5" /> Temas
          </a>
          <a href="#calendario" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <CalendarDays className="w-5 h-5" /> Calendario
          </a>
          <a href="#libros" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <BookOpen className="w-5 h-5" /> Libros
          </a>
          <a href="#favoritos" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <Star className="w-5 h-5" /> Favoritos
          </a>
        </nav>

        <div className="p-4 border-t border-green-600 text-sm text-gray-200 text-center">
          © 2025 Yuhu Group
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto space-y-8">
        {/* Interacciones */}
        <div className="App" style={{ padding: '20px' }}>
            <h1>Dashboard Universitario</h1>
            <InteractionsChart />
            {/* Otros componentes de tu dashboard */}
        </div>
        {/* <section id="interacciones" className="bg-white p-6 shadow rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">📊 Interacciones por Usuario</h3>
            <select
              value={mesSeleccionado}
              onChange={(e) => setMesSeleccionado(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="todos">Todos los meses</option>
              {mesesInteracciones.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={
                mesSeleccionado === "todos"
                  ? interacciones
                  : interacciones.filter((d) => d.mes === mesSeleccionado)
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="usuario" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="interacciones" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </section> */}

        {/* Temas */}
        <section id="temas" className="bg-white p-6 shadow rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">📝 Temas Relevantes</h3>
            <div className="flex gap-2">
              <select
                value={mesTemaSeleccionado}
                onChange={(e) => setMesTemaSeleccionado(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {mesesTemas.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={semanaSeleccionada}
                onChange={(e) => setSemanaSeleccionada(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {semanasTemas.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {temas
              .filter((t) => t.mes === mesTemaSeleccionado && t.semana === semanaSeleccionada)
              .map((t, i) => (
                <li key={i}>{t.tema}</li>
              ))}
          </ul>
        </section>

        {/* Calendario */}
        <section id="calendario" className="bg-white p-6 shadow rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📅 Calendario de Clases</h3>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            // --- AÑADE ESTA FUNCIÓN ---
            eventContent={(eventInfo) => {
                // Accede a los datos que guardaste en extendedProps
                const { salon, docente, hora } = eventInfo.event.extendedProps;
                return (
                <div style={{ fontSize: '0.8em', lineHeight: '1.2', whiteSpace: 'normal' }}>
                    <div style={{ fontSize: '2em', lineHeight: '1.2', whiteSpace: 'normal' }}><b>{eventInfo.event.title}</b></div> {/* Muestra el título (materia) */}
                    <div>📍 {salon}</div>
                    <div>👨‍🏫 {docente}</div>
                    <div>🕑 {hora}</div>
                </div>
                );
            }}  
           />
        </section>

        {/* Libros */}
        <section id="libros" className="bg-white p-6 shadow rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📚 Libros Recomendados</h3>
          <ul className="space-y-2">
            {libros.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {l.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Favoritos */}
        <section id="favoritos" className="bg-white p-6 shadow rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">⭐ Favoritos</h3>
          <ul className="space-y-2">
            {favoritos.map((f, i) => (
              <li key={i}>
                <a href={f.url} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">
                  {f.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
