async function register() {

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value.trim().toLowerCase(),

        password: document.getElementById("password").value

    };

    if (!user.name || !user.email || !user.password) {

        alert("Please fill all fields");

        return;

    }

    try {

        const response = await fetch("http://localhost:5001/api/users/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "login.html";

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}