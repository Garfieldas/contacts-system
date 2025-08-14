<template>
    <BaseLayout title="Admin paskyros">
    <div class="flex items-center mb-6 gap-12" id="button">
        <AddButton v-if="hideActions" @click="switchComponent(CreateUserForm)"/>
        <h2>Sukūrti naują admin paskyrą:</h2>
    </div>
    <UsersTable :users="users" @edit-user="(user: User) => {
        selectUser(user); switchComponent(EditUserForm);
    }" @edit-permissions="(user: User) => {
        selectUser(user); switchComponent(EditUserPermissionsForm);
    }" @delete-user="(user: User) => {
        selectUser(user); switchComponent(DeleteUserForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions"
    :hide-close-button="currentForm === DeleteUserForm">
        <component :is="currentForm" @user-submit="handleSubmit" :user="selectedUser" @cancel-action="toggleModal"/>
    </BaseModal>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AddButton from '@/components/UI/AddButton.vue';
import UsersTable from '@/components/UI/Users/UsersTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import { getUsers } from '@/services/usersService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { onMounted, ref, computed, watch, shallowRef } from 'vue';
import CreateUserForm from '@/components/UI/forms/Users/CreateUserForm.vue';
import type { User } from '@/types/userType';
import EditUserForm from '@/components/UI/forms/Users/EditUserForm.vue';
import EditUserPermissionsForm from '@/components/UI/forms/Users/EditUserPermissionsForm.vue';
import DeleteUserForm from '@/components/UI/forms/Users/DeleteUserForm.vue';
const users = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const auth = useAuthenticationStore();
const isFirstLoad = ref(true);
const selectedUser = ref();

const currentForm = shallowRef<typeof CreateUserForm>(CreateUserForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}
const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_permissions && auth.user_permissions.delete_permissions) {
        return true;
    }
    return false;
});

const selectUser = (user: User) => selectedUser.value = user;

const handleSubmit = () => {
    fetchUsers();
    showModal.value = false;
}


const fetchUsers = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getUsers(url);
        users.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        if(isFirstLoad.value) {
            store.addSuccessNotification('Vartotojai gauti sėkmingai!');
            isFirstLoad.value = false;
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
watch(page, () => {
    fetchUsers();
})
onMounted(() => {
    fetchUsers();
})
</script>