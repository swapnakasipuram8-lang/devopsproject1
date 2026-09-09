// =====================================
// Check Login
// =====================================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// =====================================
// Load Profile
// =====================================

async function loadProfile() {

    try {

        const response = await fetch("http://localhost:5001/api/users/profile", {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        const data = await response.json();

        if (response.ok) {

            document.getElementById("name").value = data.user.name;
            document.getElementById("email").value = data.user.email;

            document.getElementById("profileName").innerHTML = data.user.name;
            document.getElementById("profileEmail").innerHTML = data.user.email;

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Unable to load profile");

    }

}

// =====================================
// Update Profile
// =====================================

async function updateProfile() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {

        alert("Please fill all fields");

        return;

    }

    try {

        const response = await fetch("http://localhost:5001/api/users/profile", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify({

                name,
                email

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userEmail", data.user.email);

            loadProfile();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    window.location.href = "login.html";

}

// =====================================

loadProfile();