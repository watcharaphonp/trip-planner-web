"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type EventType = {
  data: string;
  timestamp: string;
};

export type NamedUrl = {
  name: string;
  url: string;
};

export type PositionInfo = {
  company: string;
  position: string;
  name: string;
  blog_articles_urls: string[];
  youtube_interviews_urls: NamedUrl[];
};

export const useCrewJob = () => {
  // State
  const [running, setRunning] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const [interest, setInterest] = useState<string[]>([]);
  const [travelDateRange, setTravelDateRange] = useState<string[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [tripPlan, setTripPlan] = useState<any>();
  const [currentJobId, setCurrentJobId] = useState<string>("");

  // useEffects
  useEffect(() => {
    let intervalId: number;
    console.log("currentJobId", currentJobId);

    const fetchJobStatus = async () => {
      try {
        console.log("calling fetchJobStatus");
        const response = await axios.get<{
          status: string;
          result: any;
          events: EventType[];
          task_output: any;
        }>(`${process.env.backendUrl}/api/crew/${currentJobId}`);
        const {
          status,
          events: fetchedEvents,
          result,
          task_output,
        } = response.data;

        console.log("status update", response.data);

        setEvents(fetchedEvents);
        setTripPlan(task_output);
        if (result) {
          console.log("setting job result", result);
          console.log(task_output);
        }

        if (status === "COMPLETE" || status === "ERROR") {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setRunning(false);
          toast.success(`Job ${status.toLowerCase()}.`);
        }
      } catch (error) {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setRunning(false);
        toast.error("Failed to get job status.");
        console.error(error);
      }
    };

    if (currentJobId !== "") {
      intervalId = setInterval(fetchJobStatus, 7000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentJobId]);

  const startJob = async () => {
    // Clear previous job data
    setEvents([]);
    setTripPlan([]);
    setRunning(true);

    try {
      const response = await axios.post<{ job_id: string }>(
        `${process.env.backendUrl}/api/crew`,
        {
          origin,
          cities: city,
          interests: interest,
          date_range: travelDateRange,
        }
      );

      toast.success("Job started");

      console.log("jobId", response.data.job_id);
      setCurrentJobId(response.data.job_id);
    } catch (error) {
      toast.error("Failed to start job");
      console.error(error);
      setCurrentJobId("");
    }
  };

  return {
    running,
    events,
    setEvents,
    tripPlan,
    setTripPlan,
    currentJobId,
    setCurrentJobId,
    origin,
    setOrigin,
    city,
    setCity,
    interest,
    setInterest,
    travelDateRange,
    setTravelDateRange,
    startJob,
  };
};
