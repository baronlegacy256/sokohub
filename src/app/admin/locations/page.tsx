import { locations, districts, ads } from "@/lib/catalog";

export default function AdminLocationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Locations</h1>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">+ Add location</button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-400">Structure: Country → Region → District → City/Town → Area. Editable rows reflect the seeded location tree.</p>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs text-slate-400"><tr><th className="pb-2">City</th><th>District</th><th>Country</th><th>Listings</th><th></th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {locations.map((l, i) => (
              <tr key={l}>
                <td className="py-2 font-medium">{l}</td>
                <td>{districts[i % districts.length]}</td>
                <td>Uganda</td>
                <td>{ads.filter((a) => a.location === l).length}</td>
                <td className="space-x-3 text-xs"><button className="text-green-700">Edit</button><button className="text-slate-500">Disable</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
