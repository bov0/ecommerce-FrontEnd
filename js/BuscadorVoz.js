
document.addEventListener('DOMContentLoaded', function () {
    const botonMicro = document.getElementById('microfono');
    const salida = document.getElementsByClassName('form-control')[0];

    botonMicro.addEventListener('click', grabarVoz);

    const recognition = new webkitSpeechRecognition();

    function grabarVoz() {
        recognition.start();
        salida.value = "Escuchando...";
        recognition.onend = function () {
            recognition.stop();
        }
    }

    recognition.onresult = function (e) {
        var transcript = e.results[0][0].transcript;
        var confidence = e.results[0][0].confidence;
        if (confidence >= 0.5) {
            salida.value = `${transcript.trim().toLowerCase()}`;
        } else {
            salida.value = "No te entiendo";
        }
    }
})
