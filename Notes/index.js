emailjs.init("hN5azE5YemTBaGN7m")

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault()
    emailjs.sendForm("service_c2wxr9s", "template_edbt6jr", this)
    .then(() => alert("Message sent!"))
    .catch((err) => alert("Failed: " + JSON.stringify(err)))
})