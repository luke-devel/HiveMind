import React from "react";

function Border({ border }) {
  let styles = {
    color: "#212529",
    fontSize: border.fontSize,
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "900",
    marginBottom: "0px"
  };
  return (
    <div>
      <div
        className="center"
        style={{
          margin: "auto",
          width: border.width,
          border: `${border.borderSize} solid #212529`,
          padding: "2px",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          textAlign: "center"
        }}
      >
          <h3 style={styles}>{border.title} </h3>
      </div>
    </div>
  );
}

export default Border;
