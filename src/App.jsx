import { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const formRef = useRef();

  const [form, setForm] = useState({
    nombre: "",
    codigoPais: "+52",
    whatsapp: "",
    correo: "",
    estado: "Yucatán",
    grado: "",
    pertenece: "",
    edad: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const telefonoCompleto = `${form.codigoPais}${form.whatsapp}`;

    const data = {
      nombre: form.nombre,
      telefono: telefonoCompleto,
      correo: form.correo,
      estado: form.estado,
      grado: form.grado,
      pertenece: form.pertenece,
      edad: form.edad,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw4O34ja3EOFq8QyQApYCcXGYVYC90D7UzyQTVZumfx-e3pQV4McpXoL3imfcnICMFJhw/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Respuesta:", result);

      alert("Registro enviado correctamente 🚀");

      // limpiar formulario
      setForm({
        nombre: "",
        codigoPais: "+52",
        whatsapp: "",
        correo: "",
        estado: "Yucatán",
        grado: "",
        pertenece: "",
        edad: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar ❌");
    }
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container">

      {/* HERO */}
      <section className="hero">
        <img className="logo" src="/logo.png" alt="Logo" />
        <h1>Evento Exclusivo en Mérida</h1>
        <h3>
          Descubre nuevas oportunidades académicas y profesionales
        </h3>

        <button className="cta" onClick={scrollToForm}>
          Reservar mi lugar
        </button>
      </section>

      {/* VIDEO */}
      <section className="block center">
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/wXKUFUa5KjE"
            title="Video"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* DESCRIPCIÓN */}
      <section className="block">
        <p>
          Este 21 de abril en Mérida, conoce cómo puedes impulsar tu futuro
          académico con programas de Licenciatura, Maestría y Doctorado.
          Evento diseñado para personas que buscan crecer profesionalmente.
        </p>
      </section>

      {/* FORMULARIO */}
      <section className="block form-section" ref={formRef}>
        <h2>Regístrate ahora</h2>

        <form onSubmit={handleSubmit} className="form">

          {/* NOMBRE */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          {/* TELÉFONO */}
          <div className="phone-group">
            <select
              name="codigoPais"
              value={form.codigoPais}
              onChange={handleChange}
              required
            >
              <option value="+52">🇲🇽 +52</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+57">🇨🇴 +57</option>
            </select>

            <input
              type="tel"
              name="whatsapp"
              placeholder="Número de contacto"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          {/* CORREO */}
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            required
          />

          {/* ESTADO */}
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu estado</option>
            <option>Aguascalientes</option>
            <option>Baja California</option>
            <option>Baja California Sur</option>
            <option>Campeche</option>
            <option>Chiapas</option>
            <option>Chihuahua</option>
            <option>Ciudad de México</option>
            <option>Coahuila</option>
            <option>Colima</option>
            <option>Durango</option>
            <option>Estado de México</option>
            <option>Guanajuato</option>
            <option>Guerrero</option>
            <option>Hidalgo</option>
            <option>Jalisco</option>
            <option>Michoacán</option>
            <option>Morelos</option>
            <option>Nayarit</option>
            <option>Nuevo León</option>
            <option>Oaxaca</option>
            <option>Puebla</option>
            <option>Querétaro</option>
            <option>Quintana Roo</option>
            <option>San Luis Potosí</option>
            <option>Sinaloa</option>
            <option>Sonora</option>
            <option>Tabasco</option>
            <option>Tamaulipas</option>
            <option>Tlaxcala</option>
            <option>Veracruz</option>
            <option>Yucatán</option>
            <option>Zacatecas</option>
          </select>

          {/* GRADO */}
          <select
            name="grado"
            value={form.grado}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el grado</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
          </select>

          {/* TIPO */}
          <select
            name="pertenece"
            value={form.pertenece}
            onChange={handleChange}
            required
          >
            <option value="">¿Eres parte de la Universidad del Sur?</option>
            <option value="Egresado">Egresado</option>
            <option value="Externo">Externo</option>
          </select>

          {/* EDAD */}
          <select
            name="edad"
            value={form.edad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu edad</option>
            <option value="<18">Menor de 18</option>
            <option value="18-24">18 - 24</option>
            <option value="25-34">25 - 34</option>
            <option value="35-44">35 - 44</option>
            <option value="45+">Mayor de 45</option>
          </select>

          <button type="submit" className="cta">
            Quiero registrarme
          </button>

        </form>
      </section>

      {/* CTA FINAL */}
      <section className="block center">
        <h3>Cupos limitados 🚨</h3>
        <button className="cta" onClick={scrollToForm}>
          Apartar mi lugar ahora
        </button>
      </section>

    </div>
  );
}