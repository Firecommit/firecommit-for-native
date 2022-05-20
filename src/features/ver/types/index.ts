export type WorkspaceObjectType = {
  id: string;
  name: string;
  adminUserId: string;
  iconURL: string;
  inAudit: boolean;
  maps: {
    [layer: string]: string;
  };
  members: {
    [uid: string]: boolean;
  };
};

export type WorkspaceResponse = {
  token: WorkspaceCredentialsDTO;
  workspace: WorkspaceObjectType | null;
};

export type WorkspaceCredentialsDTO = {
  uid: string;
  code: string;
};
