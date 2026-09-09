const API_URL = "http://localhost:5001/api/donations";

// ===============================
// Check Login
// ===============================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}


// ===============================
// Add Donation
// ===============================

async function addDonation() {

    const donorName = document
        .getElementById("donorName")
        .value
        .trim();

    const receiverName = document
        .getElementById("receiverName")
        .value
        .trim();

    const foodName = document
        .getElementById("foodName")
        .value
        .trim();

    const quantity = document
        .getElementById("quantity")
        .value;

    const location = document
        .getElementById("location")
        .value
        .trim();


    // ===============================
    // Validation
    // ===============================

    if (!donorName || !foodName || !quantity || !location) {

        alert("Please fill all required fields.");

        return;
    }


    if (Number(quantity) <= 0) {

        alert("Quantity must be greater than 0.");

        return;
    }


    // ===============================
    // Send Data to Backend
    // ===============================

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify({

                donorName: donorName,

                receiverName: receiverName || "Not Assigned",

                foodName: foodName,

                quantity: Number(quantity),

                location: location

            })

        });


        const data = await response.json();


        if (response.ok) {

            alert("Donation Added Successfully ❤️");


            // Clear form

            document.getElementById("donorName").value = "";

            document.getElementById("receiverName").value = "";

            document.getElementById("foodName").value = "";

            document.getElementById("quantity").value = "";

            document.getElementById("location").value = "";


            // Reload donation list

            loadDonations();

        } else {

            alert(data.message || "Donation failed.");

            console.error("Donation Error:", data);

        }


    } catch (error) {

        console.error("Connection Error:", error);

        alert("Unable to connect to the server.");

    }

}


// ===============================
// Load Donations
// ===============================

async function loadDonations() {

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });


        const data = await response.json();


        if (!response.ok) {

            console.error(data);

            return;

        }


        const table = document.getElementById("donationTable");

        table.innerHTML = "";


        // Get donations from backend

        const donations = data.donations || data;


        if (!Array.isArray(donations) || donations.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        No donation records found
                    </td>
                </tr>
            `;

            return;

        }


        // ===============================
        // Display Donations
        // ===============================

        donations.forEach(function (donation) {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${donation.donorName || ""}
                </td>

                <td>
                    ${donation.receiverName || "Not Assigned"}
                </td>

                <td>
                    ${donation.foodName || ""}
                </td>

                <td>
                    ${donation.quantity || 0}
                </td>

                <td>
                    ${donation.location || ""}
                </td>

                <td>

                    <button
                        class="btn btn-danger"
                        onclick="deleteDonation('${donation._id}')">

                        <i class="fa fa-trash"></i>
                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error("Load Donation Error:", error);

    }

}


// ===============================
// Delete Donation
// ===============================

async function deleteDonation(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this donation?"
    );


    if (!confirmDelete) {

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {

                method: "DELETE",

                headers: {

                    "Authorization": "Bearer " + token

                }

            }
        );


        const data = await response.json();


        if (response.ok) {

            alert("Donation Deleted Successfully");

            loadDonations();

        } else {

            alert(data.message || "Delete failed.");

        }


    } catch (error) {

        console.error("Delete Error:", error);

        alert("Unable to connect to server.");

    }

}


// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("userName");

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";

}


// ===============================
// Load Data When Page Opens
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadDonations();

});