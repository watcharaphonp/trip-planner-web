"use client";

import { EventLog } from "@/components/EventLog";
import { OutputLog } from "@/components/OutputLog";
import InputSection from "@/components/InputSection";
import { useCrewJob } from "@/hooks/useCrewJob";
import Page from "@/components/Page";
import { Grid, Button, Stack, Chip, CircularProgress } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "@/stores/rootReducer";
import { useSelector } from "react-redux";

export default function HomePage() {
  // Hooks
  const crewJob = useCrewJob();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [isFormSubmit, setIsformSubmit] = useState<boolean>(false);
  const language = useSelector(
    (state: RootState) => state.localization.language
  );
  const { t } = useTranslation();

  useEffect(() => {
    setIsSubmitDisabled(
      !crewJob.origin ||
        !crewJob.city ||
        !crewJob.interest ||
        !crewJob.travelDateRange
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crewJob.origin, crewJob.city, crewJob.interest, crewJob.travelDateRange]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crewJob.cityGuideInfo]);

  useEffect(() => {
    setIsformSubmit(crewJob.running);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crewJob.running]);

  return (
    <Page>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <InputSection
            title={t("Origin city")}
            placeholder="From where will you be traveling from?"
            data={crewJob.origin}
            setData={crewJob.setOrigin}
            required
            isSubmit={isFormSubmit}
          />
          <InputSection
            title={t("Destination city")}
            placeholder="What are the city you are interested in visiting?"
            data={crewJob.city}
            setData={crewJob.setCity}
            required
            isSubmit={isFormSubmit}
          />
          <InputSection
            title={t("Interest")}
            placeholder="Your high level interests and hobbies?"
            data={crewJob.interest}
            setData={crewJob.setInterest}
            required
            isSubmit={isFormSubmit}
          />
          <InputSection
            title={t("Travel Date")}
            placeholder="Travel Date Range (Ex. 24 Jan 2024 to 30 Jan 2024)"
            data={crewJob.travelDateRange}
            setData={crewJob.setTravelDateRange}
            required
            isSubmit={isFormSubmit}
          />
          <Stack direction="row" spacing={2} style={{ marginTop: "32px" }}>
            {crewJob.running && (
              <CircularProgress
                color="success"
                style={{ width: "24px", height: "24px" }}
              />
            )}
            <Button
              style={{ height: "35px" }}
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<KeyboardDoubleArrowRightIcon />}
              onClick={() => crewJob.startJob()}
              disabled={crewJob.running || isSubmitDisabled}
            >
              {crewJob.running ? "Running..." : "Start"}
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} style={{ marginTop: "60px" }}>
            <Chip
              label={`Total Cost: ${crewJob.totalCost}`}
              color={crewJob.totalCost ? "success" : "default"}
              variant="outlined"
            />
            <Chip
              label={`Total Token: ${crewJob.totalToken}`}
              color={crewJob.totalToken ? "success" : "default"}
              variant="outlined"
            />
            <Chip
              label={`Total Request: ${crewJob.totalRequest}`}
              color={crewJob.totalRequest ? "success" : "default"}
              variant="outlined"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <OutputLog title="General Info" content={crewJob.generalInfo} />
            <OutputLog title="City Guide" content={crewJob.cityGuideInfo} />
            <OutputLog title="Itenerary" content={crewJob.iteneraryInfo} />
            <EventLog events={crewJob.events} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
