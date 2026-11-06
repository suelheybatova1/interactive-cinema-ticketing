// The venue is described once here. script.js uses this data to create every seat.
const venueData = {
  name: "Seatly Hall One",
  currency: "AZN",
  sections: [
    {
      id: "vip",
      name: "VIP",
      price: 32,
      rows: ["A", "B", "C", "D"],
      seatsPerRow: 10,
      description: "Reclining seats with the most immersive screen view."
    },
    {
      id: "premium",
      name: "Premium",
      price: 24,
      rows: ["E", "F", "G", "H"],
      seatsPerRow: 14,
      description: "Central rows balanced for picture and surround sound."
    },
    {
      id: "standard",
      name: "Standard",
      price: 16,
      rows: ["I", "J", "K", "L", "M", "N"],
      seatsPerRow: 14,
      description: "Comfortable seating with a clear full-screen view."
    },
    {
      id: "economy",
      name: "Economy",
      price: 10,
      rows: ["O", "P"],
      seatsPerRow: 10,
      description: "Best-value seats at the rear of the hall."
    }
  ],
  unavailableSeats: [
    "A3", "A8", "B5", "C2", "D9",
    "E4", "F11", "G7", "H13",
    "I2", "J10", "K6", "L12", "M3", "N8",
    "O4", "P7"
  ]
};

function createSeatData(section) {
  return section.rows.flatMap((row) =>
    Array.from({ length: section.seatsPerRow }, (_, index) => {
      const number = index + 1;
      const id = `${row}${number}`;

      return {
        id,
        row,
        number,
        sectionId: section.id,
        sectionName: section.name,
        price: section.price,
        description: section.description,
        unavailable: venueData.unavailableSeats.includes(id)
      };
    })
  );
}

venueData.seats = venueData.sections.flatMap(createSeatData);
