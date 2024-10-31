import { Typography, colors } from '@leapeasy/ui-kit'
import { Box } from '@mui/material'

import ReportingPageImg from 'assets/guide/ReportingPage.png'
import BuildingsTabImg from 'assets/guide/BuildingsTab.png'
import BuildingsPoliciesTabImg from 'assets/guide/BuildingsPoliciesTab.png'
import BuildingsReportTabImg from 'assets/guide/BuildingsReportTab.png'
import DeleteUserImg from 'assets/guide/deleteUser.png'
import UpdateDelegationImg from 'assets/guide/UpdateDelegationsBuildings.png'
import TreeviewImg from 'assets/guide/Treeview.png'
import TreeviewEditImg from 'assets/guide/TreeViewEdit.png'
import UserSearchImg from 'assets/guide/UserSearch.png'
import AdminNewInviteImg from 'assets/guide/AdminNewInvite.png'
import AdminNewInviteTypeImg from 'assets/guide/AdminNewInviteType.png'
import AdminLLInviteImg from 'assets/guide/AdminLLInvite.png'
import AdminLLInvite2Img from 'assets/guide/ReInviteUser.png'
import ReInviteUserImg from 'assets/guide/AdminLLInvite.png'
import DelegationInviteImg from 'assets/guide/DelegationInvite.png'

export const DashboardPage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Dashboard Page</Typography>
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
      <img src={ReportingPageImg} style={{ margin: "20px" }} />
    </Box>
  )
}

export const PropertyPage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Property Page</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        This page shows the list of buildings, applications, policies and claims attached to
        the user.
      </Typography>
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Buildings</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Click the Buildings Tab to view of Buildings that have been delegated under you as
        a User. Building information includes the name of the LEAP Buildings Account
        Record, They Type of building (AE: AutoEnroll, C: Conventional, EP: Event Process/
        Entrata Integrated, EP: Event Process;AutoEnroll), The Phone number for that
        buildings, Building Address, Buildings Contact email, Total Number of Units (if
        applicable), and Student Building Status.
      </Typography>
      <img src={BuildingsTabImg} style={{ margin: "20px" }} />
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        You can double-click on any Building on the data table to view that Building’s
        Details. Once clicked, the Building Details Window will open and you can view data
        tabs relative to the Building that you’ve selected to view. Building Detail Page
        includes a <b>Reports</b>, <b>Policies</b>, <b>Applications</b>, <b>Claims</b>,{' '}
        <b>Details</b> tabs. This will show a report specific to the selected building.
      </Typography>
      <img src={BuildingsReportTabImg} style={{ margin: "20px" }} />
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Applications</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        This page shows a list of all applications attached to the buildings of the user.It has options to search by text, filter by column, print and download the list of
        applications. User can see the details of the application by double-clicking the table row.
      </Typography>
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Policies</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        This page shows a list of all <b>05-Policy Issued</b> applications attached to the
        buildings of the user.
      </Typography>
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Claims</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        This page shows a list of all <b>claims</b> attached to the buildings of the user.
      </Typography>
    </Box>
  )
}
export const UserPage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>User Page</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Under the Navigation Menu, you’ll find a Properties Tab. Click to open the tab and
        View the Sub-menu options to access information by: Building, Applications,
        Policies, and Claims.
      </Typography>
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Tree View</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Users can view the delegation hierarchy of users and edit the hierarchy tree.
      </Typography>
      <img src={TreeviewImg} style={{ margin: "20px" }} />
      <img src={TreeviewEditImg} style={{ margin: "20px" }} />
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Landlord</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Admin user can view all landlord users who are using the portal.
      </Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        This page shows all detailed information regarding to the landlord user.
      </Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        By double-clicking the table row, user can see the landlord detail page that shows
        reports, applications, buildings, claims and details information.
      </Typography>
      <Typography variant="h3" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Full Portfolio, Multi-Site, Property</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Each Tab shows a list of all Users under User role that have been delegated to you as a User.
      </Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Please note that different Users can see different levels of Users.
      </Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Higher level users will see more Users than a lower level User. (ie: a Landlord
        User can see, all Users: Full Portfolio, Multi-Site, and Property User; a Full
        Portfolio level User cannot see a Landlord level User but can see all Multi-Site,
        and Property level Users under them; a Multi Site User cannot see Full Portfolio
        level User but can see all Property Users under them; a Property Level User can’t
        see any other Users above their level)
      </Typography>
    </Box>
  )
}
export const InviteUserPage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Invite New User</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Admin Users can invite news users (FP, MS, PM) on behalf of Landlord users.
      </Typography>
      <img src={AdminNewInviteImg} style={{ margin: "20px" }} />
      <img src={AdminNewInviteTypeImg} style={{ margin: "20px" }} />
    </Box>
  )
}
export const LandlordInvitePage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Landlord Invite</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Admin Users can invite new Landlords.
      </Typography>
      <img src={AdminLLInviteImg} style={{ margin: "20px" }} />
      <img src={AdminLLInvite2Img} style={{ margin: "20px" }} />
    </Box>
  )
}
export const EmailPage = () => {
  return (
    <Box marginLeft="30px">
      <Typography variant="h2" style={{ color: colors.purple[900], fontWeight: '500', paddingBottom: "10px", paddingTop: "10px" }}>Email Page</Typography>
      <Typography variant="body2" style={{ color: colors.purple[900], fontWeight: '500' }}>
        Users can view all invitations sent or received and reinvite users.
      </Typography>
      <img src={ReInviteUserImg} style={{ margin: "20px" }} />
    </Box>
  )
}