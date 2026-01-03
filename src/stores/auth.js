import { defineStore } from 'pinia'
import { supabase } from '/src/lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
    ready: false
  }),

  actions: {
    async init() {
      const { data } = await supabase.auth.getSession()
      this.user = data.session?.user || null

      if (this.user) {
        await this.fetchProfile()
      }

      this.ready = true

      supabase.auth.onAuthStateChange(async (_event, session) => {
        this.user = session?.user || null

        if (this.user) {
          await this.fetchProfile()
        } else {
          this.profile = null
        }
      })
    },

    async fetchProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single()

      this.profile = data
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.profile = null
    }
  }
})
