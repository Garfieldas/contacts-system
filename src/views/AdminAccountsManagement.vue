<template>
    <BaseLayout title="Admin paskyros">
    <div class="flex items-center mb-6 gap-12" id="button">
        <AddButton v-if="hideActions"/>
        <h2>Sukūrti naują admin paskyrą:</h2>
    </div>
    <UsersTable :users="users"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import AddButton from '@/components/UI/AddButton.vue';
import UsersTable from '@/components/UI/Users/UsersTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import { getUsers } from '@/services/usersService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { onMounted, ref, computed, watch } from 'vue';
const users = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const auth = useAuthenticationStore();
const isFirstLoad = ref(true);

const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_permissions && auth.user_permissions.delete_permissions) {
        return true;
    }
    return false;
});

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