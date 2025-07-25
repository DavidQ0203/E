// Mostrar el formulario
document.getElementById('open-form-btn').addEventListener('click', function() {
    document.getElementById('subscription-modal').style.display = 'block';
});

// Ocultar el formulario
document.getElementById('close-form-btn').addEventListener('click', function() {
    document.getElementById('subscription-modal').style.display = 'none';
});


document.getElementById('subscription-form').addEventListener('submit', function(event) {
    event.preventDefault(); // evitar que recargue

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Aquí mostraremos por consola (simula el "registro")
    console.log('Nuevo registro:', { name, email });

    // Luego ocultamos el formulario
    document.getElementById('subscription-modal').style.display = 'none';

    // Aquí puedes hacer algo más con los datos:
    // ✅ Enviar al backend para guardar en Excel
    sendToServer(name, email);
});


function sendToServer(name, email) {
    fetch('http://localhost:3000/suscribirse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(res => res.json())
    .then(data => {
        alert('Gracias por suscribirte!');
        console.log(data);
    })
    .catch(err => {
        console.error('Error al enviar al servidor:', err);
    });
}