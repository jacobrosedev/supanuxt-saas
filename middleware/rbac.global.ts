export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(`/middleware/rbac.global.ts: '${from.path}' -> '${to.path}'`)
  const publicRoutes = [ // nuxt.config.ts redirects
    '/', '/signup', '/confirm', '/forgot', 
    '/contact', '/privacy', '/terms','/unauthorized'
  ]
  const authenticatedRoutes = [...publicRoutes,
    '/dashboard', '/messages', 
    '/apply', '/apply/tenant', "/apply/worker",
    '/auth', '/auth/verify', '/auth/delete', '/auth/reset'
  ]
  const roleRoutes = {
    "authenticated": authenticatedRoutes,
    "applicant": [...authenticatedRoutes, '/apply/status'],
    "tenant": [...authenticatedRoutes,
      "/tenant/request", "/tenant/complaint", "/tenant/billing", "/tenant/lease",
      "/tenant/payment","/tenant/payment/success","/tenant/payment/cancel","/tenant/payment/fail",
    ],
    "worker": [...authenticatedRoutes],
    "admin": [...authenticatedRoutes],
  }
  // Top-Down RBAC Navigation from 'public' to 'admin'
  const user = useSupabaseUser()
  if (!user.value) { console.log("User:", null);
    if (!publicRoutes.includes(to.path)) return navigateTo('/unauthorized')
  }
  else if (user.value) {
    if (to.path == "/signup") return navigateTo('/confirm');
    // /confirm - if (user.value) {
    //   if (user.value.role === 'authenticated') return navigateTo('/apply');
    //   else if (user.value.role === 'applicant') return navigateTo('/apply/status');
    //   return navigateTo('/dashboard'); // tenant, worker, admin
    // }

    if (user.value.role) console.log("Role:", user.value.role);
    console.log("Routes:", roleRoutes[user.value.role])
    let routes = roleRoutes[user.value.role]
    if (!routes.includes(to.path)) return navigateTo('/unauthorized', { replace: true });
  }
})


  //  if (to.path.match(/^\/auth\/(account|accountconfirm|profile|passforgot|passreset|settings)/))
  // this should be covered by a a star guard /tenant/*