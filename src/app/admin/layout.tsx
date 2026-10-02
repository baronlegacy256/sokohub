import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl items-start gap-5 px-3 py-5">
      <AdminSidebar />
      <div className="min-w-0 flex-1 space-y-4">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
