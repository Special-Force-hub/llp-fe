import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Auth/Login';
import { ResetPassword } from './Auth/ResetPassword';
import { ResetForm } from './Auth/ResetPassword/ResetForm';
import { LostInvite } from './Auth/LostInvite';

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
      <Route exact path="/setup-2fa" element={<></>} />
      <Route exact path="/update-auth" element={<></>} />

      <Route path="*" element={<Navigate replace to="/login" />} />

      {/* <Route exact path="/register" element={Register} />
      <Route exact path="/update-auth" element={UpdatePassword} />
      <Route exact path="/setup-2fa" element={Setup2FA} />
      <Route exact path="/reset-password/:token" element={ResetPassword} />
      <Route exact path="/invite/:type/:token" element={Invite} />
      <Route element={NotFound} />

      <Route path="/home" element={<Home page={'main'} />} /> */}

      {/* <Route path="*" element={Login} /> */}
    </Routes>
  );
};

export default AppRoutes;
