import { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

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
      setLoading(true);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw4O34ja3EOFq8QyQApYCcXGYVYC90D7UzyQTVZumfx-e3pQV4McpXoL3imfcnICMFJhw/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.duplicate) {
        alert("⚠️ Este número ya está registrado");
        setLoading(false);
        return;
      }

      if (result.full) {
        alert("🚫 Cupo presencial lleno, selecciona en línea");
        setLoading(false);
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
      alert("Error al enviar ❌");
    } finally {
      setLoading(false);
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
        <h3>Descubre nuevas oportunidades académicas y profesionales</h3>

        <button className="cta" onClick={scrollToForm}>
          Reservar mi lugar
        </button>
      </section>

      {/* FORM */}
      <section className="block form-section" ref={formRef}>
        <h2>Regístrate ahora</h2>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label>Nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Número de contacto</label>
            <div className="phone-group">
              <select name="codigoPais" value={form.codigoPais} onChange={handleChange}>
                <option value="+52">🇲🇽 +52</option>
                <option value="+1">🇺🇸 +1</option>
              </select>

              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    whatsapp: e.target.value.replace(/\D/g, ""),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>¿Cómo deseas participar?</label>
            <select name="modalidad" value={form.modalidad} onChange={handleChange} required>
              <option value="">Selecciona</option>
              <option value="Presencial">Presencial</option>
              <option value="En línea">En línea</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pregunta para el Dr. Tobón</label>
            <textarea
              name="pregunta"
              maxLength="150"
              value={form.pregunta}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="cta" disabled={loading}>
            {loading ? "Enviando..." : "Quiero registrarme"}
          </button>

        </form>
      </section>
    </div>
  );
}