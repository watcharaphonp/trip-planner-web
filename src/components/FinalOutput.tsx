import React from "react";
import Markdown from "@/components/Markdown";

interface FinalOutputProps {
  tripPlan: any[];
}

export const FinalOutput: React.FC<FinalOutputProps> = ({ tripPlan }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold my-2">Final Output</h2>
      <div
        className="flex-grow overflow-auto border-2 border-gray-300 p-2"
        style={{
          border: "1px solid grey",
          height: `${tripPlan?.length ? "fit-content" : "100px"}`,
        }}
      >
        {tripPlan?.length ? (
          tripPlan.map((output, index) => {
            return (
              <div key={index} className="p-2 border-b border-gray-200">
                <Markdown className="markdown">{output.data}</Markdown>
              </div>
            );
          })
        ) : (
          <div className="p-2 border-b border-gray-200">No result yet.</div>
        )}
      </div>
    </div>
  );
};
