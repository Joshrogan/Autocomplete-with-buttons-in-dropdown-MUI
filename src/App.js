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
  const options = ["one", "two", "three", "four"];
  const buttonRef = React.useRef();

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
        onKeyDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          // event.preventDefault();
          console.log(event);
          const EVENT_TYPES = ["Escape", "Esc"];
          if (EVENT_TYPES.includes(event.key)) {
            handleClickAway();
          }
        }}
        onMouseDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          event.preventDefault();
        }}
        onClick={() => {
          console.log("Accept clicked");
          // buttonRef?.current?.focus();
          handleClickAway();
        }}
      />
      <Chip
        label="Cancel"
        sx={{ margin: 1 }}
        onKeyDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          // event.preventDefault();
          console.log(event);
          const EVENT_TYPES = ["Escape", "Esc"];
          if (EVENT_TYPES.includes(event.key)) {
            handleClickAway();
            // buttonRef?.current?.focus();
          }
        }}
        onMouseDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          // event.preventDefault();
          console.log(event);
          const EVENT_TYPES = ["Escape", "Esc"];
          if (EVENT_TYPES.includes(event.key)) {
            handleClickAway();
            // buttonRef?.current?.focus();
          }
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
            multiple
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
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                // work around for safari, but safari is borked
                // inputProps={{
                //   ...params.inputProps,
                //   onBlur: undefined,
                // }}
              />
            )}
            ListboxProps={{ sx: { maxHeight: 100 } }}
            PaperComponent={CustomPaper}
            componentsProps={{ paper: { buttons: buttons } }}
          />
        </Paper>
      </div>
      <Chip
        label="tab to me 2"
        onClick={() => console.log("tab clicked")}
        ref={buttonRef}
      />
    </>
  );
}
