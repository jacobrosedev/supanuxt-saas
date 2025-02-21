// composables/useRoles.js
// programmatically return these properties into any page or component for supporting RBAC in single view
export const useRoles = () => {
    // always check directly from supabase
    const user = useSupabaseUser() 
    
    return {
      isAuthenticated: computed(() => user.value?.role === 'authenticated'),
      isApplicant: computed(() => user.value?.role === 'applicant'),
      isTenant: computed(() => user.value?.role === 'tenant'),
      isWorker: computed(() => user.value?.role === 'worker'),
      isAdmin: computed(() => user.value?.role === 'admin')
    }
  }