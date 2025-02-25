<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="navbar bg-base-100">
    <Notifications />

    <div class="navbar-start">
      
      
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

          <!-- accessible to ONLY public user -->
          <template v-if="!user">
            <li><NuxtLink to="/">Login</NuxtLink></li>
            <li><NuxtLink to="/signup">Signup</NuxtLink></li>
          </template>

          <!-- accessible to ONLY RBAC users -->
          <template v-if="user">
            <!-- 'authenticated' Specific Routes -->
            <template v-if="user.role === 'authenticated'">
              <h2>Role: Authenticated</h2>
              <hr>
              <li><NuxtLink to="/apply">Apply Now</NuxtLink></li>
            </template>
            <!-- 'applicant' Specific Routes -->
            <template v-else-if="user.role === 'applicant'">
              <h2>Role: Applicant</h2>
              <li><NuxtLink to="/dashboard">Application</NuxtLink></li>
            </template>
            <!-- 'tenant' Specific Routes -->
            <template v-else-if="user.role === 'tenant'">
              <h2>Role: Tenant</h2>
              <li><NuxtLink to="/tenant/request">Request</NuxtLink></li>
              <li><NuxtLink to="/tenant/complaint">Complaint</NuxtLink></li>
              <li><NuxtLink to="/tenant/payment">Payment</NuxtLink></li>
              <li><NuxtLink to="/tenant/billing">Billing</NuxtLink></li>
              <li><NuxtLink to="/tenant/lease">Lease</NuxtLink></li>
            </template>
            <!-- 'worker' Specific Routes -->
            <template v-else-if="user.role === 'worker'">
              <h2>Role: Worker</h2>
              <li><NuxtLink to="/w/requests">Requests</NuxtLink></li>
              <li><NuxtLink to="/w/receipts">Receipts</NuxtLink></li>
              <li><NuxtLink to="/w/schedule">Schedule</NuxtLink></li>
              <li><NuxtLink to="/w/earnings">Earnings</NuxtLink></li>
            </template>
            <!-- 'admin' Specific Routes -->
            <template v-else-if="user.role === 'admin'">
              <h2>Role: Admin</h2>
              <li><NuxtLink to="/admin/finance">Finance</NuxtLink></li>
              <li><NuxtLink to="/admin/units">Units</NuxtLink></li>
              <li><NuxtLink to="/admin/requests">Requests</NuxtLink></li>
              <li><NuxtLink to="/admin/users">Users</NuxtLink></li>
              <li><NuxtLink to="/admin/leases">Leases</NuxtLink></li>
              <li><NuxtLink to="/admin/requests">Complaints</NuxtLink></li>
            </template>
          </template>

        </ul>
      </div>
      




      <!-- Index Link-->
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl bg-gray-200">
        TKS Apartments
      </NuxtLink>
    </div>


    <!-- Top nav banner quick links, like a hotbar for each role -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          
          <template v-if="!user">
            <li><NuxtLink class="btn btn-ghost normal-case text-xl bg-gray-200" to="/">Login</NuxtLink></li>
            <li><NuxtLink class="btn btn-ghost normal-case text-xl bg-gray-200" to="/signup">Sign Up</NuxtLink></li>
          </template>

          <template v-if="user">
            <template v-if="user.role === 'authenticated'">
              <li>
                <NuxtLink to="/apply"
                  class="btn btn-ghost normal-case text-xl bg-gray-200">
                    Applying now
                </NuxtLink>
              </li>
            </template>

            <template v-if="user.role === 'tenant' || user.role === 'worker' || user.role === 'admin'">
              <li>
                <NuxtLink to="/dashboard" class="btn btn-ghost normal-case text-xl">Dashboard</NuxtLink>
              </li>
            </template>
          </template>

          
        </ul>
      </div>

    <!-- Nav-Right User Account Icon -->
    <UserAccount v-if="user" :user="user" />
  </div>
</template>
