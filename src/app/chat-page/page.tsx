"use client";

import { EventLog } from "@/components/EventLog";
import { OutputLog } from "@/components/OutputLog";
import { useCrewJob } from "@/hooks/useCrewJob";
import MessageBox from "@/components/MessageBox";
import Page from "@/components/Page";
import { Container, TextField, Grid, Button, Box } from "@mui/material";
import { useState } from "react";

export default function ChatPage() {
  // Hooks
  const crewJob = useCrewJob();

  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleClick = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };

  const findEndDate = (travelDaysAnswer: string) => {
    const listOfNumberInString = travelDaysAnswer.match(/\d/g);
    const totalDays = listOfNumberInString
      ? parseInt(listOfNumberInString[0])
      : 0;
  };

  const BotMessageTemplate = [
    {
      id: 1,
      message:
        "Hello, I am Trip Planner Agent. Would you like me to help plan your trip?",
    },
    {
      id: 2,
      message: "Great, I'd love to know where you'd like to travel from?",
      callBack: crewJob.setOrigin,
    },
    {
      id: 3,
      message: `Okay, which city or country will you start your journey from ${crewJob.origin} to?`,
      callBack: crewJob.setCity,
    },
    {
      id: 4,
      message: `It's a very nice place. When will you start your journey from ${crewJob.setOrigin}? (Ex. 20 Jan 2024)`,
      callBack: setStartDate,
    },
    {
      id: 5,
      message: `When do you intend to return to ${crewJob.setOrigin}? (Ex. 30 Jan 2024)`,
      callBack: setEndDate,
    },
    {
      id: 6,
      message: `Last question, What things or activities interest you about ${crewJob.city} ?`,
      callBack: crewJob.setInterest,
    },
    {
      id: 7,
      message: "Process successfully. Here you can see your trip plan 🍀",
    },
  ];

  return (
    <Page className="form-page">
      <Container component="main">
        <Grid container>
          <Grid item xs={6}>
            <div
              style={{
                padding: "20px",
                width: "65vw",
                border: "1px solid red",
                height: "80vh",
                position: "absolute",
                left: "20px",
              }}
            >
              <div>Output</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              className="flex flex-col space-y-4"
              style={{
                border: "1px solid green",
                right: "10px",
                padding: "20px",
                height: "80vh",
                position: "absolute",
                width: "27vw",
              }}
            >
              <div
                className="chat-container"
                style={{ border: "1px solid red", height: "100%" }}
              >
                <MessageBox
                  title="Trip Planner Agent"
                  time="10.00 AM"
                  message="Hello, are you looking for someone to help you plan a trip?"
                  role="bot"
                />
                <MessageBox
                  title="User"
                  time="10.01 AM"
                  message="Hi, Can you help me to create a trip plan ?"
                  role="user"
                />
              </div>
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: "auto",
                }}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <TextField
                      id="chat"
                      name="chat"
                      label=""
                      fullWidth
                      variant="outlined"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      style={{ height: "35px", top: "8px", left: "16px" }}
                      component="label"
                      variant="contained"
                      onClick={handleClick}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
