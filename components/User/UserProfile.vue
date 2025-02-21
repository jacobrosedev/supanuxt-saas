<script lang="ts">
// user profile component updates user's raw_user_meta_data in supabase backend
// if user changes phone number, we send them a 6-digit pin.
// if user changes email, we send them an email
//  user cannot change first and last name, or address once entered
// 
// email required, sends confirmation email
// phone optional, sends 6-digit code to verify phone
// address optional
// user can edit a profile image, or account will load with default user image


// COPY SUPABASE TUTORIAL THEN MODIFY IT
</script>

<template><div>User Profile Component</div></template>