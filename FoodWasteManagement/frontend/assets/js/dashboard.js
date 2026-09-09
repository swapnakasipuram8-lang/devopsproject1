// ===============================
// Logout
// ===============================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// ===============================
// Check Login
// ===============================
const token = localStorage.getItem("token");

// Comment these 5 lines if you want to test without logging in
if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// ===============================
// Load Dashboard
// ===============================
async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:5001/api/dashboard");

        if (!response.ok) {
            throw new Error("Unable to fetch dashboard data.");
        }

        const data = await response.json();

        console.log("Dashboard Data:", data);

        // Dashboard Counts
        document.getElementById("userCount").textContent = data.totalUsers || 0;
        document.getElementById("foodCount").textContent = data.totalFoods || 0;
        document.getElementById("wasteCount").textContent = data.totalWaste || 0;
        document.getElementById("donationCount").textContent = data.totalDonations || 0;

        // Recent Food Table
        const table = document.getElementById("foodTable");
        table.innerHTML = "";

        if (data.latestFoods && data.latestFoods.length > 0) {

            data.latestFoods.forEach(food => {

                table.innerHTML += `
                    <tr>
                        <td>${food.foodName}</td>
                        <td>${food.category}</td>
                        <td>${food.quantity}</td>
                        <td>${food.location}</td>
                    </tr>
                `;

            });

        } else {

            table.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">
                        No Food Records Found
                    </td>
                </tr>
            `;

        }

    } catch (error) {

        console.error("Dashboard Error:", error);

        alert("Unable to load dashboard.");

    }

}

// ===============================
// Start
// ===============================
window.onload = loadDashboard;