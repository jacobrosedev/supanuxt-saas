export default defineNuxtRouteMiddleware(() => {
    // this middleware is used for protecting routes that are role specific
    const user = useSupabaseUser();
  
    console.log(user)
  
    // RBAC Page Navigation Tree
    if (user.value) {
      if (user.value.role === "authenticated") {
        navigateTo('/tenant/dashboard', { replace: true });
      }
      if (user.value.role === "worker") {
        navigateTo('/worker/dashboard', { replace: true });
      }
      if (user.value.role === "admin") {
        navigateTo('/admin/dashboard', { replace: true });
      }
  
    }
    else {
      return navigateTo('/');
    }
  });
  
  
  // 
  // routeRules: {
  //   '/admin/**': { middleware: ['auth'] },
  //   '/maintenance/**': { middleware: ['auth'] },
  //   '/tenant/**': { middleware: ['auth'] }
  // }