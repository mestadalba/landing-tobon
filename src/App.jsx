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

    const telefonoLimpio = form.whatsapp.replace(/\D/g, "");

    if (telefonoLimpio.length < 10) {
      alert("Número inválido ❌");
      return;
    }

    const telefonoCompleto = `${form.codigoPais}${telefonoLimpio}`;

    const data = {
      nombre: form.nombre.trim(),
      telefono: telefonoCompleto,
      correo: form.correo.trim(),
      estado: form.estado,
      grado: form.grado,
      pertenece: form.pertenece,
      edad: form.edad,
      modalidad: form.modalidad,
      pregunta: form.pregunta,
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbw4O34ja3EOFq8QyQApYCcXGYVYC90D7UzyQTVZumfx-e3pQV4McpXoL3imfcnICMFJhw/exec", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.full) {
        alert("Cupo presencial lleno 🚫 selecciona en línea");
        return;
      }

      if (result.duplicate) {
        alert("Este número ya está registrado ⚠️");
        return;
      }

      alert("Registro exitoso 🚀");

      setForm({
        nombre: "",
        codigoPais: "+52",
        whatsapp: "",
        correo: "",
        estado: "Yucatán",
        grado: "",
        pertenece: "",
        edad: "",
        modalidad: "",
        pregunta: "",
      });

    } catch (error) {
      alert("Error ❌");
    }
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container">

      {/* HERO */}
      <section className="hero">
        <a href="https://universidaddelsur.edu.mx/"><img className="logo" src="/logo.png" alt="Logo" /></a>
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
         <img 
            src="/evento.png" 
            className="responsive-img" 
            alt="Evento"
            loading="lazy"
          />
       {/* <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/wXKUFUa5KjE"
            title="Video"
            allowFullScreen
          ></iframe>
        </div>*/}
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
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* TELÉFONO */}
        <div className="form-group">
          <label>Número de contacto</label>
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
              value={form.whatsapp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({
                  ...form,
                  whatsapp: value
                });
              }}
              required
            />
          </div>
        </div>

        {/* CORREO */}
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>
        {/* EDAD */}
        <div className="form-group">
          <label>Edad</label>
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
        </div>

        {/* MODALIDAD */}
        <div className="form-group">
          <label>¿Cómo deseas participar?</label>
          <select
            name="modalidad"
            value={form.modalidad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Presencial">
              Presencial — Campus Mérida Santa Lucía
            </option>
            <option value="En línea">
              En línea — Transmisión en vivo
            </option>
          </select>
        </div>

        {/* ESTADO */}
        <div className="form-group">
          <label>Estado</label>
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
        </div>

        {/* GRADO */}
        <div className="form-group">
          <label>Grado de estudios</label>
          <select
            name="grado"
            value={form.grado}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
          </select>
        </div>

        {/* TIPO */}
        <div className="form-group">
          <label>¿Perteneces a la Universidad del Sur?</label>
          <select
            name="pertenece"
            value={form.pertenece}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Egresado">Egresado</option>
            <option value="Alumno">Alumno</option>
            <option value="Externo">Externo</option>
          </select>
        </div>

        {/* PREGUNTA */}
        <div className="form-group">
          <label>¿Tienes una pregunta para el Dr. Tobón?</label>
          <textarea
            name="pregunta"
            maxLength="150"
            value={form.pregunta}
            onChange={handleChange}
          />
          <small>(Opcional · máximo 150 caracteres)</small>
        </div>

        <button type="submit" className="cta">
          Quiero registrarme
        </button>

      </form>
      </section>

      {/* CTA FINAL 
      <section className="block center">
        <h3>Cupos limitados 🚨</h3>
        <button className="cta" onClick={scrollToForm}>
          Apartar mi lugar ahora
        </button>
      </section>
          */}

    </div>
  );
}