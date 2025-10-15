import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E5E5E5",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
