export default defineNuxtRouteMiddleware(() => {
  // this middleware is used for protecting routes accessible to all users (not role specific)
  const user = useSupabaseUser();
  console.log("/middleware/auth", user.value)
  // RBAC Page Navigation Tree
  if (!user.value) {
    return navigateTo('/');
  }
});