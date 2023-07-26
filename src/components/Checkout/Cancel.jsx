import React from "react";
import { Button } from "@mui/material";

function Cancel() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Courier New, monospace",
      }}
    >

      <h1 style={{ fontFamily: "Arial" }}>
        😢 transaction canceled
      </h1>
    </div>
  );
}

export default Cancel;
