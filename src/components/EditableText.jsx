import React, { useRef, useState } from "react";
import { Typography, TextField, IconButton, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// Mapping of Typography variants to their corresponding font sizes
const variantFontSizeMap = {
  h1: "2.5rem",
  h2: "2rem",
  h3: "1.75rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1rem",
  subtitle1: "1rem",
  subtitle2: "0.875rem",
  body1: "1rem",
  body2: "0.875rem",
};

const EditableText = ({ initialText, variant = "body1", ...typographyProps }) => {
  console.log("initialText", initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(initialText);
  const [hover, setHover] = useState(false);
  const textFieldRef = useRef(null); // Ref for the TextField

  const handleHover = () => setHover(true);
  const handleLeave = () => setHover(false);

  const handleEditClick = () => {
    setTempText(text);
    setIsEditing(true);
  };

  const handleApply = () => {
    setText(tempText);
    setIsEditing(false);
    setHover(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
    setHover(false);
  };

  React.useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus(); // Focus the TextField when editing
    }
  }, [isEditing]);

  const fontSize = variantFontSizeMap[variant] || variantFontSizeMap.body1; // Default to body1 if variant not found

  return (
    <>
      {isEditing ? (
        <Box {...typographyProps} sx={{ ...typographyProps.sx, position: "relative" }}>
          <TextField
            inputRef={textFieldRef}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            multiline
            sx={{
              "& .MuiInputBase-input": {
                fontSize: fontSize,
                padding: 1,
              },
              "& .MuiInputBase-textarea": {
                fontSize: fontSize,
                padding: 1,
              },
              "& .MuiOutlinedInput-root": {
                padding: 0,
              },
            }}
          />
          <Box display="flex" justifyContent="flex-end" mt={1} sx={{ position: "absolute", right: 0 }}>
            <IconButton
              onClick={handleApply}
              color="primary"
              sx={{
                "&:not(:hover)": {
                  backgroundColor: "grey.100",
                  color: "grey.600",
                },
              }}>
              <CheckIcon />
            </IconButton>
            <IconButton
              onClick={handleCancel}
              color="secondary"
              sx={{
                "&:not(:hover)": {
                  backgroundColor: "grey.100",
                  color: "grey.600",
                },
              }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={handleEditClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          bgcolor={hover ? "grey.300" : "transparent"}
          p={1}
          borderRadius={1}
          {...typographyProps}>
          <Typography style={{ cursor: "pointer", fontSize: fontSize }}>{text}</Typography>
        </Box>
      )}
    </>
  );
};

export default EditableText;
