"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

type InputSectionProps = {
  title: string;
  placeholder: string;
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
  isSubmit?: boolean;
};

export default function InputSection({
  title,
  placeholder,
  setData,
  data,
  required = false,
  disabled = false,
  isSubmit = false,
}: InputSectionProps) {
  const [isShowError, setIsShowError] = useState<boolean>(false);

  useEffect(() => {
    setIsShowError(isSubmit && data.trim() === "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center mt-2">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id={`${required ? "outlined-required" : ""} ${
                disabled ? "outlined-disabled" : ""
              }`}
              name={title}
              label={placeholder}
              fullWidth
              variant="standard"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={placeholder}
              required={required}
              error={isShowError}
              helperText={isShowError ? `${title} is empty` : ""}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
