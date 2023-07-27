import React from "react";
import { Button } from "@mui/material";

function Success() {
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

      <h1>Thank you for your purchase 🎉</h1>
    </div>
  );
}

export default Success;
