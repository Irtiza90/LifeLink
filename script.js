const ambulanceData = [
  {
    id: 1,
    type: "Basic Ambulance",
    availability: "Available",
    cost: 150,
    image: "./basic-ambulance.jpg",
  },
  {
    id: 2,
    type: "Advanced Ambulance",
    availability: "Available",
    cost: 300,
    image: "./advanced-ambulance.jpg",
  },
  {
    id: 3,
    type: "ICU Ambulance",
    availability: "Unavailable",
    cost: 500,
    image: "./icu-ambulance.jpg",
  },
];

const ambulanceList = document.getElementById("ambulanceList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function displayAmbulances(ambulances) {
  ambulanceList.innerHTML = "";
  ambulances.forEach((ambulance) => {
    ambulanceList.innerHTML += `
    <div class="col-md-4">
      <div class="card mb-4">
        <img src="${ambulance.image}" class="card-img-top" alt="Ambulance Image">
        <div class="card-body">
          <h5 class="card-title">${ambulance.type}</h5>
          <p class="card-text">Cost: $${ambulance.cost}</p>
          <p class="card-text">Availability: ${ambulance.availability}</p>
        </div>
      </div>
    </div>
  `;
  });
}

// Initial display
displayAmbulances(ambulanceData);

// Search functionality
searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();
  const filteredAmbulances = ambulanceData.filter((ambulance) => ambulance.type.toLowerCase().includes(query));
  displayAmbulances(filteredAmbulances);
});

// Sorting functionality
sortSelect.addEventListener("change", function () {
  let sortedAmbulances = [...ambulanceData];
  if (sortSelect.value === "costLowHigh") {
    sortedAmbulances.sort((a, b) => a.cost - b.cost);
  } else if (sortSelect.value === "costHighLow") {
    sortedAmbulances.sort((a, b) => b.cost - a.cost);
  }
  displayAmbulances(sortedAmbulances);
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const ambulanceType = document.getElementById("ambulanceType").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;
  let errorMessage = '';

  if (name === "") {
    errorMessage += "Please enter your name.\n";
    isValid = false;
  }

  const phonePattern = /^[0-9]{10}$/; // 10 digit phone number
  if (phone === "") {
    errorMessage += "Please enter your phone number.\n";
    isValid = false;
  } else if (!phonePattern.test(phone)) {
    errorMessage += "Please enter a valid 10-digit phone number.\n";
    isValid = false;
  }

  if (location === "") {
    errorMessage += "Please enter your location.\n";
    isValid = false;
  }

  if (ambulanceType === "") {
    errorMessage += "Please select an ambulance type.\n";
    isValid = false;
  }

  if (isValid) {
    alert("An Ambulance has been requested for your location, and will arrive shortly.");
    document.getElementById("contactForm").reset();
  } else {
    alert(errorMessage);
  }
});