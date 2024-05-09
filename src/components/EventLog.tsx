import React from "react";
import { Event } from "../../types";
import { EventType } from "@/hooks/useCrewJob";
import { green } from "@mui/material/colors";
import { Done } from "@mui/icons-material";
import { Stack } from "@mui/material";

// This component will receive props to update events.
type EventLogProps = {
  events: EventType[];
};

export const EventLog: React.FC<EventLogProps> = ({ events }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Event Details</h2>
      <div
        className={`flex-grow overflow-auto border-2 border-gray-300 p-2 rounded-lg ${
          events.length === 0 ? "bg-gray-200" : ""
        }`}
        style={{
          border: "1px solid grey",
          height: `${events.length ? "fit-content" : "100px"}`,
        }}
      >
        {events.length === 0 ? (
          <div className="p-2 border-b border-gray-200 output-log-container">
            <Stack direction="row" spacing={2} style={{ marginTop: "12px" }}>
              <p>No events yet.</p>
            </Stack>
          </div>
        ) : (
          events.map((event, index) => {
            return (
              <div
                key={index}
                className="p-2 border-b border-gray-200 output-log-container"
              >
                <Stack
                  direction="row"
                  spacing={2}
                  style={{ marginTop: "12px" }}
                >
                  <Done style={{ color: green[500] }} />
                  <p>{event.data}</p>
                </Stack>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
