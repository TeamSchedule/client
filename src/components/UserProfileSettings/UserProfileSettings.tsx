import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

export default function UserProfileSettings() {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [thirdName, setThirdName] = useState<string>("");

  return (
    <>
      <TextField
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        margin="dense"
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="firstName"
        label="Имя"
        sx={{ mt: 2 }}
      />
      <TextField
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
        margin="dense"
        required
        fullWidth
        id="lastName"
        label="Фамилия"
        name="lastName"
        autoComplete="family-name"
      />
      <TextField
        value={thirdName}
        onChange={(e) => setThirdName(e.target.value)}
        margin="dense"
        fullWidth
        id="lastName"
        label="Отчество"
        name="lastName"
        autoComplete="family-name"
      />
    </>
  );
}
