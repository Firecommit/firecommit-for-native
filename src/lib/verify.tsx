import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  GetAPIWorkspacesDTO,
  getWorkspacesWithUserId,
  loginWithUserIdAndInviteCode,
  logoutFromCurrentWorkspace,
  WorkspaceCredentialsDTO,
  WorkspaceListResponse,
  WorkspaceObjectType,
  WorkspaceResponse,
} from '&/features/ver';
import {useAuth} from './auth';
import {omitObject} from '&/utils/omitObject';
import storage from '&/utils/storage';

const handleWorkspaceResponse = async (data: WorkspaceResponse) => {
  const {token, workspace} = data;
  const prevToken = await storage.getToken();
  storage.setToken({...prevToken, ...token});
  return workspace;
};

const loadWorkspace = async () => {
  const data = await storage.getToken();
  const verData = data && omitObject(data, ['email', 'password']);
  if (verData && verData.uid && verData.code) {
    const {workspace} = await loginWithUserIdAndInviteCode(verData);
    return workspace;
  }
  return null;
};

const loginFn = async (data: WorkspaceCredentialsDTO) => {
  const response = await loginWithUserIdAndInviteCode(data);
  const workspace = await handleWorkspaceResponse(response);
  return workspace;
};

const logoutFn = async (data: WorkspaceCredentialsDTO) => {
  const prevToken = await storage.getToken();
  storage.setToken({...prevToken, uid: '', code: ''});
  logoutFromCurrentWorkspace(data);
};

const getWorkspaces = async (data: GetAPIWorkspacesDTO) => {
  const workspaces = await getWorkspacesWithUserId(data);
  return workspaces;
};

type VerifyProviderProps = {
  children: React.ReactNode;
};

type VerifyContextTypes = {
  workspace: WorkspaceObjectType | null;
  setWorkspace: React.Dispatch<
    React.SetStateAction<WorkspaceObjectType | null>
  >;
  workspaces: WorkspaceListResponse | null;
  setWorkspaces: React.Dispatch<
    React.SetStateAction<WorkspaceListResponse | null>
  >;
};

export const VerifyContext = createContext<VerifyContextTypes>({
  workspace: null,
  setWorkspace: () => {},
  workspaces: null,
  setWorkspaces: () => {},
});

const useVerify = () => {
  const {user} = useAuth();
  const {workspace, setWorkspace, workspaces, setWorkspaces} =
    useContext(VerifyContext);

  const login = async (data: WorkspaceCredentialsDTO) => {
    const loginRes = await loginFn(data);
    const workspacesRes = await getWorkspaces({uid: data.uid});
    setWorkspace(loginRes);
    setWorkspaces(workspacesRes);
  };

  const logout = async (data: WorkspaceCredentialsDTO) => {
    await logoutFn(data);
    const workspacesRes = await getWorkspaces({uid: data.uid});
    if (workspacesRes.length) {
      if (user) await login({uid: user.uid, code: workspacesRes[0].id});
    } else {
      setWorkspace(null);
      setWorkspaces(null);
    }
  };

  return {
    workspace,
    workspaces,
    login,
    logout,
  };
};

const VerifyProvider = ({children}: VerifyProviderProps) => {
  const [workspace, setWorkspace] = useState<WorkspaceObjectType | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceListResponse | null>(
    null,
  );
  const [load, setLoad] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      Promise.all([loadWorkspace(), getWorkspaces({uid: user.uid})])
        .then(res => {
          setWorkspace(res[0]);
          setWorkspaces(res[1]);
        })
        .finally(() => setLoad(true));
    }
  }, []);
  const value = useMemo(
    () => ({workspace, setWorkspace, workspaces, setWorkspaces}),
    [workspace, workspaces],
  );
  return (
    <VerifyContext.Provider value={value}>
      {load && children}
    </VerifyContext.Provider>
  );
};

export {VerifyProvider, useVerify};
