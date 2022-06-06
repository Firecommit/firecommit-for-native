import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
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
    const workspaces = await getWorkspacesWithUserId({uid: verData.uid});
    return {workspace, workspaces};
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

type VerifyProviderProps = {
  children: React.ReactNode;
};

type VerifyContextTypes = {
  workspace: WorkspaceObjectType | null;
  setWorkspace: React.Dispatch<
    React.SetStateAction<WorkspaceObjectType | null>
  >;
  workspaces: WorkspaceListResponse | null;
};

export const VerifyContext = createContext<VerifyContextTypes>({
  workspace: null,
  setWorkspace: () => {},
  workspaces: null,
});

const useVerify = () => {
  const {user} = useAuth();
  const {workspace, setWorkspace, workspaces} = useContext(VerifyContext);

  const login = async (data: WorkspaceCredentialsDTO) => {
    const res = await loginFn(data);
    setWorkspace(res);
  };

  const logout = async () => {
    await logoutFn({uid: `${user?.uid}`, code: `${workspace?.id}`});
    setWorkspace(null);
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
  useEffect(() => {
    loadWorkspace()
      .then(res => {
        if (res) {
          setWorkspace(res.workspace);
          setWorkspaces(res.workspaces);
        }
      })
      .finally(() => setLoad(true));
  }, []);
  const value = useMemo(
    () => ({workspace, setWorkspace, workspaces}),
    [workspace, workspaces],
  );
  return (
    <VerifyContext.Provider value={value}>
      {load && children}
    </VerifyContext.Provider>
  );
};

export {VerifyProvider, useVerify};
