import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { AjaxHandler, AjaxConfig } from "../../../../utils/AjaxHandler";

const TranslationRecordCreationComponent: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [text, setText] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  const handleSubmit = async () => {
    if (!date || !datetime || !text) {
      alert("Please fill in all fields.");
      return;
    }

    // Format dates to match backend requirements
    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedDatetime = format(datetime, "yyyy-MM-dd'T'HH:mm:ss");
    
    const requestData = {
      OriginalText: text,
      FromLanguage: language,
      TranslatedText: "", // Optional, if needed.
      ToLanguage: language, // Defaulting to selected language.
      DayUtc: formattedDatetime, // Ensure format matches backend DTO.
    };

    try {
      const domain = AjaxHandler.getInstance().getDomain();
      const config: AjaxConfig = {
        url: `${domain}/api/translationrecord/create`,
        method: "POST",
        data: requestData,
        beforeSend: () => console.log("Sending data to server..."),
        success: (response: any) => {
          console.log("Record created successfully:", response);
          alert("Record created successfully!");
        },
        error: (error: any) => {
          console.error("Error creating record:", error);
          alert("Failed to create record.");
        },
      };

      AjaxHandler.getInstance().sendRequest(config);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={600}
        margin="0 auto"
        padding={4}
      >
        <Typography variant="h5" textAlign="center">
          Create Translation Record
        </Typography>

       {/* Date Picker */}
       <DatePicker
          label="Select Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          slots={{ textField: (params) => <TextField {...params} /> }}
        />

        {/* DateTime Picker */}
        <DateTimePicker
          label="Select Date & Time"
          value={datetime}
          onChange={(newDatetime) => setDatetime(newDatetime)}
          slots={{ textField: (params) => <TextField {...params} /> }}
        />

        {/* Text Input */}
        <TextField
          label="Text Input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
        />

        {/* Language Select */}
        <TextField
          select
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">Chinese</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default TranslationRecordCreationComponent;
