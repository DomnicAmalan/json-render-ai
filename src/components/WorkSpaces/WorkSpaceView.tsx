import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/WorkspaceDetail.module.css";
import { RootState } from "../../store";
import { createFormRequest, fetchFormRequest } from "../../store/reducers/formReducer";
import { FormData } from "../../store/types";

const WorkspaceView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { formData, loading, error } = useSelector((state: RootState) => state.form);
  useEffect(() => {
    if (id) {
      dispatch(fetchFormRequest(id));
    }
  }, [dispatch, id]);

  const handleEdit = (formId: string) => {
    window.location.href = `/workspace/${id}/form/${formId}`
  };

  const handleLaunch = (formId: string) => {
    console.log("Launching form with ID:", formId);
  };

  const handleCreateForm = () => {
    const formName = prompt("Enter the name for the new form:");

    if (formName) {
      if (id) {
        dispatch(createFormRequest({ workspaceId: id, name: formName, formData: { } }));
      }
    } else {
      alert("Form name is required!");
    }
  };

  return (
    <div>
      {loading && <p>Loading forms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formData && formData.length > 0 ? (
        <div>
          <h2>Forms for Workspace {id}</h2>
          <div className={styles.formList}>
            {formData.map((form: FormData) => (
              <div key={form.id} className={styles.formCard}>
                <h3>{form.name}</h3>
                <div>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(form.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.launchButton}
                    onClick={() => handleLaunch(form.id)}
                  >
                    Launch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No forms available for this workspace.</p>
      )}

      {/* Create new form section */}
      <div>
        <h2>Create a New Form</h2>
        <button onClick={handleCreateForm} className={styles.createFormButton}>
          Create Form
        </button>
      </div>
    </div>
  );
};

export default WorkspaceView;
