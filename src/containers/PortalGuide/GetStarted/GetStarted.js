import { Box, Grid, Typography } from "@mui/material"
import logo from "assets/logo.png"
export const GetStarted = () => {
  return (
    <Box padding="48px">
      <Grid container justifyContent="center" padding="25px">
        <img src={logo} style={{ width: '300px' }} />
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" textAlign="center">
            Welcome to the LEAP Portal User Guide
          </Typography>
          <Typography textAlign="center">
            <h4>
              Landlord platform is for allowing Admins, Landlords, Full Portfolios, Multi-Site, and
              Property Managers, to interact with Leap Insurance and Application data, file and
              track Insurance Claims and view the financial impact of having Leap as a service.
            </h4>
            <h4>
              The general purpose will be to assist users with tracking portfolio performance with
              Leap.
            </h4>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}