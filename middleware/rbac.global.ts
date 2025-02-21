export default defineNuxtRouteMiddleware(async (to, from) => {
  // Top-Down RBAC Navigation from 'public' to 'admin'
  const user = useSupabaseUser();
  console.log(`/middleware/rbac.global.ts: '${from.path}' -> '${to.path}'`);
  if (user.value) console.log("Supabase User:", user.value.role);

  const publicRoutes = [
    '/', '/confirm', '/forgot', // nuxt.config.ts redirect, & forgot password
    '/contact', '/privacy', '/terms', // information
    '/unauthorized'
  ]
  // role can see all routes requiring user authentication
  const authenticatedRoutes = [
    '/dashboard', '/messages', '/auth', '/verify',
    '/auth/delete', '/auth/reset' // account, deletion + password reset
  ]
  // role can see submitted applications
  const roleSharedRoutes = [...publicRoutes, ...authenticatedRoutes, '/dashboard']
  const applicantRoutes = [...roleSharedRoutes,]
  const tenantRoutes = [...roleSharedRoutes,]
  const workerRoutes = [...roleSharedRoutes,]
  const adminRoutes = [...roleSharedRoutes,]

  // add public user-hidden & non-shared routes to roles
  publicRoutes.push('/signup')
  authenticatedRoutes.push('/apply') // /apply !important


  // if public, and (to.path) NOT in public, redirect to public '/' home login
  if (!user.value) {
    console.log("no supabase user.value, checking publicRoutes...")
    if (!publicRoutes.includes(to.path)) return navigateTo('/') // public home
  }

  // before checking roles, check default /confirm redirect, then route to roles
  else if (user.value && to.path === '/confirm') {
    console.log("/confirm")
    // public users get redirected to apply
    if (user.value.role === 'authenticated') return navigateTo('/apply')
    return 
  }

  // Role-based Access Control Navigation Limiters & Redirects
  else if (user.value) {

    // /confirm/* (callback in nuxt.config.ts)
    if (user.value.role === 'authenticated') {
      console.log("user.value.role === 'authenticated'")
      if (!authenticatedRoutes.includes(to.path)) return navigateTo('/apply')
    }
    
    // switch/case limits routing using "role-access" lists
    switch(user.value.role) { // cases are of "elevating" access
      case 'applicant': {
        if (!applicantRoutes.includes(to.path)) return navigateTo('/unauthorized')
        else {
          console.log("admin accessing")
        }
      }
      case 'tenant': {
        if (!tenantRoutes.includes(to.path)) return navigateTo('/unauthorized')
        else {
          console.log("admin accessing")
        }
      }
      case 'worker': {
        if (!workerRoutes.includes(to.path)) return navigateTo('/unauthorized')
        else {
          console.log("admin accessing")
        }
      }
      case 'admin': { 
        if (!adminRoutes.includes(to.path)) return navigateTo('/unauthorized')
        else {
          console.log("admin accessing")
        }
      }
    }
  }
  
// every route guard passed, route -> to.path
})







































// // Claude 3.5 Sonnet

// /*all data flow into a web application should be through restricted channels, even if it's only
// a user account, this allows you to track everything more efficiently. For example:

// Response:
// pages/
// ├── [role]/ # admin|tenant|worker
// │ ├── dashboard.vue # /{role}/dashboard
// │ └── messages.vue # /{role}/messages
// └── public/ # unrestricted tools
//   ├── dashboard.vue # /dashboard
//   └── messages.vue # /messages
// middleware/
//   └── route-guard.ts # handles:
//     # 1. Role validation
//     # 2. Public/private routing
//     # 3. Redirects based on user type

// Prompt:
// This Top Navigation Architecture ("blueprint", not "structure") is inherently simpler, and more
// secure than a traditional RBAC setup within a Monolithic web application. It allows you keep all
// navigation guarded behind a middleware route (route-guard.ts), and build tooling on the fly,
// within one page. This increases developer experience for two reasons:
// 1). all tailwind+DaisyUI components, can be grouped thematically, sharing an outer container for each page,
// and 2). a route guard within route-guard.ts can be "sweeping", handling many routes at once, or can be specific.

// Could you provide the middleware for route-guard.ts with the groups you suggested above, with examples for each group?
// */



// /*---------------------------------------
// ---------------------------------------
// -------------RESPONSE CHAT-------------
// ---------------------------------------
// ---------------------------------------*/

// // route-guard.ts
// // export default defineNuxtRouteMiddleware(async (to) => {
// //  const user = useSupabaseUser()
// //  const roles = ['admin', 'tenant', 'worker']
 
// //  // Group 1: Public Auth Tools - Require Basic Auth
// //  if (to.path.match(/^\/auth\/(account|accountconfirm|profile|passforgot|passreset|settings)/)) {
// //    if (!user.value) return navigateTo('/login')
// //    return
// //  }

// //  // Group 2: Role-Specific Routes
// //  if (to.params.role && roles.includes(to.params.role as string)) {
// //    const hasRole = await $fetch('/api/check-role', {
// //      params: { role: to.params.role }
// //    })
   
// //    if (!hasRole) {
// //     // Redirect to appropriate dashboard based on user's role
// //     const userRole = await $fetch('/api/get-user-role')
// //     if 

// //     // else, redirect to dashboard
// //     return navigateTo(`/${userRole}/dashboard`)
// //    }
// //    return
// //  }

// //  // Group 3: Root Redirects
// //  if (to.path === '/') {
// //    const role = await $fetch('/api/get-user-role')
// //    return navigateTo(`/${role}/dashboard`)
// //  }

// //  return navigateTo('/login')
// // })




// /*---------------------------------------
// ---------------------------------------
// -------------RELOADED CHAT-------------
// ---------------------------------------
// ---------------------------------------*/
// /*Reprompt:

// all data flow into a web application should be through restricted channels, even if it's only
// a user account, this allows you to track everything more efficiently. For example:

// Response:
// pages/
// ├── [role]/ # admin|tenant|worker
// │ ├── dashboard.vue # /{role}/dashboard
// │ └── messages.vue # /{role}/messages
// └── public/ # unrestricted tools
//   ├── dashboard.vue # /dashboard
//   └── messages.vue # /messages
// middleware/
//   └── route-guard.ts # handles:
//     # 1. Role validation
//     # 2. Public/private routing
//     # 3. Redirects based on user type

// Prompt:
// This Top Navigation Architecture ("blueprint", not "structure") is inherently simpler, and more
// secure than a traditional RBAC setup within a Monolithic web application. It allows you keep all
// navigation guarded behind a middleware route (route-guard.ts), and build tooling on the fly,
// within one page. This increases developer experience for two reasons:
// 1). all tailwind+DaisyUI components, can be grouped thematically, sharing an outer container for each page,
// and 2). a route guard within route-guard.ts can be "sweeping", handling many routes at once, or can be specific.

// Could you provide the middleware for route-guard.ts with the groups you suggested above, with examples for each group?
// */





// // PRIVATE RBAC Redirects for Supabase roles
// // * user has to get past /auth/verify first
// import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
// import { useUserStore } from '@/stores/user'

// // Define valid roles and their allowed paths
// const roleRoutes = {
//   admin: ['/admin/dashboard', '/admin/messages'],
//   tenant: ['/tenant/dashboard', '/tenant/messages'],
//   worker: ['/worker/dashboard', '/worker/messages']
// }

// const publicRoutes = ['/dashboard', '/messages']

// export default defineNuxtRouteMiddleware((to) => {
//   const userStore = useUserStore()
//   const { role, isAuthenticated } = userStore

//   // Handle public routes
//   if (publicRoutes.includes(to.path)) {
//     return
//   }

//   // Redirect unauthenticated users
//   if (!isAuthenticated) {
//     return navigateTo('/login')
//   }

//   // Get allowed routes for user's role
//   const allowedRoutes = roleRoutes[role]

//   // Validate role-specific routes
//   if (to.path.startsWith(`/${role}/`)) {
//     if (!allowedRoutes.includes(to.path)) {
//       return navigateTo(`/${role}/dashboard`)
//     }
//     return
//   }

//   // Handle unauthorized role access
//   const attemptedRole = to.path.split('/')[1]
//   if (Object.keys(roleRoutes).includes(attemptedRole)) {
//     return navigateTo(`/${role}/dashboard`)
//   }

//   // Catch-all redirect to role dashboard
//   return navigateTo(`/${role}/dashboard`)
// })







// // 
// // 
// // 
// // 
// // 
// // 
// // 
// // 
// export default defineNuxtRouteMiddleware((to, from) => {
//   // this middleware is used for protecting routes that are role specific

//   const userStore = useUserStore();

//   console.log("From auth middleware");
//   console.log("to", to);
//   console.log("from", from);
//   console.log("authenticated", userStore.authenticated);

//   // If the user is authenticated, continue to the requested route
//   if (userStore.authenticated === true) {
//     console.log(userStore)
//     return // returns nothing means continue the middleware, instead of redirect again
//   }
//   else {
//       // If the user is not authenticated, redirect to the login page
//       return navigateTo("/login");
//   };

//   // RBAC Page Navigation Tree
//   if (user.value) {
//     if (user.value.role === "tenant") {
//       navigateTo('/tenant/dashboard', { replace: true });
//     }
//     else if (user.value.role === "worker") {
//       navigateTo('/worker/dashboard', { replace: true });
//     }
//     else if (user.value.role === "admin") {
//       navigateTo('/admin/dashboard', { replace: true });
//     }

//   }
//   else {
//     return navigateTo('/');
//   }
// };


// // 
// // routeRules: {
// //   '/admin/**': { middleware: ['auth'] },
// //   '/maintenance/**': { middleware: ['auth'] },
// //   '/tenant/**': { middleware: ['auth'] }
// // }