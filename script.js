// Manejo del formulario de contacto
const formulario = document.getElementById('formularioContacto');
const respuesta = document.getElementById('respuesta');

formulario.addEventListener('submit', async function (e) {
    e.preventDefault(); // Previene el envío tradicional del formulario
    const datos = new FormData(formulario);
    
    try {
        const respuestaFetch = await fetch(formulario.action, {
            method: 'POST',
            body: datos,
            headers: { 'Accept': 'application/json' }
        });

        if (respuestaFetch.ok) {
            // 🎉 Esta es la línea que restablece el formulario
            formulario.reset(); 
            respuesta.style.display = 'block';
            respuesta.style.color = 'green';
            respuesta.textContent = '✅ ¡Mensaje enviado con éxito!';
            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                respuesta.style.display = 'none';
            }, 5000);
        } else {
            // Si la respuesta no es OK, intenta leer el error del servidor (si lo hay)
            const errorData = await respuestaFetch.json(); // Intenta parsear la respuesta JSON para un error
            console.error('Error al enviar el formulario (respuesta no OK):', respuestaFetch.status, errorData);
            respuesta.style.display = 'block';
            respuesta.style.color = 'red';
            respuesta.textContent = `❌ Ocurrió un error: ${errorData.error || 'Intente nuevamente.'}`;
        }
    } catch (error) {
        // Captura errores de red o cualquier otro error durante el fetch
        console.error('Error en la solicitud Fetch:', error);
        respuesta.style.display = 'block';
        respuesta.style.color = 'red';
        respuesta.textContent = '❌ Error de conexión. Verifique su red e intente de nuevo.';
    }
});

// --- EL RESTO DE TU CÓDIGO JS NO RELACIONADO CON EL FORMULARIO ---

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
formulario.addEventListener('submit', async function (e) {
    e.preventDefault(); // Detiene el envío por defecto del navegador
    const datos = new FormData(formulario); // Captura los datos del formulario
    
    try {
        // Intenta enviar los datos a Formspree
        const respuestaFetch = await fetch(formulario.action, {
            method: 'POST',
            body: datos,
            headers: { 'Accept': 'application/json' }
        });

        // VISTA CLAVE: Esta es la condición que decide si el formulario se limpia
        if (respuestaFetch.ok) {
            // ✅ SI el servidor (Formspree) responde con un estado HTTP 2xx (éxito),
            // ENTONCES, se ejecuta el siguiente código:
            
            formulario.reset(); // ¡Aquí se limpia el formulario! 🎉
            
            respuesta.style.display = 'block';
            respuesta.style.color = 'green';
            respuesta.textContent = '✅ ¡Mensaje enviado con éxito!';
            
            setTimeout(() => {
                respuesta.style.display = 'none';
            }, 5000); // El mensaje de éxito se oculta después de 5 segundos
            
        } else {
            // ❌ SI el servidor (Formspree) responde con un error (estado HTTP 4xx, 5xx),
            // ENTONCES, se ejecuta este bloque:
            const errorData = await respuestaFetch.json(); // Intenta leer el mensaje de error de Formspree
            console.error('Error al enviar el formulario (respuesta no OK):', respuestaFetch.status, errorData);
            respuesta.style.display = 'block';
            respuesta.style.color = 'red';
            respuesta.textContent = `❌ Ocurrió un error: ${errorData.error || 'Intente nuevamente.'}`;
        }
    } catch (error) {
        // Este bloque captura errores de red (por ejemplo, si el usuario está offline)
        console.error('Error en la solicitud Fetch:', error);
        respuesta.style.display = 'block';
        respuesta.style.color = 'red';
        respuesta.textContent = '❌ Error de conexión. Verifique su red e intente de nuevo.';
    }
});
