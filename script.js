document.addEventListener('DOMContentLoaded', () => {
    const selectAnio = document.getElementById('anio-vehiculo');
    const selectCuotas = document.getElementById('cuotas');
    const inputMonto = document.getElementById('monto');
    const btn = document.getElementById('calc-btn');
    const resultContainer = document.getElementById('result-container');
    const priceText = document.getElementById('final-price');
    const adminText = document.getElementById('admin-price');

    // Cuotas
    if (selectCuotas) {
        for (let i = 4; i <= 24; i++) {
            let op = document.createElement('option');
            op.value = i;
            op.innerText = i + (i === 1 ? " Cuota" : " Cuotas");
            selectCuotas.appendChild(op);
        }
    }

    // Modelo
    if (selectAnio) {
        let op2222 = document.createElement('option');
        op2222.value = "2222"; op2222.innerText = "2222";
        selectAnio.appendChild(op2222);
        for (let i = 2026; i >= 2005; i--) {
            let op = document.createElement('option');
            op.value = i; op.innerText = i;
            selectAnio.appendChild(op);
        }
    }


    inputMonto.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value !== "") {
            e.target.value = new Intl.NumberFormat('es-AR').format(value);
        }
    });

    const calculadoraTasas = (anio) => {
        if (anio === "2222") {
            return 0.12;
        } else if (anio >= 2005 && anio <= 2011) {
            return 0.067;
        } else if (anio >= 2012 && anio <= 2025) {
            return 0.053;
        }
        return 0; // Default case
    }

    const calculadoraGastosAdmin = (monto) => {
        let viaticos = 40000;
        let escribano = 60000;
        const gastosAdmin = monto * 0.02 + viaticos + escribano;
        return gastosAdmin; 
    }

    btn.addEventListener('click', () => {
        const montoLimpio = parseFloat(inputMonto.value.replace(/\./g, ''));
        const cuotas = parseInt(selectCuotas.value);
        const anio = selectAnio.value;

        if (montoLimpio > 0 && cuotas > 0 && anio !== "") {
            btn.innerText = "Calculando...";
            setTimeout(() => {
                // const tasaAnual = 0.50;
                // Tasa anual segun año del vehiculo
                const tasaAnual = calculadoraTasas(anio);
                const cuota = (montoLimpio * (1 + tasaAnual)) / cuotas;
                // const gastosAdmin = montoLimpio * 0.08;
                const gastosAdmin = calculadoraGastosAdmin(cuota*cuotas);

                priceText.innerText = `$ ${cuota.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
                adminText.innerText = `$ ${gastosAdmin.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

                resultContainer.classList.remove('hidden');
                btn.innerText = "Calcular Cuota";
            }, 600);
        } else {
            alert("Completa todos los datos.");
        }
    });
});

