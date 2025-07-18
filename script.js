// Manejo del formulario de contacto
const formulario = document.getElementById('formularioContacto');
const respuesta = document.getElementById('respuesta');

formulario.addEventListener('submit', async function (e) {
    e.preventDefault();
    const datos = new FormData(formulario);
    const respuestaFetch = await fetch(formulario.action, {
        method: 'POST',
        body: datos,
        headers: { 'Accept': 'application/json' }
    });

    if (respuestaFetch.ok) {
        // Esta línea limpia el formulario al restablecer todos sus campos a sus valores iniciales.
        formulario.reset(); 
        
        respuesta.style.display = 'block';
        respuesta.style.color = 'green';
        respuesta.textContent = '✅ ¡Mensaje enviado con éxito!';
        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            respuesta.style.display = 'none';
        }, 5000);
    } else {
        respuesta.style.display = 'block';
        respuesta.style.color = 'red';
        respuesta.textContent = '❌ Ocurrió un error. Intente nuevamente.';
    }
});

// Menú móvil (para pantallas pequeñas)
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
    this.classList.toggle('active');
});

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    });
});

// Efecto scroll suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Añadir clase 'scrolled' al header cuando se hace scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) { // Puedes ajustar este valor
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
