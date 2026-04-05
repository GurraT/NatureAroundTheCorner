
// Data for animals in each location
const wildlifeData = {
  serengeti: [
    {
      name: "Lion",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
    },
    {
      name: "Elephant",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
    }
  ],
  svalbard: [
    {
      name: "Polar Bear",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Polar_Bear_-_Alaska.jpg"
    }
  ],
  amazon: [
    {
      name: "Jaguar",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Panthera_onca_at_the_Toronto_Zoo.jpg"
    }
  ]
};

// Generate HTML for map popups
function getPopupContent(location) {
  if (!wildlifeData[location]) return "<p>No animals found</p>";

  let html = `<div class="popup-container">`;

  wildlifeData[location].forEach(animal => {
    html += `
      <div class="popup-card">
        <img src="${animal.image}" alt="${animal.name}">
        <p>${animal.name}</p>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// Optional: display animals in a side panel
function showAnimals(location) {
  const container = document.getElementById("animals");
  if (!container || !wildlifeData[location]) return;

  container.innerHTML = "";

  wildlifeData[location].forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";

    card.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}">
      <h3>${animal.name}</h3>
    `;

    container.appendChild(card);
  });
}

// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add location markers with popup content
const locations = [
  { coords: [-2.333, 34.833], key: "serengeti" },
  { coords: [78.223, 15.646], key: "svalbard" },
  { coords: [-3.465, -62.215], key: "amazon" }
];

locations.forEach(loc => {
  L.marker(loc.coords).addTo(map)
    .bindPopup(getPopupContent(loc.key))
    .on('click', () => showAnimals(loc.key)); // optional side panel
});
