export interface SystemUser {
  id: string;
  username: string; 
  name: string;
  mail: string;
  createdDate: Date | undefined;
}

export enum SystemPermissions {
  SiteOwner = 'Site Owner',
  Admin = 'Admin',
  Viewer = 'Viewer',
}