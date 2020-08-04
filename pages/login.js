import Footer from "../components/Footer";
import Login from "../components/Login";
import Header from "../components/Header";

export default function Index() {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "96vh",
          backgroundColor: "#EF7B73",
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
