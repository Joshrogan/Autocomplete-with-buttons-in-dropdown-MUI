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

function generateRandomSchools(count) {
  console.log("## generated");
  const schools = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < count; i++) {
    const randomLetters = Array.from(
      { length: Math.floor(Math.random() * 15) + 5 },
      () => alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    ).join("");

    const title = `School ${randomLetters}`;
    const key = title;

    schools.push({ title, key });
  }

  return schools;
}

const schools = generateRandomSchools(100);
console.log(schools);

export default function App() {
  const [value, setValue] = React.useState([]);
  const [isBlurred, setIsBlurred] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleClickAway = () => {
    setOpen(false);
    setInputValue("");
  };

  const handleClickIn = () => {
    setOpen(true);
  };

  const buttons = (
    <Box sx={{ display: "flex", direction: "row" }}>
      <Divider />
      <Chip
        label="Clear Selection"
        sx={{ margin: 1 }}
        onKeyDown={(event) => {
          // Prevent input blur which triggers closing the Popper

          const EVENT_TYPES = ["Escape", "Esc"];
          if (EVENT_TYPES.includes(event.key)) {
            handleClickAway();
          }
        }}
        onMouseDown={(event) => {
          // Prevent input blur which triggers closing the Popper

          const EVENT_TYPES = ["Escape", "Esc"];
          if (EVENT_TYPES.includes(event.key)) {
            handleClickAway();
          }
        }}
        onClick={() => {
          setValue([]);
          setInputValue("");
          console.log("Clear Selection Clicked");
        }}
      />
      <Chip
        label="Apply"
        sx={{ margin: 1 }}
        onKeyDown={(event) => {
          // Prevent input blur which triggers closing the Popper
          // event.preventDefault();

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
          console.log("Apply clicked");
          handleClickAway();
        }}
      />
    </Box>
  );
  return (
    <>
      <Chip
        label="dummy tab focus 1"
        onClick={() => console.log("tab clicked")}
      />
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
              return [
                { title: "Select All...", all: true, key: "all" },
                ...filtered,
              ];
            }}
            onChange={(event, newValue) => {
              if (newValue.find((option) => option.all))
                return setValue(value.length === schools.length ? [] : schools);

              setValue(newValue);
            }}
            open={open}
            disablePortal
            disableClearable
            onBlur={() => setIsBlurred(true)}
            onFocus={() => setIsBlurred(false)}
            options={schools}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Start typing to find a School"
                  onChange={(e) => setInputValue(e.target.value)}
                  slotProps={{
                    htmlInput: {
                      style: {
                        width: isBlurred && value.length ? 0 : "auto",
                        minWidth: isBlurred && value.length ? 0 : "auto",
                        height: isBlurred && value.length ? 0 : "auto",
                        padding: isBlurred && value.length ? 0 : "auto",
                      },
                      ...params.inputProps,
                    },
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
            renderOption={(props, option, { selected }) => {
              const { key, ...restProps } = props;
              return (
                <React.Fragment key={option.key}>
                  <li {...restProps}>
                    <Checkbox
                      icon={icon}
                      tabIndex={-1}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={
                        option.all
                          ? !!(value.length === schools.length)
                          : selected
                      }
                      indeterminate={
                        option.all
                          ? !!(value.length && value.length !== schools.length)
                          : undefined
                      }
                    />
                    {option.title}
                  </li>
                  {option.all ? <Divider /> : null}
                </React.Fragment>
              );
            }}
            PaperComponent={CustomPaper}
            slotProps={{ paper: { buttons: buttons } }}
          />
        </Paper>
      </div>
      <Chip
        label="dummy tab focus 2"
        onClick={() => console.log("tab clicked")}
      />
    </>
  );
}
