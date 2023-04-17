import "../styles/globals.css";
import SupabaseProvider from "@components/supabase-provider";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-full">
          <SupabaseProvider>{children}</SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
