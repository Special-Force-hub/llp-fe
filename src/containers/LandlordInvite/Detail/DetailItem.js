import React from "react";
import { Box } from "@mui/material";
import { Typography, colors } from "@leapeasy/ui-kit";

export const DetailItem = ({ label, value, isLastItem = false }) => {
  return (
    <Box flexGrow={1} fontWeight={500} borderRight={!isLastItem && `1px solid ${colors.purple[200]}`}>
      <Box width="fit-content" marginLeft="20px" paddingTop="2px" whiteSpace="nowrap">
        <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
          {label[0]}
        </Typography>
        <Typography variant="body3" style={{ color: colors.purple[900] }}>
          {value[0]}
        </Typography>
      </Box>
      <Box width="fit-content" marginLeft="20px" paddingTop="15px" whiteSpace="nowrap">
        <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
          {label[1]}
        </Typography>
        <Typography variant="body3" style={{ color: colors.purple[900] }}>
          {value[1]}
        </Typography>
      </Box>
      <Box width="fit-content" marginLeft="20px" paddingTop="15px" whiteSpace="nowrap">
        <Typography variant="body3" style={{ color: colors.black[600], marginBottom: 8 }}>
          {label[2]}
        </Typography>
        <Typography variant="body3" style={{ color: colors.purple[900] }}>
          {value[2]}
        </Typography>
      </Box>
    </Box>
  )
}