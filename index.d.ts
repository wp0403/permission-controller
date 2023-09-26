interface PermissionOptions {
  userRole: string;
  rolePermissions: string[];
  userPermissions: string[];
  redirect?: () => void;
}

interface UpdateUserOptions {
  userRole?: string;
  rolePermissions?: string[];
  userPermissions?: string[];
}

declare class PermissionController {
  constructor(options: PermissionOptions);

  updateUser(options: UpdateUserOptions): void;

  checkPermission(permissionCode: string): boolean;

  AuthorizedComponent(
    WrappedComponent:Component,
    permission: string,
    NoPermissionComponent?:Component,
  ): Component;
}

export default PermissionController;
