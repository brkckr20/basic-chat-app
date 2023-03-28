const socket = io.connect("http://localhost:4000");
let mesaj = document.getElementById("mesaj");
let baslik = document.getElementById("baslik");
let buton = document.getElementById("gonder");
let output = document.getElementById("output");
let feedback = document.getElementById("feedback");


buton.addEventListener("click", function () {
    socket.emit("chat", {
        mesaj: mesaj.value,
        baslik: baslik.value,
    })
    mesaj.value = "";
})

socket.on("chat", function (data) {

    output.innerHTML += `<p><strong>${data.baslik} : </strong>${data.mesaj}</p>`;
    feedback.innerHTML = "";
})

mesaj.addEventListener("keypress", () => {
    socket.emit("yaziyor", baslik.value);
})

socket.on("yaziyor", function (data) {
    console.log(data);
    feedback.innerHTML = `<p><em>${data} yazıyor...</em></p>`;
})