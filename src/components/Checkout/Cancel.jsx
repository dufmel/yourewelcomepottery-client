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
      <Button variant="contained" href="http://localhost:5173/">
        HOME
      </Button>

      <h1 style={{ fontFamily: "Courier New, monospace" }}>
        😢 payment successfully canceled
      </h1>
    </div>
  );
}

export default Cancel;
