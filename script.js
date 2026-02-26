document.addEventListener('DOMContentLoaded', () => {
    const selectAnio = document.getElementById('anio-vehiculo');
    const inputMonto = document.getElementById('monto');
    const btn = document.getElementById('calc-btn');
    const resultContainer = document.getElementById('result-container');
    const priceText = document.getElementById('final-price');

    
    if (selectAnio) {
        let opcionEspecial = document.createElement('option');
        opcionEspecial.value = "2222";
        opcionEspecial.innerText = "2222";
        selectAnio.appendChild(opcionEspecial);

        for (let i = 2026; i >= 2005; i--) {
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.innerText = i;
            selectAnio.appendChild(opcion);
        }
    }

    
    inputMonto.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value === "") {
            e.target.value = "";
            return;
        }
        
        e.target.value = new Intl.NumberFormat('es-AR').format(value);
    });

    
    btn.addEventListener('click', () => {
        
        const montoLimpio = parseFloat(inputMonto.value.replace(/\./g, ''));
        const cuotas = parseInt(document.getElementById('cuotas').value);
        const anio = document.getElementById('anio-vehiculo').value;

        if (montoLimpio > 0 && cuotas > 0 && anio !== "") {
            btn.innerText = "Procesando...";
            
            setTimeout(() => {
                const tasa = 0.50;
                const totalInteres = montoLimpio * (1 + tasa);
                const cuota = totalInteres / cuotas;

                priceText.innerText = `$ ${cuota.toLocaleString('es-AR', {
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2
                })}`;

                resultContainer.classList.remove('hidden');
                btn.innerText = "Calcular Cuota";
            }, 500);
        } else {
            alert("completa todos los campos.");
        }
    });
});