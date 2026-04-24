emailjs.init("hN5azE5YemTBaGN7m")

let noteId = 1

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault()
    emailjs.sendForm("service_c2wxr9s", "template_edbt6jr", this)
    .then(() => alert("Message sent!"))
    .catch((err) => alert("Failed: " + JSON.stringify(err)))

    window.localStorage.setItem("noteId" + noteId, document.getElementsByClassName("message"))
    noteId +=1;
})