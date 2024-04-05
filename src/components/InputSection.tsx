"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

type InputSectionProps = {
  title: string;
  placeholder: string;
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
};

export default function InputSection({
  title,
  placeholder,
  setData,
  data,
}: InputSectionProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      setData((prevItems) => [...prevItems, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center mt-2">
        <Grid container>
          <Grid item xs={8}>
            <TextField
              id={title}
              name={title}
              label=""
              fullWidth
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              style={{ height: "35px", top: "8px", left: "16px" }}
              onClick={handleAddClick}
              // className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              component="label"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
      <ul className="mt-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b border-gray-300"
          >
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
