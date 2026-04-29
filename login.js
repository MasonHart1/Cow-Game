supabase = window.supabase.createClient(
    'https://qgdnavrvqtuzhyqrtxfe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZG5hdnJ2cXR1emh5cXJ0eGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNzY0MTksImV4cCI6MjA5MjY1MjQxOX0.zkkqLMJwEIZKerPpFqIAvGO2NQegFnk0617ZclEehDQ',
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true
        }
    })

async function signUp() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: name,
                redirectTo: "https://masonhart1.github.io/Cow-Game/"
            }
        }
    });

    if (signupError) {
        console.log(signupError.message)
        return
    }

    const { error: insertError } = await supabase
        .from('Users')
        .insert([{
            Name: signupData.user?.user_metadata?.first_name,
            Email: signupData.user?.email,
            user_id: signupData.user?.id
        }])
    if (!signupError && !insertError) {
        alert("Check your email to verify your account")
    }
}

async function login() {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (!error) {
        window.localStorage.setItem('loggedIn', 'true')
        window.location.href = "index.html"
    }
    else {
        console.log(error.message)
    }
}


function showLogin() {
    document.getElementById("login-form").style.display = "flex"
    document.getElementById("signup-form").style.display = "none"
}

function showSignup() {
    document.getElementById("login-form").style.display = "none"
    document.getElementById("signup-form").style.display = "flex"
}