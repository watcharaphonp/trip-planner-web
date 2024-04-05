import React from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import profileImg from "@assets/images/profile.png";
import Typewriter from "typewriter-effect";

const MessageBox: React.FC<{
  title: string;
  time: string;
  message: string;
  role: string;
  style?: React.CSSProperties;
}> = ({ title, time, message, role, style }) => {
  return (
    <div
      className={`flex justify-${role !== "user" ? "start" : "end"}`}
      style={style}
    >
      <div
        className={`bg-${
          role !== "user" ? "gray" : "blue"
        }-200 rounded-lg p-2 max-w-sm message-box`}
        style={{ width: "50vw" }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="flex">
              {role !== "user" ? (
                <>
                  <Avatar
                    src={profileImg.src}
                    style={{
                      background: "#fff",
                      border: "2px solid #000",
                      width: "24px",
                      height: "24px",
                      bottom: "5px",
                    }}
                  />
                  <div style={{ padding: "0px 8px", color: "#2f751f" }}>
                    {title}
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "10px",
                      padding: "2px 0px 0px 6px",
                    }}
                  >
                    {time}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "10px",
                      padding: "2px 0px 0px 6px",
                    }}
                  >
                    {time}
                  </div>
                  <div style={{ padding: "0px 8px", color: "#f88f05" }}>
                    {title}
                  </div>
                  <Avatar
                    src={profileImg.src}
                    style={{
                      background: "#fff",
                      border: "2px solid #000",
                      width: "24px",
                      height: "24px",
                      bottom: "5px",
                    }}
                  />
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Typewriter
          options={{
            delay: 10,
            strings: message,
            autoStart: true,
            cursor: "",
          }}
        />
      </div>
    </div>
  );
};

export default MessageBox;
