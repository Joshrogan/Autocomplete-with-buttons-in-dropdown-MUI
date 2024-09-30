import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

function CustomPaper({ children, buttons, ...other }) {
  return (
    <Paper {...other}>
      {children}
      {buttons}
    </Paper>
  );
}

export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickIn = () => {
    setOpen(true);
  };

  const buttons = (
    <Box sx={{ display: "flex", direction: "row" }}>
      <Chip
        label="Accept"
        sx={{ margin: 1 }}
        onMouseDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          event.preventDefault();
        }}
        onClick={() => {
          console.log("Accept clicked");
          handleClickAway();
        }}
      />
      <Chip
        label="Cancel"
        sx={{ margin: 1 }}
        onMouseDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          event.preventDefault();
        }}
        onClick={() => console.log("Cancel clicked")}
      />
    </Box>
  );
  return (
    <>
      <Chip label="tab to me 1" onClick={() => console.log("tab clicked")} />
      <div
        className="App"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            handleClickAway();
          }
        }}
      >
        <Paper sx={{ padding: 1 }}>
          <Autocomplete
            freeSolo
            onFocus={(event) => {
              handleClickIn();
            }}
            onClose={(event, reason) => {
              if (reason === "escape") {
                handleClickAway();
              }
            }}
            onOpen={(event) => {
              handleClickIn();
            }}
            open={open}
            disablePortal
            options={["one", "two", "three", "four"]}
            renderInput={(params) => <TextField {...params} />}
            ListboxProps={{ sx: { maxHeight: 100 } }}
            PaperComponent={CustomPaper}
            componentsProps={{ paper: { buttons: buttons } }}
          />
        </Paper>
      </div>
      <Chip label="tab to me 2" onClick={() => console.log("tab clicked")} />
    </>
  );
}
