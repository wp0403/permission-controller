# PermissionController

这个类用于处理权限控制逻辑。

## 用法

导入类:

```js
import PermissionController from "permission-controller";

// 初始化
const permission = new PermissionController({
  userRole: "admin",
  rolePermissions: ["access_backend"],
  userPermissions: ["edit_article"],
  redirect: () => router.push("/403"),
});

// 检查权限
const canEdit = permission.checkPermission("edit_article");

// 权限保护组件
const ArticleEdit = () => {
  // 编辑文章的组件
};

const NoPermission = () => {
  // 无权限提示组件
};

const ProtectedComponent = permission.AuthorizedComponent(
  ArticleEdit,
  "edit_article",
  NoPermission
);

// 更新用户信息
permission.updateUser({
  userRole: "editor",
  rolePermissions: ["edit_article"],
  userPermissions: [],
});
```

### API

#### 构造函数
```js
new PermissionController(options)
```

- options
  - userRole - 当前用户角色
  - rolePermissions - 角色对应的权限列表
  - userPermissions - 用户个人拥有的权限列表
  - redirect - 无权限时的重定向方法

#### 实例方法
 - checkPermission(permission) - 检查权限
 - updateUser(options) - 更新用户信息
 - AuthorizedComponent(Component, permission, NoPermissionComponent) - 权限保护组件

### 详细说明
 1. 权限判定顺序:用户个人权限 > 角色权限
 2. 提供无权限组件增强可定制性
 3. 支持权限变更后的更新