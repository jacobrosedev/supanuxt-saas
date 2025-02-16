// composables/useRoles.js
// programmatically return these properties into any page or component for supporting RBAC in single view
export const useRoles = () => {
    // always check directly from supabase
    const user = useSupabaseUser() 
    
    return {
      isAdmin: computed(() => user.value?.role === 'admin'),
      isWorker: computed(() => user.value?.role === 'worker'),
      isTenant: computed(() => user.value?.role === 'tenant')
    }
  }