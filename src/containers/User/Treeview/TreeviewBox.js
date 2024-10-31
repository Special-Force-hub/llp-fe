import React, { useState } from "react";
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { Typography, Badge, colors, IconGraphy, DatePickerInput } from '@leapeasy/ui-kit';

export const TreeviewBox = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Box style={{
        maxWidth: "380px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        margin: "0 0 15px 0",
      }}>
        <Box style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          padding: "15px 20px",
          ...(expanded ? { background: "#F8F4F9", } : {}),
        }}>
          <Box style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <Badge
              background="#F3F1F4"
              color="warmBlue"
              label="Landlord"
              textSize="Large"
              rounded
            />
            <Typography variant="body1" style={{ color: colors.neutral[900], fontWeight: '400' }}>
              amtunga@sgf.com
            </Typography>
          </Box>
          <Box style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
            {expanded && (
              <IconGraphy
                icon='EditorLayout.EditNote'
                width={16}
                height={16}
                style={{
                  color: colors.neutral[200],
                  border: 'solid 1px #e0e0e0',
                  padding: '6px',
                  borderRadius: '5px',
                  background: `${colors.purple[800]}`,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />)
            }
            <IconGraphy
              icon={expanded ? 'Arrow.ExpandLess' : 'Arrow.ExpandMore'}
              width={8}
              height={8}
              style={{
                color: colors.neutral[900], cursor: 'pointer', border: 'solid 1px #e0e0e0', padding: '10px', borderRadius: '5px',
                ...(expanded ? { background: "#E8D6EB", } : {}),
              }}
              onClick={toggleExpanded}
            />
          </Box>

        </Box>

        {expanded && (
          <Box style={{ margin: "35px 20px 35px 20px", }}>
            {[...Array(3)].map((_, index) => (
              <Box key={index} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                padding: "15px 20px",
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                margin: "10px 0 20px 50px",
              }}>
                <IconGraphy icon='EditorLayout.DragIndicator' width={7.5} height={12} style={{ color: colors.neutral[900] }} />
                <Badge
                  background="#F3F1F4"
                  color="sunglow"
                  label="Full portfolio"
                  textSize="medium"
                  rounded
                  style={{ whiteSpace: 'nowrap' }}
                />
                <Typography
                  variant="body1"
                  style={{ color: colors.neutral[900], fontWeight: '400', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '120px' }}
                >
                  amtunga@sgf.com
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
