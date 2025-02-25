// stores/rbac.ts
import { defineStore } from 'pinia'
import { User } from '@supabase/supabase-js'

interface RBACState {
  user: User | null
  role: string | null
  permissions: string[]
}

export const useRBACStore = defineStore('rbac', {
  state: (): RBACState => ({
    user: null,
    role: null,
    permissions: []
  }),

  getters: {
    isAdmin: (state) => state.role === 'admin',
    isTenant: (state) => state.role === 'tenant',
    isWorker: (state) => state.role === 'worker',
    isApplicant: (state) => state.role === 'applicant',
    
    hasPermission: (state) => (permission: string) => 
      state.permissions.includes(permission)
  },

  actions: {
    async initialize(user: User | null) {
      this.user = user
      if (user) {
        await this.fetchUserRole()
        await this.fetchPermissions()
      } else {
        this.role = null
        this.permissions = []
      }
    },

    async fetchUserRole() {
      const { data: { user }, error } = await useSupabaseClient().auth.getUser()
      if (error || !user) {
        console.error('Error fetching user:', error)
        return
      }
      this.role = user.role as string
    },

    async fetchPermissions() {
      if (!this.role) return

      const { data, error } = await useSupabaseClient()
        .from('role_permissions')
        .select('permission')
        .eq('role', this.role)

      if (error) {
        console.error('Error fetching permissions:', error)
        return
      }

      this.permissions = data.map(p => p.permission)
    },

    async assignRole(userId: string, newRole: string) {
      const { error } = await useSupabaseClient()
        .rpc('assign_user_role', {
          target_user_id: userId,
          new_role: newRole
        })

      if (error) {
        console.error('Error assigning role:', error)
        throw error
      }

      await this.fetchUserRole()
      await this.fetchPermissions()
    }
  }
})