import { searchTerms } from "@/lib/admin";

export default function SearchAnalyticsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Search Analytics</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr><th className="p-3">Search term</th><th>Searches</th><th>Results</th><th>No-result rate</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {searchTerms.map((s) => (
              <tr key={s.term}>
                <td className="p-3 font-medium">{s.term}</td>
                <td>{s.searches.toLocaleString()}</td>
                <td>{s.results}</td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${s.noResult > 15 ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"}`}>{s.noResult}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400">High no-result rates signal inventory gaps worth addressing with more listings or better categories.</p>
    </div>
  );
}
