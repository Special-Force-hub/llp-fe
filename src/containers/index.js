import { Routes, Route } from 'react-router-dom';

import { Login } from './Auth/Login';
import { ResetPassword, ResetForm } from './Auth/ResetPassword';
import { LostInvite } from './Auth/LostInvite';
import { Setup2FA } from './Auth/Setup2FA';
import { UpdatePassword } from './Auth/UpdatePassword';

import { Dashboard } from './Dashboard';
import { Buildings } from './Property/Buildings';
import { BuildingDetail } from './Property/Buildings/Details/BuildingDetail';
import { Applications } from './Property/Applications';
import { ApplicationDetail } from './Property/Applications/Details';
import { Policies } from './Property/Policies';
import { FlaggedCancellations } from './Property/FlaggedCancellations';
import { Claims } from './Property/Claims';
import { Invoice } from './Invoice';
import { Treeview } from './User/Treeview';
import { UserByRole } from './User/UserByRole';
import { InviteNewUser } from './User/InviteNewUser';
import { LandlordInvite } from './LandlordInvite';
import { Landlord } from './User/Landlord';
import { Email } from './Email';
import { NotificationFrom } from './Notification/NotificationFrom';
import { NotificationTo } from './Notification/NotificationTo';
import { PolicyCancelLog } from './PolicyCancelLog';
import { PortalGuide } from './PortalGuide';
import { ActivityLog } from './ActivityLog';
import { NotFound } from './NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/** auth pages */}
      <Route exact path="/login" element={<Login />} />
      <Route path="/reset-password">
        <Route path="" element={<ResetPassword />} />
        <Route path=":token" element={<ResetForm />} />
      </Route>

      <Route exact path="/lost-invite" element={<LostInvite />} />
      <Route exact path="/setup-2fa" element={<Setup2FA />} />
      <Route exact path="/update-auth" element={<UpdatePassword />} />

      {/* <Route exact path="/register" element={Register} />
      <Route exact path="/reset-password/:token" element={ResetPassword} />
      <Route exact path="/invite/:type/:token" element={Invite} /> */}

      <Route exact path="/dashboard" element={<Dashboard />} />

      {/** property pages */}
      <Route path="/property">
        <Route exact path="buildings" element={<Buildings />} />
        <Route exact path="buildings/detail" element={<BuildingDetail />} />
        <Route exact path="applications" element={<Applications />} />
        <Route exact path="applications/detail" element={<ApplicationDetail />} />
        <Route exact path="policies" element={<Policies />} />
        <Route exact path="cancel-policies" element={<FlaggedCancellations />} />
        <Route exact path="claims" element={<Claims />} />
      </Route>

      <Route exact path="/invoice" element={<Invoice />} />

      {/** user pages */}
      <Route path="/user">
        <Route exact path="treeview" element={<Treeview />} />
        <Route exact path="landlord" element={<Landlord />} />
        <Route
          exact
          path="full-portfolio"
          element={<UserByRole role="vp" title="Full Portfolio" />}
        />
        <Route exact path="multi-site" element={<UserByRole role="rm" title="Multi-Site" />} />
        <Route exact path="property" element={<UserByRole role="pm" title="Property Manager" />} />
        <Route exact path="invite-new-user" element={<InviteNewUser />} />
      </Route>

      <Route exact path="/landlord-invite" element={<LandlordInvite />} />
      <Route exact path="/email" element={<Email />} />

      {/** notification pages */}
      <Route path="/notification">
        <Route exact path="from" element={<NotificationFrom />} />
        <Route exact path="to" element={<NotificationTo />} />
      </Route>

      <Route exact path="/cancellation-log" element={<PolicyCancelLog />} />

      <Route exact path="/guide" element={<PortalGuide />} />
      <Route exact path="/active-log" element={<ActivityLog />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
