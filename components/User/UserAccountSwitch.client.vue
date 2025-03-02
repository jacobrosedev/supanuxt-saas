<script setup lang="ts">
// import { storeToRefs } from 'pinia';
const user = useSupabaseUser()
  // const accountStore = useAccountStore();
  // const { dbUser, activeAccountId } = storeToRefs(accountStore);

  // onMounted(async () => {
  //   await accountStore.init();
  // });
</script>

<template>
  <div>
    <template v-if="user">
      Role: {{ user.role }}
    </template>
  </div>
  <!-- <template v-if="dbUser?.memberships && dbUser?.memberships.length > 1">
    <li>Switch Account</li>
    <li v-for="membership in dbUser?.memberships">
      <a
        v-if="membership.account_id !== activeAccountId && !membership.pending"
        href="#"
        @click="accountStore.changeActiveAccount(membership.account_id)">
        {{ membership.account.name }}
      </a>
      <span v-if="membership.pending">
        {{ membership.account.name }} (pending)
      </span>
    </li>
  </template> -->
</template>
