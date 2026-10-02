const SUBCATEGORY_LABELS: Record<string, string> = {
  cars: "Car",
  suvs: "SUV",
  motorcycles: "Motorcycle",
  trucks: "Truck",
  apartments: "Apartment",
  houses: "House",
  land: "Land",
  commercial: "Commercial Property",
  "phones-mobiles": "Mobile Phone",
  tablets: "Tablet",
  accessories: "Phone Accessories",
  tvs: "TV",
  sound: "Sound System",
  appliances: "Appliance",
  laptops: "Laptop",
  desktops: "Desktop",
  parts: "Computer Parts",
  clothes: "Clothing",
  shoes: "Shoes",
  bags: "Bag",
  furniture: "Furniture",
  garden: "Garden",
  "jobs-fulltime": "Full-time Job",
  "jobs-parttime": "Part-time Job",
  drivers: "Driver Job",
  domestic: "Domestic Service",
  tech: "Tech Service",
  crops: "Crops",
  "farm-equipment": "Farm Equipment",
  livestock: "Livestock",
  shops: "Shop",
  restaurants: "Restaurant",
  general: "Marketplace Item",
};

const CATEGORY_LABELS: Record<string, string> = {
  vehicles: "Vehicle",
  property: "Property",
  phones: "Phone",
  electronics: "Electronics",
  computers: "Computer",
  fashion: "Fashion",
  home: "Home & Garden",
  jobs: "Job",
  services: "Service",
  agriculture: "Agriculture",
  business: "Business",
  other: "Item",
};

function labelFor(categoryId: string, subcategoryId?: string, title?: string) {
  if (title?.trim()) return title.trim();
  return (subcategoryId && SUBCATEGORY_LABELS[subcategoryId]) || CATEGORY_LABELS[categoryId] || "Marketplace Item";
}

export function dummyAdImage(categoryId: string, subcategoryId?: string, index = 0, title?: string) {
  const label = encodeURIComponent(labelFor(categoryId, subcategoryId, title));
  const color = index % 2 === 0 ? "e2e8f0/334155" : "dcfce7/166534";
  return `https://dummyimage.com/800x600/${color}.png&text=${label}`;
}

export function dummyAdImageSet(categoryId: string, subcategoryId?: string, title?: string) {
  return [0, 1, 2].map((i) => dummyAdImage(categoryId, subcategoryId, i, title));
}
