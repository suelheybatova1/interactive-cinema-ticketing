const seatLayout = document.querySelector("#seat-layout");
const availableCount = document.querySelector("#available-count");

const appState = {
  inspectedSeatId: null,
  cart: [],
  view: { scale: 1, x: 0, y: 0 }
};

function getSeatById(seatId) {
  return venueData.seats.find((seat) => seat.id === seatId);
}

function createSeatButton(seat) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "seat";
  button.dataset.seatId = seat.id;
  button.textContent = seat.number;
  button.disabled = seat.unavailable;
  button.setAttribute(
    "aria-label",
    `${seat.sectionName} seat ${seat.id}, ${seat.price} ${venueData.currency}${seat.unavailable ? ", unavailable" : ""}`
  );

  if (seat.unavailable) {
    button.classList.add("is-unavailable");
  }

  return button;
}

function renderSeatMap() {
  const fragment = document.createDocumentFragment();

  venueData.sections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = `seat-section seat-section--${section.id}`;
    sectionElement.setAttribute("aria-labelledby", `${section.id}-label`);

    const heading = document.createElement("div");
    heading.className = "section-heading";
    heading.innerHTML = `
      <h3 id="${section.id}-label">${section.name}</h3>
      <span>${section.price} ${venueData.currency}</span>
    `;
    sectionElement.append(heading);

    section.rows.forEach((rowName) => {
      const row = document.createElement("div");
      row.className = "seat-row";

      const startLabel = document.createElement("span");
      startLabel.className = "row-label";
      startLabel.textContent = rowName;
      row.append(startLabel);

      const seats = venueData.seats.filter((seat) => seat.row === rowName);
      seats.forEach((seat) => row.append(createSeatButton(seat)));

      const endLabel = startLabel.cloneNode(true);
      row.append(endLabel);
      sectionElement.append(row);
    });

    fragment.append(sectionElement);
  });

  seatLayout.replaceChildren(fragment);
  availableCount.textContent = venueData.seats.filter((seat) => !seat.unavailable).length;
}

renderSeatMap();
