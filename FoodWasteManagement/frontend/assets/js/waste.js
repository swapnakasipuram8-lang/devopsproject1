const API_URL = "http://localhost:5001/api/waste";

let editId = null;


// =====================================
// Load Waste Records
// =====================================

async function loadWaste() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        console.log("Waste API Response:", data);


        if (!response.ok) {

            console.error("Failed to load waste:", data);

            alert(data.message || "Unable to load waste records.");

            return;
        }


        // Support both:
        // [ ... ]
        // and
        // { wastes: [ ... ] }

        const waste = Array.isArray(data)
            ? data
            : (data.wastes || data.waste || []);


        const table = document.getElementById("wasteTable");


        if (!table) {

            console.error("wasteTable not found in waste.html");

            return;
        }


        table.innerHTML = "";


        if (waste.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;">
                        No waste records found
                    </td>
                </tr>
            `;

            return;
        }


        waste.forEach(item => {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${item.foodName || ""}
                </td>

                <td>
                    ${item.reason || ""}
                </td>

                <td>
                    ${item.quantity || 0}
                </td>

                <td>
                    ${item.location || ""}
                </td>

                <td>

                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="editWaste('${item._id}')">

                        <i class="fa fa-edit"></i>
                        Edit

                    </button>


                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="deleteWaste('${item._id}')">

                        <i class="fa fa-trash"></i>
                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error("Load Waste Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// Save / Add / Update Waste
// =====================================

async function saveWaste() {

    const foodName = document
        .getElementById("foodName")
        .value
        .trim();


    const reason = document
        .getElementById("reason")
        .value
        .trim();


    const quantity = document
        .getElementById("quantity")
        .value;


    const location = document
        .getElementById("location")
        .value
        .trim();



    // =====================================
    // Validation
    // =====================================

    if (!foodName || !reason || !quantity || !location) {

        alert("Please fill all fields.");

        return;
    }


    if (Number(quantity) <= 0) {

        alert("Quantity must be greater than 0.");

        return;
    }



    // Object sent to backend

    const waste = {

        foodName: foodName,

        reason: reason,

        quantity: Number(quantity),

        location: location

    };


    console.log("Waste Data:", waste);



    try {

        let response;


        // =====================================
        // ADD WASTE
        // =====================================

        if (editId === null) {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(waste)

            });

        }


        // =====================================
        // UPDATE WASTE
        // =====================================

        else {

            response = await fetch(
                `${API_URL}/${editId}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(waste)

                }
            );

        }



        const data = await response.json();


        console.log("Save Waste Response:", data);



        // =====================================
        // Check Response
        // =====================================

        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                "Unable to save waste record."
            );

            return;
        }



        // =====================================
        // Success
        // =====================================

        if (editId === null) {

            alert("Waste Added Successfully");

        } else {

            alert("Waste Updated Successfully");

        }


        // Reset edit mode

        editId = null;


        // Change button text

        const saveBtn = document.getElementById("saveBtn");

        if (saveBtn) {

            saveBtn.innerHTML = `
                <i class="fa fa-plus"></i>
                Add Waste
            `;

        }


        // Clear form

        clearForm();


        // Reload records

        loadWaste();


    } catch (error) {

        console.error("Save Waste Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// Edit Waste
// =====================================

async function editWaste(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Unable to get waste record.");

            return;
        }


        const item = data.waste || data;


        editId = item._id;


        document.getElementById("foodName").value =
            item.foodName || "";


        document.getElementById("reason").value =
            item.reason || "";


        document.getElementById("quantity").value =
            item.quantity || "";


        document.getElementById("location").value =
            item.location || "";


        const saveBtn = document.getElementById("saveBtn");


        if (saveBtn) {

            saveBtn.innerHTML = `
                <i class="fa fa-save"></i>
                Update Waste
            `;

        }


        // Scroll to form

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error("Edit Waste Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// Delete Waste
// =====================================

async function deleteWaste(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this waste record?"
    );


    if (!confirmDelete) {

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {

                method: "DELETE"

            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                "Delete failed."
            );

            return;
        }


        alert("Waste Deleted Successfully");


        loadWaste();


    } catch (error) {

        console.error("Delete Waste Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// Clear Form
// =====================================

function clearForm() {

    document.getElementById("foodName").value = "";

    document.getElementById("reason").value = "";

    document.getElementById("quantity").value = "";

    document.getElementById("location").value = "";

}



// =====================================
// Page Load
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadWaste();

    }
);