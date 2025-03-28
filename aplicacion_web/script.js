function suma() {
    const numA = parsefloat(document.getElementById('numero1').value);
    const numB = parsefloat(document.getElementById('numero2').value);

//Verificar si los valores son numeros validos
if (isNaN(numA) || isNaN(numB)) {
    
    document.getElementById('resultado').textContent = 'Por favor, ingrese un numero'
    return;
}

fetch('https://suma-29lp.onrender.com/sumar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ num1: numA, num2: numB })
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        document.getElementById('resultado').textContent = 'Error: ' +data.error;
    } else {
        document.getElementById('resultado').textContent = 'Resultado: ' +data.resultado;
    }
})
.catch(error => {
    document.getElementById('resultado').textContent = 'Error de conección' +error;
});
}