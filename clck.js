/* Copyright 2024 Sabrina Ferreira Lins Couto
Licensed under the MIT License. */

    function Relogio(){
        var data = new Date();
        var hr = formatTime(data.getHours());
        var min = formatTime(data.getMinutes());
        var s = formatTime(data.getSeconds());
        var dia = data.getDate();
        var mes = data.getMonth() + 1; // Mês começa em 0, então adicionamos 1
        var ano = data.getFullYear();

        var tempo_total = hr + ":" + min + ":" + s + "<br><span class='data'>" + dia + "/" + mes + "/" + ano + "</span>";
        var tempo = document.getElementById('div_relogio');
        tempo.innerHTML = tempo_total;
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    setInterval(Relogio, 500);
