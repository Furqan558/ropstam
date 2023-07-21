// Function to fetch cars data from the API and populate the table
const fetchCarsAndRenderTable = async () => {
	const response = await fetch("/api/cars");
	const cars = await response.json();

	const tableBody = document.querySelector("tbody");
	tableBody.innerHTML = "";

	cars.forEach((car) => {
		const row = document.createElement("tr");
		row.innerHTML = `
        <td>${car.category}</td>
        <td>${car.make}</td>
        <td>${car.model}</td>
        <td>${car.color}</td>
        <td>${car.registrationNo}</td>
        <td>
          <button class="btn btn-sm btn-info">Edit</button>
          <button class="btn btn-sm btn-danger">Delete</button>
        </td>
      `;

		tableBody.appendChild(row);
	});
};

// Function to handle form submission to add a new car
const addCarForm = document.getElementById("addCarForm");
addCarForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const category = document.getElementById("category").value;
	const make = document.getElementById("make").value;
	const model = document.getElementById("model").value;
	const color = document.getElementById("color").value;
	const registrationNo = document.getElementById("registrationNo").value;
	console.log(category, make, model, color, registrationNo);
	const data = { category, make, model, color, registrationNo };
	console.log(data);
	try {
		const response = await fetch("/api/cars", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			// Car added successfully, refresh the table
			fetchCarsAndRenderTable();
			addCarForm.reset();
		} else {
			const errorData = await response.json();
			alert(`Error: ${errorData.message}`);
		}
	} catch (err) {
		alert(`Error: ${err.message}`);
	}
});

// Call the function to fetch cars data and render the table on page load
fetchCarsAndRenderTable();
