import {db} from '&/lib/firebase';
import {WorkspaceCredentialsDTO, WorkspaceResponse} from '../types';

// TODO: display error dialog
const handleError = (error: unknown) => {
  throw error;
};

export const loginWithUserIdAndInviteCode = async (
  data: WorkspaceCredentialsDTO,
): Promise<WorkspaceResponse> => {
  const res = {token: data, workspace: null};
  const workspaceRef = db.ref('workspace').child(data.code);
  const snapshot = await workspaceRef.get();
  if (snapshot) {
    workspaceRef.child('member').update({[data.uid]: true});
    const userRef = db.ref('users').child(data.uid).child('workspace');
    userRef.update({[data.code]: true});
    res.workspace = {...snapshot.val(), id: data.code};
  }
  return res;
};
