// =====================================
// Login User
// =====================================

async function login() {

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!email || !password) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch("http://localhost:5001/api/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            // Save Token
            localStorage.setItem("token", data.token);

            // Save User Details
            if (data.user) {

                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userEmail", data.user.email);

            }

            alert(data.message);

            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Login Failed");

        }

    } catch (error) {

        console.error("Login Error:", error);

        alert("Unable to connect to the server.");

    }

}