function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}

async function loadReports() {

    try {

        const response = await fetch("http://localhost:5001/api/dashboard");

        const data = await response.json();

        document.getElementById("users").innerHTML = data.totalUsers;

        document.getElementById("foods").innerHTML = data.totalFoods;

        document.getElementById("wastes").innerHTML = data.totalWaste;

        document.getElementById("donations").innerHTML = data.totalDonations;

        new Chart(document.getElementById("reportChart"), {

            type: "bar",

            data: {

                labels: [

                    "Users",
                    "Foods",
                    "Waste",
                    "Donations"

                ],

                datasets: [

                    {

                        label: "System Report",

                        data: [

                            data.totalUsers,
                            data.totalFoods,
                            data.totalWaste,
                            data.totalDonations

                        ]

                    }

                ]

            },

            options: {

                responsive: true

            }

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadReports();