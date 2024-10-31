import { Typography, colors } from "@leapeasy/ui-kit"
import { Box } from "@mui/material"

export const User = ({ userRole }) => {
  return (
    <Box marginLeft="30px" >
      {userRole === "admin" && (
        <>
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Admin</Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Leap Staff who will have access to each account as an overview. They can view from any account perspective, Update Delegated properties, and
            Invite New Users from within another Account. Can upload SOP doc, or to a Landlord
            Profile.
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They will have access to all supporting Views and Users, Can Invite FPs, MSs or
            PMs. (If not all then FPs).
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They will have an interactive dashboard that allows them to view data from all of
            their Buildings & Units Combined via their main dashboard, but can view each
            region or building independently. They can view the dashboard from the perspective of any supporting staff member
            (FP, MS, PM).
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Can update property delegations, invite new users, and approve delegation requests
            from FPs and/or other supporting roles. (if lower role delegation request is
            updated by a lower role notification disappears).
          </Typography>
        </>
      )}
      {(userRole === 'admin' || userRole === 'll') && (
        <>
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Landlord</Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Landlord, will be the highest Level permission other than Admin.
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They will have access to all supporting Views and Users, Can Invite Full
            Portfolio(FP)s, Multi-Site(MS)s or Property Manager(PM)s. (If not all then FPs).
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They will have an interactive dashboard that allows them to view data from all of
            their Buildings & Units Combined via their main dashboard, but can view each
            region or building independently.They can view the dashboard from the perspective of any supporting staff member
            (FP, MS, PM).
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They can update property delegations, invite new users, and approve delegation
            requests from FPs and/or other supporting roles. (if a lower role delegation
            request is updated by a lower role notification disappears).
          </Typography>
        </>
      )}
      {(userRole === 'admin' || userRole === 'll' || userRole === 'vp') && (
        <>
          <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Full Portfolio (FP)</Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            Full Portfolio users will have an interactive dashboard that allows them to view
            data from all of their delegated Buildings & Units Combined via their main
            dashboard, but can view each MS or single building independently.
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They users can view the dashboard from the perspective of any supporting staff
            member (MS, PM)
          </Typography>
          <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
            They Can update property delegations, invite new users, and approve delegation
            requests from Multi-Site users and/or other supporting roles. (if a lower role
            delegation request is updated by a lower role notification disappears).
          </Typography>
        </>
      )}
      {(userRole === 'admin' ||
        userRole === 'll' ||
        userRole === 'vp' ||
        userRole === 'rm') && (
          <>
            <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Multi-Site (MS)</Typography>
            <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
              Multi-Site users will have an interactive dashboard that allows them to view data
              from multiple delegated Buildings combined via their main dashboard, and in
              addition can view each PM user and User’s single building independently as well.
            </Typography>
            <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
              They can view the dashboard from the perspective of any supporting staff member
              (PM).
            </Typography>
            <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
              They can Request property delegation changes from a higher user, invite new
              Property Manager users, and invite new PM level users.
            </Typography>
          </>
        )}
      {(userRole === 'admin' ||
        userRole === 'll' ||
        userRole === 'vp' ||
        userRole === 'rm' ||
        userRole === 'pm') && (
          <>
            <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Property Manager (PM)</Typography>
            <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500', marginBottom: "30px" }}>
              Property Manager will have an interactive dashboard that allows them to view data
              from their delegated Building & Units via their main dashboard only with access to
              One (1) Property, File Claims for policies,{' '}
            </Typography>
          </>
        )}
    </Box>
  )
}