import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="p-3">{children}</div>
    </>
  );
}
