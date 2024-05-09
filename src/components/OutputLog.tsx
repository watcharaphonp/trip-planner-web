import React from "react";
import Markdown from "@/components/Markdown";

interface OutputLogProps {
  content: string;
  title: string;
}

export const OutputLog: React.FC<OutputLogProps> = ({
  content = "",
  title,
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold my-2">{title}</h2>
      <div
        className={`flex-grow overflow-auto border-2 border-gray-300 p-2 rounded-lg ${
          content === "" ? "bg-gray-200" : ""
        }`}
        style={{
          border: "1px solid grey",
          height: `${content !== "" ? "fit-content" : "100px"}`,
        }}
      >
        {content !== "" ? (
          <div className="p-2 border-b border-gray-200 output-log-container">
            <Markdown className="markdown">{content}</Markdown>
          </div>
        ) : (
          <div className="p-2 border-b border-gray-200 output-log-container">
            <p className="markdown-text">{`No ${title.toLocaleLowerCase()} yet.`}</p>
          </div>
        )}
      </div>
    </div>
  );
};
