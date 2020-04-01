export default function Header() {
  return (
    <nav
      class="navbar navbar-default"
      role="navigation"
      style={{ backgroundColor: "#EF7B73" }}
    >
      <div class="navbar-header" style={{ padding: "40px", textAlign:"center" }}></div>
      <a
        class="navbar-brand"
        href="/profile"
        style={{
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "50px",
            fontFamily: "Roboto",
            textAlign: "center",
            paddingTop: "20px",
            fontStyle: "italic",
            fontWeight: "900",
            marginBottom: "10px",
            color: "#212529"
          }}
        >
          hivemind
        </h3>
      </a>

      <ul class="nav navbar-nav navbar-right">
        <li>
          <a
            href="/logout"
            style={{
              fontFamily: "Roboto",
              fontWeight: "900",
              color: "#212529",
              fontStyle: "italic",
              fontSize: 20,
              paddingRight: 30
            }}
          >
            logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
