import {db} from '&/lib/firebase';
import {WorkspaceListResponse, WorkspaceObjectType} from '../types';

export type GetAPIWorkspacesDTO = {
  uid: string;
};

export const getWorkspacesWithUserId = async (
  data: GetAPIWorkspacesDTO,
): Promise<WorkspaceListResponse> => {
  const usersRef = db.ref('users').child(data.uid).child('workspace');
  const userSnapshot = await usersRef.get();
  const codes = Object.keys(userSnapshot.val());
  const promises = codes.map(async code => {
    const workspaceSnapshot = await db.ref('workspace').child(code).get();
    return {...workspaceSnapshot.val(), id: code} as WorkspaceObjectType;
  });
  return await Promise.all(promises);
};
