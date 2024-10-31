import { Box } from "@mui/material";
import { Typography, colors, Avatar, IconGraphy } from "@leapeasy/ui-kit";
import { DetailsItem } from "elements/DetailsItem";

export const DetailCard = ({ user, isDemo }) => {
  return (
    <Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        borderRadius={2}
        py={2}
        my={2}
        backgroundColor="rgba(248, 244, 249, 0.48)"
        border="1px solid #F8F4F9"
      >
        <Avatar
          size="x-large"
          iconImage={user.accepter.image ? <img src={user.accepter.image} /> : <IconGraphy icon="Users.User" />}
        />
        <DetailsItem label="Name" value={user.accepter && user.accepter.username} />
        <DetailsItem label="Job Title" value={user && user.accepter.job_title} />
        <DetailsItem label="Phone" value={user && user.accepter.phone} />
        <DetailsItem label="Email" value={user && user.accepter.email} />
        <DetailsItem label="Number of Building" value={user && user.property.length} />
        {/* <DetailsItem label="Role" value={user && user.job_title} /> */}
        <DetailsItem label="Primary contact" value={user && user.accepter.phone} />
        <DetailsItem label="Last Visited Date" value={new Date(user.createdAt).toISOString().slice(0, 10)} />
      </Box>
      <Box
        flexWrap={"wrap"}
        borderRadius={2}
        py={2}
        backgroundColor="rgba(248, 244, 249, 0.48)"
        border="1px solid #F8F4F9"
      >
        <Typography variant="body1" style={{ color: colors.purple[900], marginLeft: "10px" }}  >
          Higher user Information
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          mt={2}
        >
          <Avatar
            size="x-large"
            iconImage={user.requestor.image ? <img src={user.requestor.image} /> : <IconGraphy icon="Users.User" />}
          />
          <DetailsItem label="Name" value={user.requestor && user.requestor.username} />
          <DetailsItem label="Job Title" value={user && user.requestor.job_title} />
          <DetailsItem label="Role" value={user && user.requestor.role} />
          <DetailsItem label="Phone" value={user && user.requestor.phone} />
          <DetailsItem label="Email" value={user && user.requestor.email} />
        </Box>
      </Box>
    </Box>
  )
}