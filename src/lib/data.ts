import type { Category, Subcategory } from "./types";

export const categories: Category[] = [
  { id: "vehicles", slug: "vehicles", name: "Vehicles", icon: "🚗", moderated: true },
  { id: "property", slug: "property", name: "Property", icon: "🏠", moderated: true },
  { id: "phones", slug: "phones", name: "Phones & Tablets", icon: "📱", moderated: false },
  { id: "electronics", slug: "electronics", name: "Electronics", icon: "📺", moderated: false },
  { id: "computers", slug: "computers", name: "Computers", icon: "💻", moderated: false },
  { id: "fashion", slug: "fashion", name: "Fashion", icon: "👗", moderated: false },
  { id: "home", slug: "home-garden", name: "Home & Garden", icon: "🛋️", moderated: false },
  { id: "jobs", slug: "jobs", name: "Jobs", icon: "💼", moderated: false },
  { id: "services", slug: "services", name: "Services", icon: "🛠️", moderated: false },
  { id: "agriculture", slug: "agriculture", name: "Agriculture", icon: "🌾", moderated: false },
  { id: "business", slug: "businesses", name: "Businesses", icon: "🏬", moderated: true },
  { id: "other", slug: "other", name: "Other", icon: "📦", moderated: false },
];

export const subcategories: Subcategory[] = [
  { id: "cars", categoryId: "vehicles", slug: "cars", name: "Cars" },
  { id: "suvs", categoryId: "vehicles", slug: "suvs", name: "SUVs & 4x4" },
  { id: "motorcycles", categoryId: "vehicles", slug: "motorcycles", name: "Motorcycles" },
  { id: "trucks", categoryId: "vehicles", slug: "trucks", name: "Trucks & Vans" },
  { id: "apartments", categoryId: "property", slug: "apartments", name: "Apartments" },
  { id: "houses", categoryId: "property", slug: "houses", name: "Houses" },
  { id: "land", categoryId: "property", slug: "land", name: "Land" },
  { id: "commercial", categoryId: "property", slug: "commercial", name: "Commercial Property" },
  { id: "phones-mobiles", categoryId: "phones", slug: "mobiles", name: "Mobile Phones" },
  { id: "tablets", categoryId: "phones", slug: "tablets", name: "Tablets" },
  { id: "accessories", categoryId: "phones", slug: "accessories", name: "Accessories" },
  { id: "tvs", categoryId: "electronics", slug: "televisions", name: "TVs" },
  { id: "sound", categoryId: "electronics", slug: "sound-system", name: "Sound Systems" },
  { id: "appliances", categoryId: "electronics", slug: "appliances", name: "Appliances" },
  { id: "laptops", categoryId: "computers", slug: "laptops", name: "Laptops" },
  { id: "desktops", categoryId: "computers", slug: "desktops", name: "Desktops" },
  { id: "parts", categoryId: "computers", slug: "parts", name: "Parts & Accessories" },
  { id: "clothes", categoryId: "fashion", slug: "clothing", name: "Clothing" },
  { id: "shoes", categoryId: "fashion", slug: "shoes", name: "Shoes" },
  { id: "bags", categoryId: "fashion", slug: "bags", name: "Bags" },
  { id: "furniture", categoryId: "home", slug: "furniture", name: "Furniture" },
  { id: "garden", categoryId: "home", slug: "garden", name: "Garden" },
  { id: "jobs-fulltime", categoryId: "jobs", slug: "full-time", name: "Full-time" },
  { id: "jobs-parttime", categoryId: "jobs", slug: "part-time", name: "Part-time" },
  { id: "drivers", categoryId: "jobs", slug: "drivers", name: "Drivers" },
  { id: "domestic", categoryId: "services", slug: "domestic", name: "Domestic Work" },
  { id: "tech", categoryId: "services", slug: "tech-services", name: "Tech Services" },
  { id: "crops", categoryId: "agriculture", slug: "crops", name: "Crops & Produce" },
  { id: "farm-equipment", categoryId: "agriculture", slug: "farm-equipment", name: "Farm Equipment" },
  { id: "livestock", categoryId: "agriculture", slug: "livestock", name: "Livestock" },
  { id: "shops", categoryId: "business", slug: "shops", name: "Shops for Sale" },
  { id: "restaurants", categoryId: "business", slug: "restaurants", name: "Restaurants" },
  { id: "general", categoryId: "other", slug: "general", name: "General Items" },
];

export const locations = [
  "Kampala", "Wakiso", "Mukono", "Entebbe", "Jinja", "Mbarara", "Mbale", "Gulu",
  "Fort Portal", "Masaka", "Arua", "Lira", "Hoima", "Soroti",
];

export const districts = [
  "Kampala Central", "Makindye", "Nakawa", "Kawempe", "Rubaga", "Wakiso", "Mukono",
  "Entebbe", "Jinja", "Mbarara", "Mbale", "Gulu", "Kasese", "Masaka", "Arua",
];
