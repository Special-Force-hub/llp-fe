import { DashboardLayoutContainer } from "components/Layouts/DashboardLayout";
import { Box } from "@mui/material";
import { IconGraphy, Typography, colors, Tab, Grid } from "@leapeasy/ui-kit";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openDetails } from "store/actions/uiActions";

const TABS = [
  { title: "Full Portfolio" },
  { title: "Multi-Site" },
  { title: "Property Manager" }
];
export const InvitePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

  const onClickBack = useCallback(() => {
    dispatch(openDetails(null));

    setTimeout(() => {
      navigate("/user/invite-new-user");
    });
  }, []);

  return (
    <DashboardLayoutContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <Box sx={{ cursor: 'pointer', '&:hover': { opacity: 0.75 } }}>
          <IconGraphy icon="Arrow.ArrowBack" onClick={onClickBack} />
        </Box>
        <Typography
          variant="h3"
          style={{ color: colors.purple[900], fontWeight: '500', padding: '5px 5px 5px 15px' }}
        >
          Invite New User
        </Typography>
      </Box>

      <Box
        padding="24px 12px"
        borderRadius="12px"
        mt={1}
        sx={{ background: 'white' }}
      >
        <Grid>
          {TABS.map((tab, index) => (
            <Tab
              title={tab.title}
              isSelected={selectedTab === index}
              onClick={() => setSelectedTab(index)}
            />
          ))}
        </Grid>

        <Box marginTop="20px">
          {/* {selectedTab === 0 && <CancellationsTab building={building} />}
          {selectedTab === 1 && <ApplicationTab building={building} />}
          {selectedTab === 2 && <PolicyTab building={building} />} */}
        </Box>
      </Box>
    </DashboardLayoutContainer>
  )
}