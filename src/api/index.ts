import { Workspace } from '../store/types';
import {axiosAuthInstance, axiosUnauthInstance} from './config';
import { DeleteFormParams, UpdateFormParams } from './types';

export const signupApi = async (payload: { email: string; password: string }): Promise<any> => {
  try {
    const response = await axiosUnauthInstance.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Signup error:', error);
    throw error;
  }
};

export const signinApi = async (payload: { email: string; password: string }): Promise<any> => {
  try {
    const response = await axiosUnauthInstance.post('/auth/signin', payload);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Signin error:', error);
    throw error;
  }
};

export const signoutApi = async (): Promise<any> => {
  try {
    const response = await axiosAuthInstance.post('/auth/signout'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Signout error:', error);
    throw error;
  }
};

export const createWorkspaceApi = async (payload: { name: string }): Promise<Workspace> => {
  try {
    const response = await axiosAuthInstance.post<Workspace>("/workspaces", payload);
    return response.data;
  } catch (error) {
    console.error("Create workspace error:", error);
    throw error;
  }
};

export const fetchWorkspacesApi = async (): Promise<Workspace[]> => {
  try {
    const response = await axiosAuthInstance.get<Workspace[]>("/workspaces");
    return response.data;
  } catch (error) {
    console.error("Fetch workspaces error:", error);
    throw error;
  }
};


export const fetchFormApi = async (workspaceId: string): Promise<FormData> => {
  try {
    const response = await axiosAuthInstance.get(`forms/${workspaceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw error;
  }
};

export const createFormApi = async (data: { workspaceId: string; formData: any, name: string }): Promise<FormData> => {
  try {
    const response = await axiosAuthInstance.post(
      `/forms/create`,
      {
        workspaceId: data.workspaceId,
        formJson: data.formData,
        name: data.name
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

export const fetchFormByWorkspaceAndFormIdApi = async ({ workspaceId, formId }: { workspaceId: string, formId: string }): Promise<FormData> => {
  try {
    const response = await axiosAuthInstance.get(`/forms/${workspaceId}/form/${formId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form by workspace and form ID:', error);
    throw error;
  }
};

export const updateFormApi = async ({
  workspaceId,
  formId,
  formJson,
}: UpdateFormParams): Promise<any> => {
  try {
    const response = await axiosAuthInstance.patch(
      `/forms/${workspaceId}/form/${formId}`,
      { formJson }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating form:", error);
    throw error;
  }
};

export const deleteFormApi = async ({
  workspaceId,
  formId,
}: DeleteFormParams): Promise<any> => {
  try {
    const response = await axiosAuthInstance.delete(`/forms/${workspaceId}/form/${formId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting form:", error);
    throw error;
  }
};
