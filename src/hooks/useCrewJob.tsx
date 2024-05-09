"use client";

import { Task } from "@/configs/constant";
import { userInfoState } from "@/reduxs/user/slice";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

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
  const [origin, setOrigin] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [travelDateRange, setTravelDateRange] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [iteneraryInfo, setIteneraryInfo] = useState<string>("");
  const [cityGuideInfo, setCityGuideInfo] = useState<string>("");
  const [generalInfo, setGeneralInfo] = useState<string>("");
  const [currentJobId, setCurrentJobId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalToken, setTotalToken] = useState<number>(0);
  const [totalRequest, setTotalRequest] = useState<number>(0);

  interface sessionResponse {
    data: {
      traces: any[];
    };
  }

  const fetchMetrics = async (metrics: any) => {
    const session: sessionResponse = await axios.get(
      `${process.env.langfuseHost}/api/public/sessions/${sessionId}`,
      {
        auth: {
          username: `${process.env.langfusePublicKey}`,
          password: `${process.env.langfuseSecretKey}`,
        },
      }
    );

    if (session?.data?.traces?.length) {
      const traceList = session.data.traces;

      setTotalRequest(session.data.traces.length);
      setTotalToken(metrics?.total_tokens ?? 0);

      traceList.forEach(async (trace) => {
        const traceInfo: any = await axios.get(
          `${process.env.langfuseHost}/api/public/traces/${trace?.id}`,
          {
            auth: {
              username: `${process.env.langfusePublicKey}`,
              password: `${process.env.langfuseSecretKey}`,
            },
          }
        );
        setTotalCost((prev) => prev + traceInfo.data.totalCost);
      });
    }
  };

  const {
    user: { info: userInfo },
  } = useSelector(userInfoState);

  // useEffects
  useEffect(() => {
    let intervalId: number;
    if (currentJobId) console.log("currentJobId", currentJobId);

    const fetchJobStatus = async () => {
      try {
        console.log("calling fetchJobStatus");
        const response = await axios.get<{
          status: string;
          result: any;
          metrics: any;
          events: EventType[];
          task_output: any;
        }>(`${process.env.backendUrl}/api/crew/${currentJobId}`);
        const { status, events, result, metrics, task_output } = response.data;

        if (response.data) console.log("status update", response.data);

        setEvents(events);

        if (task_output.length) {
          const task = task_output[task_output.length - 1];
          const taskName: string = task.task;
          const taskOutput: string = task.data;

          switch (taskName) {
            case Task.Identify:
              setGeneralInfo(taskOutput);
              break;
            case Task.Gather:
              setCityGuideInfo(taskOutput);
              break;
            case Task.Plan:
              setIteneraryInfo(taskOutput);
              break;
            default:
              break;
          }
        }

        if (result) {
          console.log("setting job result", result);
        }

        if (metrics) {
          await fetchMetrics(metrics);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentJobId]);

  const startJob = async () => {
    const uniqueSessionId = uuidv4();
    // Clear previous job data
    setEvents([]);
    setTotalCost(0);
    setTotalRequest(0);
    setTotalToken(0);
    setCityGuideInfo("");
    setGeneralInfo("");
    setIteneraryInfo("");
    setSessionId(uniqueSessionId);
    setRunning(true);

    try {
      const response = await axios.post<{ job_id: string }>(
        `${process.env.backendUrl}/api/crew`,
        {
          user_id: userInfo.userId,
          session_id: uniqueSessionId,
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
    cityGuideInfo,
    setCityGuideInfo,
    generalInfo,
    setGeneralInfo,
    iteneraryInfo,
    setIteneraryInfo,
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
    totalCost,
    totalToken,
    totalRequest,
  };
};
