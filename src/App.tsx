import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Signin from "./components/Auth/SignIn";
import Signup from "./components/Auth/SignUp";
import { ProtectedRoute } from "./components/Auth/ProtectedRoutes";
import Settings from "./components/Settings";
import AppBar from "./components/AppBar";
import Workspace from "./components/WorkSpaces/WorkSpace";
import FormPage from "./components/WorkSpaces/FormPage";
import WorkspaceView from "./components/WorkSpaces/WorkSpaceView";

const Provider: React.FC = () => {
  return (
    <Router>
      <div>
        <AppBar />

        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />
          <Route path="/workspace/:id" element={<WorkspaceView />} />
          <Route path="/workspace/:id/form/:formid" element={<FormPage />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};



export default Provider;