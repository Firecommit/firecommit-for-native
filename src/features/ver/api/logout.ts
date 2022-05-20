import {db} from '&/lib/firebase';
import {WorkspaceCredentialsDTO} from '../types';

export const logoutFromCurrentWorkspace = async (
  data: WorkspaceCredentialsDTO,
): Promise<boolean> => {
  try {
    const userRef = db.ref('users').child(data.uid).child('workspace');
    await userRef.child(data.code).remove();
    const workspaceRef = db.ref('workspace').child(data.code);
    await workspaceRef.child('members').child(data.uid).remove();
    return true;
  } catch (error) {
    return false;
  }
};
