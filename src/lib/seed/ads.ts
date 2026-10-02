import type { Ad } from "../types";
import { sellers } from "./sellers";
import { mulberry32, slugify } from "../utils";
import { conditions } from "../categoryFields";
import { locations, districts } from "../data";
import { dummyAdImageSet } from "./images";

const r = mulberry32(42);
const pick = <T,>(arr: T[] | readonly T[]) => arr[Math.floor(r() * arr.length)];

function vehicleAttrs() {
  const make = pick(["Toyota", "Nissan", "Subaru", "Mercedes", "Mitsubishi", "Isuzu", "Honda"]);
  const models: Record<string, string[]> = {
    Toyota: ["Harrier", "Land Cruiser Prado", "RAV4", "Fielder", "Aqua", "Spacio", "Voxy", "Allion"],
    Nissan: ["X-Trail", "Demio", "Note", "Vitz", "Serena", "March"],
    Subaru: ["Impreza", "Forester", "Outback", "Legacy", "XV"],
    Mercedes: ["C200 AMG", "E200", "GLC 250", "A180"],
    Mitsubishi: ["Outlander", "Pajero", "RVR", "L200"],
    Isuzu: ["D-Max", "Forward", "NQR"],
    Honda: ["CR-V", "Fit", "Vezel", "Accord"],
  };
  const model = pick(models[make]);
  return {
    make, model,
    year: String(2012 + Math.floor(r() * 13)),
    mileage: String(Math.floor(20000 + r() * 180000)),
    transmission: pick(["Automatic", "Manual"]),
    fuel: pick(["Petrol", "Diesel", "Hybrid"]),
    body: pick(["SUV", "Sedan", "Hatchback", "Wagon", "Pickup"]),
  };
}

function phoneAttrs() {
  const brand = pick(["Apple", "Samsung", "Tecno", "Infinix", "Huawei", "Xiaomi"]);
  const models: Record<string, string[]> = {
    Apple: ["iPhone 13 Pro", "iPhone 14", "iPhone 12", "iPhone 15 Plus", "iPhone 11"],
    Samsung: ["Galaxy S21", "Galaxy A54", "Galaxy Note 10", "Galaxy A14"],
    Tecno: ["Spark 10 Pro", "Camon 20", "Pop 8"],
    Infinix: ["Note 30", "Hot 30", "Zero 30"],
    Huawei: ["P30 Pro", "Nova 9", "Y7a"],
    Xiaomi: ["Redmi Note 12", "Mi 11 Lite", "Poco X5"],
  };
  return {
    brand,
    model: pick(models[brand]),
    storage: pick(["64GB", "128GB", "256GB", "512GB"]),
    ram: pick(["4GB", "6GB", "8GB", "12GB"]),
    color: pick(["Black", "White", "Blue", "Silver", "Graphite", "Gold"]),
  };
}

function laptopAttrs() {
  return {
    brand: pick(["HP", "Dell", "Lenovo", "Apple", "Asus", "Acer"]),
    ram: pick(["8GB", "16GB", "32GB"]),
    storage: pick(["256GB SSD", "512GB SSD", "1TB HDD", "1TB SSD"]),
    processor: pick(["Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "Apple M1", "Intel Core i3"]),
  };
}

function propertyAttrs() {
  const t = pick(["Apartment", "House", "Land", "Commercial"]);
  return {
    propertyType: t,
    bedrooms: t === "Land" ? "-" : pick(["1", "2", "3", "4"]),
    bathrooms: t === "Land" ? "-" : pick(["1", "2", "3"]),
    size: String(Math.floor(40 + r() * 900)),
    furnished: t === "Land" ? "-" : pick(["Furnished", "Semi-furnished", "Unfurnished"]),
    status: pick(["For Sale", "For Rent", "For Lease"]),
  };
}

function makeAds(): Ad[] {
  const ads: Ad[] = [];
  let id = 0;
  const push = (cat: string, sub: string, title: string, price: [number, number], attrs: () => Record<string, string>, tag?: string) => {
    const seller = pick(sellers);
    const loc = pick(locations);
    const cond = pick(conditions);
    const p = Math.round((price[0] + r() * (price[1] - price[0])) / (price[1] > 1e6 ? 50000 : 1000)) * (price[1] > 1e6 ? 50000 : 1000);
    const imgs = dummyAdImageSet(cat, sub, title);
    ads.push({
      id: `a${id + 1}`,
      slug: `${slugify(title)}-${loc.toLowerCase()}-${id + 1}`,
      title: tag ? `${title} — ${tag}` : title,
      description: `${title} in ${cond.toLowerCase()} condition, available in ${loc}. Well maintained and ready for inspection. Contact the seller for details, price negotiation and viewing arrangements. Delivery available within the region.`,
      price: p,
      negotiable: r() > 0.5,
      categoryId: cat,
      subcategoryId: sub,
      location: loc,
      district: pick(districts),
      condition: cond,
      images: imgs,
      sellerId: seller.id,
      status: "active",
      featured: r() > 0.85,
      urgent: r() > 0.9,
      top: r() > 0.92,
      views: Math.floor(r() * 900),
      favorites: Math.floor(r() * 80),
      createdAt: new Date(Date.now() - Math.floor(r() * 60) * 86400000).toISOString(),
      expiresAt: new Date(Date.now() + (30 - Math.floor(r() * 25)) * 86400000).toISOString(),
      attrs: attrs(),
    });
    id++;
  };

  for (let i = 0; i < 26; i++) {
    const a = vehicleAttrs();
    push("vehicles", pick(["cars", "suvs", "motorcycles", "trucks"]), `${a.make} ${a.model} ${a.year}`, [8000000, 180000000], () => a);
  }
  for (let i = 0; i < 6; i++) {
    push("vehicles", "motorcycles", `${pick(["Bajaj Boxer", "TVS HLX", "Honda CG125", "Yamaha XTZ", "Haojin HJ125"])} ${2019 + Math.floor(r() * 6)}`, [2500000, 9000000], () => ({ make: "Other", model: "Boda", year: "2022", mileage: "30000", transmission: "Manual", fuel: "Petrol", body: "Bike" }));
  }
  for (let i = 0; i < 18; i++) {
    const a = propertyAttrs();
    const title = a.propertyType === "Land"
      ? `${pick(["Plot of land", "Surveyed land", "Corner plot", "Residential plot"])} in ${pick(["Kira", "Namanve", "Bukoto", "Mutundwe", "Kyengera", "Nansana"])} - ${a.size} sqm`
      : `${a.bedrooms} bedroom ${a.propertyType.toLowerCase()} in ${pick(["Kololo", "Kyanja", "Bugolobi", "Ntinda", "Lubowa", "Munyonyo", "Zzana"])}`;
    push("property", pick(["apartments", "houses", "land", "commercial"]), title, a.propertyType === "Land" ? [20000000, 400000000] : [800000000, 2500000000], () => a, a.status === "For Rent" ? "For Rent" : undefined);
  }
  for (let i = 0; i < 20; i++) {
    const a = phoneAttrs();
    push("phones", pick(["phones-mobiles", "tablets"]), `${a.model} ${a.storage}`, [200000, 6500000], () => a);
  }
  for (let i = 0; i < 10; i++) {
    push("electronics", pick(["tvs", "sound", "appliances"]), `${pick(["Samsung", "LG", "Hisense", "Sony"])} ${pick(["55 inch Smart TV", "43 inch TV", "Home Theatre", "Chest Freezer", "Front Load Washer", "Stand Fan"])}`, [500000, 9000000], () => ({ brand: pick(["Samsung", "LG", "Hisense"]), type: "Appliance", size: pick(["43 inch", "55 inch", "150L", "220L"]) }));
  }
  for (let i = 0; i < 12; i++) {
    const a = laptopAttrs();
    push("computers", pick(["laptops", "desktops", "parts"]), `${a.brand} ${pick(["EliteBook", "ThinkPad X1", "MacBook Air", "Latitude 7490", "Ideapad 5", "Pavilion 15"])} ${a.ram}`, [800000, 8500000], () => a);
  }
  for (let i = 0; i < 8; i++) {
    push("fashion", pick(["clothes", "shoes", "bags"]), pick(["Ankara dresses lot", "Nike Air Max shoes", "Leather handbag", "Mens office shirts", "Kids school uniforms", "Designer sandals", "Denim jacket", "Party gown"]), [30000, 800000], () => ({ size: pick(["M", "L", "42", "Free size"]), gender: pick(["Men", "Women", "Kids", "Unisex"]), material: pick(["Cotton", "Leather", "Denim"]) }));
  }
  for (let i = 0; i < 8; i++) {
    push("home", pick(["furniture", "garden"]), pick(["L-shaped sofa set", "Dining table 6 seater", "Executive office desk", "Wooden wardrobe", "Bunker bed for kids", "Patio garden set", "TV stand", "Office chairs lot"]), [150000, 4500000], () => ({ material: pick(["Wood", "Leather", "Metal"]), color: pick(["Brown", "Black", "White"]) }));
  }
  for (let i = 0; i < 10; i++) {
    push("jobs", pick(["jobs-fulltime", "jobs-parttime", "drivers"]), pick(["Accountant needed", "Driver with clean record", "Marketing executive", "Sales representatives", "Housemaid with experience", "Graphic designer", "Security guard", "Nurse assistant", "Store attendant", "IT technician"]), [400000, 4500000], () => ({ jobType: pick(["Full-time", "Part-time", "Contract"]), salary: "Monthly" }));
  }
  for (let i = 0; i < 6; i++) {
    push("services", pick(["domestic", "tech"]), pick(["Home cleaning services", "House wiring expert", "Phone repair in Kampala", "Event catering services", "Car wash detailing", "Tailoring & fashion design"]), [20000, 300000], () => ({ availability: pick(["Weekdays", "Weekends", "Flexible"]) }));
  }
  for (let i = 0; i < 8; i++) {
    push("agriculture", pick(["crops", "farm-equipment", "livestock"]), pick(["Yellow maize 90kg bags", "Coffee Arabica processed", "Tractor 45HP for sale", "Day-old chicks", "Piglets for breeding", "Beans K132", "Poultry feeds 50kg", "Cassava cuttings"]), [50000, 35000000], () => ({ quantity: "Several", origin: pick(["Masaka", "Lira", "Gulu", "Mbale"]) }));
  }
  for (let i = 0; i < 5; i++) {
    push("business", pick(["shops", "restaurants"]), pick(["Retail shop in Kisenyi", "Hardware store in Kikuubo", "Salon business in Bukoto", "Restaurant in Kololo up for sale", "Supermarket in Najjanankumbi"]), [20000000, 900000000], () => ({ businessType: pick(["Shop", "Restaurant", "Salon", "Supermarket"]) }));
  }
  for (let i = 0; i < 5; i++) {
    push("other", "general", pick(["Cement bags 50kg", "Solar panels 300W", "Water tanks 1000L", "Generators 5KVA", "Gym equipment lot"]), [100000, 12000000], () => ({}));
  }
  return ads;
}

export const ads: Ad[] = makeAds();
