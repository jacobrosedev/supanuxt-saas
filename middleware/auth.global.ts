// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
// this middleware is used for protecting routes accessible to all users (not role specific)
// it just checks if auth'd, can be stacked with rbac.ts to simplifying auth validation
const user = useSupabaseUser()
console.log("/middleware/auth.global.ts ->", to.path)
const routeScope = ['/', '/signup', '/login', '/confirm', '/apply']

// user == false
if (!user) {
  //  routing to apply, they need to create an account first
  if (to.path === '/apply') return navigateTo('/signup') 
  // if the user is not signed in, and traveling into
  // any page NOT within publicRoutes, send them to login
  if (!routeScope.includes(to.path)) return navigateTo('/login')
  return // navigateTo('/');
}

// user == true; RBAC Page Navigation Tree
switch(user.value) {
  case 'authenticated': return navigateTo('/apply')
  // if anything but authenticated
  default: return to.path.startsWith('/auth/verify') ? undefined : navigateTo('/auth/verify')
}}) 