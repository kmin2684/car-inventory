// const cars = [
//   { make: "Toyota", model: "Rav4", year: "2018", price: "34000", isLive: true },
//   {
//     make: "Tesla",
//     model: "Model3",
//     year: "2017",
//     price: "40000",
//     isLive: false,
//   },
//   { make: "BMW", model: "X3", year: "2018", price: "35000", isLive: true },
//   {
//     make: "Hyundai",
//     model: "Palisade",
//     year: "2020",
//     price: "52000",
//     isLive: false,
//   },
// ];

const cars = [
  { make: "Toyota", model: "Rav4", year: 2018, price: 34000, isLive: true },
  {
    make: "Tesla",
    model: "Model3",
    year: 2017,
    price: 40000,
    isLive: false,
  },
  { make: "BMW", model: "X3", year: 2018, price: 35000, isLive: true },
  {
    make: "Hyundai",
    model: "Palisade",
    year: 2020,
    price: 52000,
    isLive: false,
  },
];

async function deleteAllCars() {
  const response = await fetch(
    "https://car-inventory-c44a5-default-rtdb.firebaseio.com/cars.json",
    {
      method: "DELETE",
    }
  );
}

//backend database
function createNewInventory(cars) {
  cars.forEach(async (car) => {
    const response = await fetch(
      "https://car-inventory-c44a5-default-rtdb.firebaseio.com/cars.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      }
    );
    console.log(await response.json());
  });
}

async function initializeDataBase(cars) {
  await deleteAllCars();
  createNewInventory(cars);
}

initializeDataBase(cars);

export { cars, deleteAllCars, createNewInventory };
