import Index from "../pages";

export default function Footer() {
  return (
    <div className="container-fluid" style={{ background: "#EF7B73" }}>
      <div className="row">
        <div className="col-lg-12 spacer"></div>
      </div>
      <div className="row">
        <div className="col-lg-12 footer">
          <p className="text-center copyright" style={{ fontFamily:"Roboto",  fontWeight:"700", color:"#212529" }}>Copyright © 2020 - HiveMind</p>
        </div>
      </div>
    </div>
   
  );
}
