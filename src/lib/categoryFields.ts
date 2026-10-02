
export interface AttrField {
  key: string;
  label: string;
  options?: string[]; // if present, render select
}

export const categoryFields: Record<string, AttrField[]> = {
  vehicles: [
    { key: "make", label: "Make", options: ["Toyota", "Nissan", "Mercedes", "BMW", "Subaru", "Honda", "Mitsubishi", "Isuzu", "Other"] },
    { key: "model", label: "Model", options: ["Harrier", "Land Cruiser", "Prado", "RAV4", "Fielder", "Aqua", "X-Trail", "Demio", "Allion", "Spacio", "Other"] },
    { key: "year", label: "Year" },
    { key: "mileage", label: "Mileage (km)" },
    { key: "transmission", label: "Transmission", options: ["Automatic", "Manual"] },
    { key: "fuel", label: "Fuel", options: ["Petrol", "Diesel", "Hybrid", "Electric"] },
    { key: "body", label: "Body Type", options: ["SUV", "Sedan", "Hatchback", "Wagon", "Pickup", "Van", "Truck"] },
  ],
  property: [
    { key: "propertyType", label: "Property Type", options: ["Apartment", "House", "Land", "Commercial", "Office", "Warehouse"] },
    { key: "bedrooms", label: "Bedrooms", options: ["1", "2", "3", "4", "5+"] },
    { key: "bathrooms", label: "Bathrooms", options: ["1", "2", "3", "4+"] },
    { key: "size", label: "Size (sqm)" },
    { key: "furnished", label: "Furnished", options: ["Furnished", "Semi-furnished", "Unfurnished"] },
    { key: "status", label: "Status", options: ["For Sale", "For Rent", "For Lease"] },
  ],
  phones: [
    { key: "brand", label: "Brand", options: ["Apple", "Samsung", "Tecno", "Infinix", "Huawei", "Xiaomi", "Oppo", "Nokia", "Other"] },
    { key: "model", label: "Model" },
    { key: "storage", label: "Storage", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
    { key: "ram", label: "RAM", options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
    { key: "color", label: "Color" },
  ],
  electronics: [
    { key: "brand", label: "Brand" },
    { key: "type", label: "Type", options: ["TV", "Sound System", "Appliance", "Console", "Other"] },
    { key: "size", label: "Size" },
  ],
  computers: [
    { key: "brand", label: "Brand", options: ["HP", "Dell", "Lenovo", "Apple", "Asus", "Acer", "Other"] },
    { key: "ram", label: "RAM", options: ["4GB", "8GB", "16GB", "32GB"] },
    { key: "storage", label: "Storage", options: ["256GB SSD", "512GB SSD", "1TB HDD", "1TB SSD", "2TB"] },
    { key: "processor", label: "Processor", options: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "Apple M1", "Apple M2"] },
  ],
  fashion: [
    { key: "size", label: "Size" },
    { key: "gender", label: "Gender", options: ["Men", "Women", "Kids", "Unisex"] },
    { key: "material", label: "Material" },
  ],
  home: [
    { key: "material", label: "Material", options: ["Wood", "Metal", "Leather", "Fabric", "Plastic", "Glass"] },
    { key: "color", label: "Color" },
  ],
  jobs: [
    { key: "jobType", label: "Job Type", options: ["Full-time", "Part-time", "Contract", "Internship"] },
    { key: "salary", label: "Salary Period", options: ["Monthly", "Daily", "Weekly"] },
  ],
  services: [
    { key: "availability", label: "Availability", options: ["Weekdays", "Weekends", "Flexible"] },
  ],
  agriculture: [
    { key: "quantity", label: "Quantity" },
    { key: "origin", label: "Origin District" },
  ],
  business: [
    { key: "businessType", label: "Business Type", options: ["Shop", "Restaurant", "Salon", "Workshop", "Supermarket", "Other"] },
  ],
  other: [],
};

export const conditions = ["Brand New", "Like New", "Used - Good", "Used - Fair", "For Parts"];
