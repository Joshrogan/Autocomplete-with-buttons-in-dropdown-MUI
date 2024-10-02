import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Divider from "@mui/material/Divider";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CustomPaper({ children, buttons, ...other }) {
  return (
    <Paper {...other}>
      {children}
      <Divider />
      {buttons}
    </Paper>
  );
}
const schools = [
  { title: "School A", key: "School A" },
  { title: "School B", key: "School B" },
  { title: "School C", key: "School C" },
  { title: "School D", key: "School D" },
];

export default function App() {
  // const schools = ["School A", "School B", "School C", "School D"];

  const buttonRef = React.useRef();
  const [value, setValue] = React.useState([]);
  console.log(value);
  const [isBlurred, setIsBlurred] = React.useState(true);
  console.log("# isBlurred", isBlurred);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickIn = () => {
    setOpen(true);
  };

  const buttons = (
    <Box sx={{ display: "flex", direction: "row" }}>
      <Divider />
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
            multiple
            onClose={(event, reason) => {
              if (reason === "escape") {
                handleClickAway();
              }
            }}
            onOpen={(event) => {
              handleClickIn();
            }}
            value={value}
            inputValue={inputValue}
            filterOptions={(options, params) => {
              // <<<--- inject the Select All option
              const filter = createFilterOptions();
              const filtered = filter(options, params);
              return [{ title: "Select All...", all: true }, ...filtered];
            }}
            onChange={(event, newValue) => {
              if (newValue.find((option) => option.all))
                return setValue(value.length === schools.length ? [] : schools);

              setValue(newValue);
            }}
            open={open}
            disablePortal
            // onChange={(event, value) => setValue(value)}
            onBlur={() => setIsBlurred(true)}
            onFocus={() => setIsBlurred(false)}
            // sx={{
            //   minWidth: isBlurred ? 0 : "auto",
            //   transition: "min-width 0.2s", // smooth transition
            // }}
            options={schools}
            renderInput={(params) => {
              console.log(params); // Logs the params object
              console.log(params.value); // Logs the params object

              return (
                <TextField
                  {...params}
                  placeholder="Start typing to find a School"
                  onChange={(e) => setInputValue(e.target.value)}
                  inputProps={{
                    style: {
                      width: isBlurred && value.length ? 0 : "auto",
                      minWidth: isBlurred && value.length ? 0 : "auto",
                      height: isBlurred && value.length ? 0 : "auto",
                      padding: isBlurred && value.length ? 0 : "auto",
                    },
                    ...params.inputProps,
                  }}
                />
              );
            }}
            renderTags={(value, getTagProps) => {
              const numTags = value.length;
              return (
                <Typography variant="body2" style={{ width: "100%" }}>
                  {`${numTags} Schools Selected`}
                </Typography>
              );
            }}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <>
                <li {...props} key={option.key}>
                  <Checkbox
                    icon={icon}
                    tabIndex={-1}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    // checked={selected} <<<--- OLD
                    checked={
                      option.all
                        ? !!(value.length === schools.length)
                        : selected
                    }
                  />
                  {option.title}
                </li>
                {option.all ? <Divider /> : null}
              </>
            )}
            ListboxProps={{ sx: { maxHeight: 300 } }}
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
