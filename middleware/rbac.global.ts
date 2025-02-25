import { useRBACStore } from '~/stores/rbac'
// Top-Down RBAC Navigation from 'public' to 'admin'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const rbacStore = useRBACStore()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  console.log(`/middleware/rbac.global.ts: '${from.path}' -> '${to.path}'`)
  if (user.value) console.log("Supabase User:", user.value.role)

  // Get initial session and initialize store
  const { data: { session } } = await supabase.auth.getSession()
  await rbacStore.initialize(session?.user || null)

  



  

  // ###########################################################################
  // ######################### DEFINE ROUTE COLLECTIONS ########################
  // ###########################################################################
  const publicRoutes = [
    '/', '/confirm', '/forgot', // nuxt.config.ts redirect, & forgot password
    '/contact', '/privacy', '/terms',
    '/unauthorized', '/signup'
  ]
  // role can see all routes requiring user authentication
  const authenticatedRoutes = [
    '/dashboard', '/messages', '/auth', '/apply', '/verify',
    '/auth/delete', '/auth/reset' // account, deletion + password reset
  ]

  const roleSharedRoutes = [...publicRoutes, ...authenticatedRoutes]
  publicRoutes.push('/signup') // add public hidden-to-user routes
  const applicantRoutes = [...roleSharedRoutes]
  const tenantRoutes = [...roleSharedRoutes, "/tenant", // this should be covered by a a star guard /tenant/*
    "/tenant/request",
    "/tenant/complaint",
    "/tenant/payment","/tenant/payment/success","/tenant/payment/cancel","/tenant/payment/fail",
    "/tenant/billing",
    "/tenant/lease"
  ]
  const workerRoutes = [...roleSharedRoutes,
    "/tenant/request",
    "/tenant/complaint",
    "/tenant/payment",
    "/tenant/billing",
    "/tenant/lease"
  ]
  const adminRoutes = [...roleSharedRoutes]


  

  // ###########################################################################
  // ####################### PUBLIC LIMITERS & REDIRECTS #######################
  // ###########################################################################
  // if public, and (to.path) NOT in public, redirect to public '/' home login
  // Handle public access
  if (!user.value) {
    console.log("no supabase user.value, checking publicRoutes...")
    if (!publicRoutes.includes(to.path)) {
      return navigateTo('/')
    }
    return
  }



  // ###########################################################################
  // ####################### USER CONFIRMATION PROCESS #########################
  // ###########################################################################
  // before checking roles, (nuxt.config) /confirm redirect, then route to roles
 
  // Handle confirmation process
  if (user.value && ['/signup', '/confirm', '/apply'].includes(to.path)) {
    console.log("/confirm")
    if (user.value.role === 'authenticated') {
      return navigateTo('/apply')
    }
    return navigateTo('/apply')
  }

  // ###########################################################################
  // ####################### Role-based Access Control #########################
  // ################### Navigation Limiters & Redirects #######################
  // ###########################################################################
  // user EXISTS -> CHECK role -> ENFORCE roleRoutes FOR role -> redirect /apply
  // Handle authenticated users
  if (user.value.role === 'authenticated') {
    console.log("user.value.role === 'authenticated'")
    if (!authenticatedRoutes.includes(to.path)) {
      return navigateTo('/apply')
    }
    return
  }

  // Handle role-based route access
  if (user.value) {
    const role = user.value.role
    let allowedRoutes: string[] = []

    switch(role) {
      case 'applicant':
        allowedRoutes = applicantRoutes
        console.log("applicant accessing")
        break
      case 'tenant':
        allowedRoutes = tenantRoutes
        console.log("tenant accessing")
        break
      case 'worker':
        allowedRoutes = workerRoutes
        console.log("worker accessing")
        break
      case 'admin':
        allowedRoutes = adminRoutes
        console.log("admin accessing")
        break
      default:
        allowedRoutes = publicRoutes
    }

    if (!allowedRoutes.includes(to.path)) {
      return navigateTo('/unauthorized')
    }
  }

  // Additional permission-based checks from store
  const requiredRole = to.meta.requiredRole as string
  const requiredPermission = to.meta.requiredPermission as string

  if (requiredRole && rbacStore.role !== requiredRole) {
    return navigateTo('/unauthorized')
  }

  if (requiredPermission && !rbacStore.hasPermission(requiredPermission)) {
    return navigateTo('/unauthorized')
  }
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