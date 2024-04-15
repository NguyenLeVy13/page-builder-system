import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
