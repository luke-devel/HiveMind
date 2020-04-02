import Footer from "../components/Footer";
import Register from "../components/Register";

export default function Index() {
  return (
    <>
      <div
        style={{
          minHeight: "100%",
          minHeight: "96vh",
          backgroundColor: "#EF7B73",
          border: "5px solid #212529"
        }}
      >
        <div style={{ paddingTop: "10vh" }}>
          <Register />
        </div>
      </div>
      <Footer />
    </>
  );
}
