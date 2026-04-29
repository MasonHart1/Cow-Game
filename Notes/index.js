supabase = window.supabase.createClient(
    'https://qgdnavrvqtuzhyqrtxfe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZG5hdnJ2cXR1emh5cXJ0eGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzY0MTksImV4cCI6MjA5MjY1MjQxOX0.zkkqLMJwEIZKerPpFqIAvGO2NQegFnk0617ZclEehDQ'
)
emailjs.init("hN5azE5YemTBaGN7m")

let noteId = 1

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.getUser()

    const user = data?.user

    const firstName =
        user?.user_metadata?.first_name ||
        user?.raw_user_meta_data?.first_name

    try {
        await emailjs.sendForm("service_c2wxr9s", "template_edbt6jr", this)

        const { data, error } = await supabase
            .from('notes')
            .insert([{
                message: document.getElementById("message").value,
                name: firstName
            }])

        if (error) throw error

        alert("Message sent + saved!")
        console.log(user)
        console.log(user.user_metadata.first_name)

    } catch (err) {
        console.error(err)
        alert("Failed: " + JSON.stringify(err))
    }
    document.getElementById("message").value = ""
})

async function getUsers() {
    const { data, error } = await supabase
        .from("Users")
        .select("Name")

    for (let i = 0; i < data.length; i++) {
        let opt = document.createElement("option")
        opt.textContent = data[i].Name
        document.getElementById("names").add(opt)
    }
}

getUsers()

document.getElementById("names").addEventListener("change", async function () {
    const { data, error } = await supabase
        .from("Users")
        .select("Email")
        .eq("Name", this.value)
    
    if (error) return

    document.getElementById("email").value = data[0].Email

    console.log(data[0].Email)
})