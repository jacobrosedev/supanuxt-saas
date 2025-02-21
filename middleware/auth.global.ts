// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
// this middleware is used for protecting routes accessible to all users (not role specific)
// it just checks if auth'd, can be stacked with rbac.ts to simplifying auth validation
const user = useSupabaseUser()
console.log("/middleware/auth.global.ts ->", to.path)
const publicScope = ['/', '/signup', '/login', '/confirm', '/apply']
const tenantScope = []
const workerScope = []
const adminScope = []

// user == false
if (!user) return navigateTo('/')

// else if user is true:
//   they travel through /confirm (nuxt.config.ts)

if (user.value) {
  // user == true; RBAC Page Navigation Tree
  switch(user.value.role) {
    case 'authenticated': return navigateTo('/apply')
    case 'tenant': return navigateTo('/auth/verify')
    case 'tenant': return navigateTo('/auth/verify')
    case 'worker': return navigateTo('/auth/verify')
    case 'admin': return navigateTo('/auth/verify')
    // if user is any other role than authenticated
    return navigateTo('/')
  }

}

})