import React, { useState, useEffect } from "react";

export default function ArtistList({ ArtistList }) {
  const [addedArtistsList, setAddedArtistsList] = useState(
    JSON.stringify(ArtistList)
      .replace(/\\n/g, "")
      .replace(/\\/g, "")
      .slice(7, -1)
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 style={{ fontSize: 20 }}>{addedArtistsList}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
