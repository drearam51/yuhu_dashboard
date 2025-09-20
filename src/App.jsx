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
import InteractionsChart from "./InteractionsChart"; // Asegúrate de la ruta correcta

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

  const [open, setOpen] = useState(false); // Sidebar en móvil

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
        const events = rows
          .map((r) => {
            const [fecha, hora, salon, materia, docente] = r.split(";");
            if (!fecha || !materia) return null;
            return {
              title: salon.trim(),
              date: fecha.trim(),
              extendedProps: {
                salon: materia.trim(),
                docente: docente.trim(),
                hora: hora.trim(),
              },
            };
          })
          .filter(Boolean);
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Header móvil */}
      <div className="md:hidden flex items-center justify-between bg-green-800 text-white p-4">
        <h2 className="font-bold text-lg">Yuhu Dashboard</h2>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-green-700 to-green-900 text-white shadow-xl transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-6 border-b border-green-600 flex flex-col items-center">
          <img src="/yuhu_logo.png" alt="Yuhu Logo" className="mb-3 w-20" />
          <h2 className="text-sm sm:text-base font-bold text-center">
            MAESTRÍA DE TRANSFORMACIÓN DIGITAL
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#interacciones"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setOpen(false)}
          >
            <BarChart3 className="w-5 h-5" /> Interacciones
          </a>
          <a
            href="#temas"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setOpen(false)}
          >
            <FileText className="w-5 h-5" /> Temas
          </a>
          <a
            href="#calendario"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setOpen(false)}
          >
            <CalendarDays className="w-5 h-5" /> Calendario
          </a>
          <a
            href="#libros"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setOpen(false)}
          >
            <BookOpen className="w-5 h-5" /> Libros
          </a>
          <a
            href="#favoritos"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => setOpen(false)}
          >
            <Star className="w-5 h-5" /> Favoritos
          </a>
        </nav>

        <div className="p-4 border-t border-green-600 text-xs text-gray-200 text-center">
          © 2025 Yuhu Group
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-6">
        {/* Interacciones */}
        <section
          id="interacciones"
          className="bg-white p-4 sm:p-6 shadow rounded-2xl"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            📊 Interacciones por Usuario
          </h3>
          <InteractionsChart />
        </section>

        {/* Temas */}
        <section id="temas" className="bg-white p-4 sm:p-6 shadow rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
            <h3 className="text-base sm:text-lg font-semibold">
              📝 Temas Relevantes
            </h3>
            <div className="flex gap-2">
              <select
                value={mesTemaSeleccionado}
                onChange={(e) => setMesTemaSeleccionado(e.target.value)}
                className="border rounded-lg px-2 py-1 text-sm"
              >
                {mesesTemas.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={semanaSeleccionada}
                onChange={(e) => setSemanaSeleccionada(e.target.value)}
                className="border rounded-lg px-2 py-1 text-sm"
              >
                {semanasTemas.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
            {temas
              .filter(
                (t) => t.mes === mesTemaSeleccionado && t.semana === semanaSeleccionada
              )
              .map((t, i) => (
                <li key={i}>{t.tema}</li>
              ))}
          </ul>
        </section>

        {/* Calendario */}
        <section
          id="calendario"
          className="bg-white p-4 sm:p-6 shadow rounded-2xl"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            📅 Calendario de Clases
          </h3>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            eventContent={(eventInfo) => {
              const { salon, docente, hora } = eventInfo.event.extendedProps;
              return (
                <div
                  style={{
                    fontSize: "0.7em",
                    lineHeight: "1.2",
                    whiteSpace: "normal",
                  }}
                >
                  <div>
                    <b>{eventInfo.event.title}</b>
                  </div>
                  <div>📍 {salon}</div>
                  <div>👨‍🏫 {docente}</div>
                  <div>🕑 {hora}</div>
                </div>
              );
            }}
          />
        </section>

        {/* Libros */}
        <section id="libros" className="bg-white p-4 sm:p-6 shadow rounded-2xl">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            📚 Libros Recomendados
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
            {libros.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {l.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Favoritos */}
        <section
          id="favoritos"
          className="bg-white p-4 sm:p-6 shadow rounded-2xl"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3">⭐ Favoritos</h3>
          <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
            {favoritos.map((f, i) => (
              <li key={i}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:underline"
                >
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
