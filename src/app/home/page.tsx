"use client";

import { EventLog } from "@/components/EventLog";
import { FinalOutput } from "@/components/FinalOutput";
import InputSection from "@/components/InputSection";
import { useCrewJob } from "@/hooks/useCrewJob";
import Page from "@/components/Page";
import {
  Grid,
  Button,
  Box,
  Container,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function HomePage() {
  // Hooks
  const crewJob = useCrewJob();

  return (
    <Page>
      <Container component="main" style={{ maxWidth: "unset" }}>
        <Grid container>
          <Grid item xs={6}>
            <InputSection
              title="Origin"
              placeholder="Add your origin"
              data={crewJob.origin}
              setData={crewJob.setOrigin}
            />
            <InputSection
              title="Destination city"
              placeholder="Add your destination city"
              data={crewJob.city}
              setData={crewJob.setCity}
            />
            <InputSection
              title="Interest"
              placeholder="Add your interest about the city"
              data={crewJob.interest}
              setData={crewJob.setInterest}
            />
            <InputSection
              title="Travel Date"
              placeholder="Travel date Ex. 24 Jan 2024 to 30 Jan 2024"
              data={crewJob.travelDateRange}
              setData={crewJob.setTravelDateRange}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={3}>
                <h2 className="text-2xl font-bold">Create Trip Plan</h2>
              </Grid>
              <Grid item xs={9}>
                <Button
                  style={{ height: "35px", top: "16px" }}
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  // startIcon={<KeyboardDoubleArrowRightIcon />}
                  onClick={() => crewJob.startJob()}
                  disabled={crewJob.running}
                >
                  {crewJob.running ? "Running..." : "Start"}
                </Button>
              </Grid>
            </Grid>
            <FinalOutput tripPlan={crewJob.tripPlan} />
            <EventLog events={crewJob.events} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}