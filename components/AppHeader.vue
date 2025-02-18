<script setup lang="ts">
  const user = useSupabaseUser();
  // const { isAdmin, isWorker, isTenant } = [ true, true, true ] //useRoles()
</script>

<template>
  <div class="navbar bg-base-100">
    <Notifications />

    <div class="navbar-start">
      
      <template v-if="user">
        <!-- Hamburger Menu  -->
        <div class="dropdown">
          <!-- Hamburger Icon -->
          <label tabindex="0" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <!-- RBAC hamburger options from useRoles.js composable -->
          <ul tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <!-- Admin User -->
            <template v-if="true">
              <li><NuxtLink to="/finance">Finance</NuxtLink></li>
              
              <!-- Admin Specific Routes -->
              <li><NuxtLink to="/units">Units</NuxtLink></li>
              <li><NuxtLink to="/users">Users</NuxtLink></li>
              <li><NuxtLink to="/leases">Leases</NuxtLink></li>

              <li><NuxtLink to="/messages">Messages</NuxtLink></li>
              <li><NuxtLink to="/requests">Requests</NuxtLink></li>
            </template>
            <hr>
            <!-- Worker User -->
            <template v-if="true">
              <li><NuxtLink to="/messages">Messages</NuxtLink></li>
              <li><NuxtLink to="/requests">Requests</NuxtLink></li>

              <!-- Worker Specific Routes -->
              <li><NuxtLink to="/schedule">Schedule</NuxtLink></li>
              <li><NuxtLink to="/earnings">Earnings</NuxtLink></li>
              <li><NuxtLink to="/receipts">Receipts</NuxtLink></li>
            </template>
            <hr>
            <!-- Tenant User -->
            <template v-if="true">
              <li><NuxtLink to="/messages">Messages</NuxtLink></li>

              <!-- Tenant Specific Routes -->
              <li><NuxtLink to="/payment">Payment</NuxtLink></li>
              <li><NuxtLink to="/tenant/request">Request</NuxtLink></li>
              <li><NuxtLink to="/tenant/billing">Billing</NuxtLink></li>
              <li><NuxtLink to="/tenant/lease">Lease</NuxtLink></li>
            </template>
          </ul>
        </div>
      </template>

      <!-- Index Link-->
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
        TKS Apartments
      </NuxtLink>
    </div>




    <template v-if="user">

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li v-if="!user"><NuxtLink to="/apply">Apply</NuxtLink></li>
          
        </ul>

        <template v-if="user">
          <NuxtLink to="/dashboard" class="btn btn-ghost normal-case text-xl">Dashboard</NuxtLink>
        </template>
      </div>
    </template>
    <!-- Nav-Right User Account Icon -->
    <UserAccount v-if="user" :user="user" />
  </div>
</template>
