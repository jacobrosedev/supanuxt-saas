<script setup lang="ts">
  const supabase = useSupabaseClient();

  // onMounted(async () => {
  //   await accountStore.init();
  // });

  async function signout() {
    console.log("LOGOUT REDIRECT: /components/User/UserAccountSignout.client.vue")
    await supabase.auth.signOut();
    // if (accountStore) {
    //   accountStore.signout();
    // }
    navigateTo('/', { replace: true });
  }
</script>
<template>
  <a href="#" @click.prevent="signout()">Signout</a>
</template>
