export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();

  console.log(user)

  if (!user.value) {
    return navigateTo('/');
  } else {
    if (user.value.role == "authenticated") {
      return navigateTo('/apply/pending');
    }
  }
});
