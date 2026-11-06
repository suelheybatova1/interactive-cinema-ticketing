const seatLayout = document.querySelector("#seat-layout");
const availableCount = document.querySelector("#available-count");
const seatInfo = document.querySelector("#seat-info");
const seatInfoTitle = document.querySelector("#seat-info-title");
const addToCartButton = document.querySelector("#add-to-cart");
const seatMessage = document.querySelector("#seat-message");
const venueMap = document.querySelector("#venue-map");
const mapToolbar = document.querySelector(".map-toolbar");
const zoomLevel = document.querySelector("#zoom-level");

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

function updateSeatStates() {
  document.querySelectorAll(".seat").forEach((button) => {
    const seatId = button.dataset.seatId;
    const isInspected = seatId === appState.inspectedSeatId;
    const isInCart = appState.cart.some((item) => item.id === seatId);

    button.classList.toggle("is-inspected", isInspected && !isInCart);
    button.classList.toggle("is-in-cart", isInCart);
    button.setAttribute("aria-pressed", String(isInspected || isInCart));
  });
}

function inspectSeat(seatId) {
  const seat = getSeatById(seatId);
  if (!seat || seat.unavailable) return;

  appState.inspectedSeatId = seatId;
  updateSeatStates();
  renderSeatInfo();
}

function renderSeatInfo() {
  const seat = getSeatById(appState.inspectedSeatId);

  if (!seat) {
    seatInfoTitle.textContent = "Select a seat";
    seatInfo.className = "seat-info empty";
    seatInfo.innerHTML = `
      <div class="empty-icon" aria-hidden="true">⌁</div>
      <p>Choose an available seat on the map to see its section and price.</p>
    `;
    addToCartButton.disabled = true;
    return;
  }

  const isInCart = appState.cart.some((item) => item.id === seat.id);
  seatInfoTitle.textContent = `Seat ${seat.id}`;
  seatInfo.className = "seat-info";
  seatInfo.innerHTML = `
    <div class="seat-detail-main">
      <span class="zone-chip zone-chip--${seat.sectionId}">${seat.sectionName}</span>
      <strong>${seat.price} <small>${venueData.currency}</small></strong>
    </div>
    <dl class="seat-facts">
      <div><dt>Row</dt><dd>${seat.row}</dd></div>
      <div><dt>Number</dt><dd>${seat.number}</dd></div>
      <div><dt>Status</dt><dd>${isInCart ? "In cart" : "Available"}</dd></div>
    </dl>
    <p>${seat.description}</p>
  `;
  addToCartButton.disabled = isInCart;
  addToCartButton.textContent = isInCart ? "Already in cart" : "Add to cart";
  seatMessage.textContent = "";
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function updateMapView() {
  const { scale, x, y } = appState.view;
  venueMap.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  zoomLevel.value = `${Math.round(scale * 100)}%`;
  zoomLevel.textContent = zoomLevel.value;
}

function changeMapView(action) {
  const view = appState.view;
  const movementStep = 60;

  const actions = {
    "zoom-in": () => { view.scale = clamp(view.scale + 0.1, 0.7, 1.5); },
    "zoom-out": () => { view.scale = clamp(view.scale - 0.1, 0.7, 1.5); },
    "move-up": () => { view.y = clamp(view.y - movementStep, -260, 260); },
    "move-down": () => { view.y = clamp(view.y + movementStep, -260, 260); },
    "move-left": () => { view.x = clamp(view.x - movementStep, -340, 340); },
    "move-right": () => { view.x = clamp(view.x + movementStep, -340, 340); },
    "reset-view": () => { appState.view = { scale: 1, x: 0, y: 0 }; }
  };

  if (!actions[action]) return;
  actions[action]();
  updateMapView();
}

mapToolbar.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  changeMapView(control.dataset.action);
});

seatLayout.addEventListener("click", (event) => {
  const seatButton = event.target.closest(".seat");
  if (!seatButton) return;

  inspectSeat(seatButton.dataset.seatId);
});

renderSeatMap();
updateMapView();
