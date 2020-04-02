import Footer from "../components/Footer";
import Login from "../components/Login";

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
          <Login />
        </div>
      </div>
      <Footer />
    </>
    );
  }
  