import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export default function ArtistList({ artistArray }) {
  const [rawArtistList, setRawArtistList] = useState(artistArray);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 style={{ fontSize: 20 }}>{loading}</h1>
            <h1 style={{ fontSize: 20 }}>{JSON.stringify(rawArtistList)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
