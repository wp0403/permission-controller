/**
 * 权限控制类
 * 提供权限校验和权限保护组件的能力
 */
export default class PermissionController {
  /**
   * 构造函数
   * @param {Object} options - 权限控制配置
   * @param {string} options.userRole - 当前用户角色
   * @param {string[]} options.rolePermissions - 角色对应的权限列表
   * @param {string[]} options.userPermissions - 用户个人拥有的权限列表
   * @param {Function} options.redirect - 重定向方法
   */
  constructor({ userRole, rolePermissions, userPermissions, redirect }) {
    // 初始化用户信息
    this.userRole = userRole;
    this.rolePermissions = rolePermissions;
    this.userPermissions = userPermissions;
    this.redirect = redirect;
  }

  /**
   * 更新用户信息
   * @param {Object} options - 权限控制配置
   * @param {string} options.userRole - 当前用户角色
   * @param {string[]} options.rolePermissions - 角色对应的权限列表
   * @param {string[]} options.userPermissions - 用户个人拥有的权限列表
   */
  updateUser({ userRole, rolePermissions, userPermissions }) {
    if (userRole) {
      this.userRole = userRole;
    }

    if (rolePermissions) {
      this.rolePermissions = rolePermissions;
    }

    if (userPermissions) {
      this.userPermissions = userPermissions;
    }
  }

  /**
   * 校验权限
   * @param {string} permissionCode - 权限码
   * @returns {boolean} - 是否拥有该权限
   */
  checkPermission(permissionCode) {
    // 先检查个人权限
    if (this.userPermissions.includes(permissionCode)) {
      return true;
    }

    // 再检查角色权限
    if (this.userRole && this.rolePermissions.includes(permissionCode)) {
      return true;
    }

    // 未匹配到权限码
    return false;
  }

  /**
   * 权限保护的组件
   * 会对进入的组件做权限校验
   * @param {Component} WrappedComponent - 需要保护的组件
   * @param {string} permission - 权限码
   * @param {Component} NoPermissionComponent - 无权限页面
   * @returns {Component} - 加上权限保护的组件
   */
  AuthorizedComponent(WrappedComponent, permission, NoPermissionComponent) {
    if (this.checkPermission(permission)) {
      return WrappedComponent;
    } else if (NoPermissionComponent) {
      return NoPermissionComponent;
    } else if (this.redirect) {
      this.redirect();
    } else {
      return "No Permission";
    }
  }
}
