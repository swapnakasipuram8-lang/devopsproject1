const API_URL = "http://localhost:5001/api/foods";

let editId = null;


// =====================================
// ADD / UPDATE FOOD
// =====================================

async function addFood() {

    const foodName = document.getElementById("foodName").value.trim();
    const category = document.getElementById("category").value.trim();
    const quantity = document.getElementById("quantity").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const donorName = document.getElementById("donorName").value.trim();
    const location = document.getElementById("location").value.trim();


    // Validation
    if (
        !foodName ||
        !category ||
        !quantity ||
        !expiryDate ||
        !donorName ||
        !location
    ) {
        alert("Please fill all fields.");
        return;
    }


    if (Number(quantity) <= 0) {
        alert("Quantity must be greater than 0.");
        return;
    }


    const food = {
        foodName: foodName,
        category: category,
        quantity: Number(quantity),
        expiryDate: expiryDate,
        donorName: donorName,
        location: location
    };


    console.log("Sending Food:", food);


    try {

        let response;


        // =====================================
        // ADD
        // =====================================

        if (editId === null) {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(food)
            });

        }


        // =====================================
        // UPDATE
        // =====================================

        else {

            response = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(food)
            });

        }


        // Get response safely
        const text = await response.text();

        let data = {};

        try {
            data = JSON.parse(text);
        } catch {
            data = {
                message: text
            };
        }


        console.log("Response Status:", response.status);
        console.log("Server Response:", data);


        // =====================================
        // ERROR
        // =====================================

        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                `Server Error: ${response.status}`
            );

            return;
        }


        // =====================================
        // SUCCESS
        // =====================================

        if (editId === null) {

            alert("Food Added Successfully 🍱");

        } else {

            alert("Food Updated Successfully");

        }


        // Reset edit mode
        editId = null;


        // Reset button
        const saveBtn = document.getElementById("saveBtn");

        if (saveBtn) {

            saveBtn.innerHTML = `
                <i class="fa fa-plus"></i>
                Add Food
            `;

        }


        // Clear form
        clearForm();


        // Reload table
        loadFoods();


    } catch (error) {

        console.error("Food Request Error:", error);

        alert(
            "Unable to connect to the server.\n\n" +
            "Make sure backend is running on port 5001."
        );

    }

}



// =====================================
// LOAD FOODS
// =====================================

async function loadFoods() {

    try {

        const response = await fetch(API_URL);

        const text = await response.text();

        let data = {};

        try {
            data = JSON.parse(text);
        } catch {
            data = [];
        }


        console.log("Food Response:", data);


        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                "Unable to load food records."
            );

            return;
        }


        // Backend may return:
        // [ food1, food2 ]
        //
        // OR
        // { foods: [ food1, food2 ] }

        let foods = [];

        if (Array.isArray(data)) {

            foods = data;

        } else if (Array.isArray(data.foods)) {

            foods = data.foods;

        } else if (Array.isArray(data.food)) {

            foods = data.food;

        }


        const table = document.getElementById("foodTable");

        table.innerHTML = "";


        // No records
        if (foods.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">
                        No food records found
                    </td>
                </tr>
            `;

            return;
        }


        // Display records
        foods.forEach(function(food) {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${food.foodName || ""}</td>

                <td>${food.category || ""}</td>

                <td>${food.quantity || 0}</td>

                <td>
                    ${
                        food.expiryDate
                        ? new Date(food.expiryDate)
                            .toLocaleDateString()
                        : ""
                    }
                </td>

                <td>${food.donorName || ""}</td>

                <td>${food.location || ""}</td>

                <td>

                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="editFood('${food._id}')">

                        <i class="fa fa-edit"></i>
                        Edit

                    </button>

                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="deleteFood('${food._id}')">

                        <i class="fa fa-trash"></i>
                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error("Load Food Error:", error);

        alert(
            "Unable to connect to the server.\n\n" +
            "Make sure backend is running on port 5001."
        );

    }

}



// =====================================
// EDIT FOOD
// =====================================

async function editFood(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const text = await response.text();

        let data = {};

        try {
            data = JSON.parse(text);
        } catch {
            data = {};
        }


        console.log("Edit Response:", data);


        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                "Unable to get food record."
            );

            return;
        }


        const food = data.food || data;


        editId = food._id;


        document.getElementById("foodName").value =
            food.foodName || "";


        document.getElementById("category").value =
            food.category || "";


        document.getElementById("quantity").value =
            food.quantity || "";


        if (food.expiryDate) {

            document.getElementById("expiryDate").value =
                new Date(food.expiryDate)
                    .toISOString()
                    .split("T")[0];

        } else {

            document.getElementById("expiryDate").value = "";

        }


        document.getElementById("donorName").value =
            food.donorName || "";


        document.getElementById("location").value =
            food.location || "";


        // Change button to Update Food
        const saveBtn = document.getElementById("saveBtn");

        if (saveBtn) {

            saveBtn.innerHTML = `
                <i class="fa fa-save"></i>
                Update Food
            `;

        }


        // Scroll to form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error("Edit Food Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// DELETE FOOD
// =====================================

async function deleteFood(id) {

    if (!confirm("Are you sure you want to delete this food?")) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const text = await response.text();

        let data = {};

        try {
            data = JSON.parse(text);
        } catch {
            data = {};
        }


        if (!response.ok) {

            alert(
                data.message ||
                data.error ||
                "Delete failed."
            );

            return;
        }


        alert("Food Deleted Successfully");


        loadFoods();


    } catch (error) {

        console.error("Delete Food Error:", error);

        alert("Unable to connect to the server.");

    }

}



// =====================================
// CLEAR FORM
// =====================================

function clearForm() {

    document.getElementById("foodName").value = "";

    document.getElementById("category").value = "";

    document.getElementById("quantity").value = "";

    document.getElementById("expiryDate").value = "";

    document.getElementById("donorName").value = "";

    document.getElementById("location").value = "";

}



// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("userName");

    localStorage.removeItem("userEmail");

    window.location.href = "login.html";

}



// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    loadFoods();

});