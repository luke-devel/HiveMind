import Footer from "../components/Footer";
import Register from "../components/Register";

export default function Index() {
  return (
    <>
      <div
        style={{
          minHeight: "100%",
          minHeight: "100vh",
          backgroundColor: "#EF7B73",
          marginTop: "-16px"
        }}
      >
        <div style={{ paddingTop: "15vh" }}>
          <Register />
        </div>
      </div>
      <Footer />
    </>
  );
}
