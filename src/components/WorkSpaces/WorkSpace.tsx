
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkspaceRequest,
  fetchWorkspacesRequest,
} from "../../store/reducers/workspaceReducer";
import { RootState } from "../../store";
import styles from "../styles/Workspace.module.css";

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const { workspaces, loading, error } = useSelector(
    (state: RootState) => state.workspace
  );

  useEffect(() => {
    dispatch(fetchWorkspacesRequest());
  }, [dispatch]);

  const handleCreateWorkspace = () => {
    const workspaceName = prompt("Enter workspace name:");
    if (workspaceName) {
      dispatch(createWorkspaceRequest({ name: workspaceName }));
    }
  };

  const handleWorkspaceClick = (id: string) => {
    window.location.href = `/workspace/${id}`
  };

  return (
    <div className={styles.workspaceContainer}>
      <h2 className={styles.workspaceHeader}>Workspaces</h2>
      <button className={styles.createWorkspaceButton} onClick={handleCreateWorkspace}>
        Create Workspace
      </button>
      
      {loading && <p className={styles.workspaceLoading}>Loading...</p>}
      {error && <p className={styles.workspaceError}>{error}</p>}
      
      <div className={styles.workspaceList}>
        {workspaces?.map((workspace: any) => (
          <div
            className={styles.workspaceItem}
            key={workspace.id}
            onClick={() => handleWorkspaceClick(workspace.id)} 
          >
            <h3>{workspace.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
