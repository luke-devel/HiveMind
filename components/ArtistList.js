import React, { useState, useEffect } from "react";

export default function ArtistList({ ArtistList }) {
  const [addedArtistsList, setAddedArtistsList] = useState(ArtistList);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 style={{ fontSize: 20 }}>{JSON.stringify(ArtistList.title)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
