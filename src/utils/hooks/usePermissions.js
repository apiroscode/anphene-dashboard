import { useStoreState } from "easy-peasy";

export const usePermissions = (rawPerms) => {
  const perms = Array.isArray(rawPerms) ? rawPerms : [rawPerms];
  const user = useStoreState((state) => state.auth.user);
  const isLoggedIn = !!user;

  if (isLoggedIn) {
    const userPermissions = user.userPermissions.map((perm) => perm.code);
    const checkPermissions = (permission) => {
      if (permission === undefined) {
        return true;
      }
      return perms.includes(permission);
    };
    return [userPermissions.some(checkPermissions), isLoggedIn];
  } else {
    return [false, isLoggedIn];
  }
};
