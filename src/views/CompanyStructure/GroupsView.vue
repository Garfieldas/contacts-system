<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <GroupsTable :groups="groups"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
</template>
<script setup lang="ts">
import GroupsTable from '@/components/UI/Groups/GroupsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import { useNotificationStore } from '@/stores/notificationstore';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { ref, computed, watch, onMounted } from 'vue';
import { getGroups } from '@/services/groupsService';
const groups = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);
const auth = useAuthenticationStore();
const hideActions = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions && auth.user_permissions.edit_structure && auth.user_permissions.delete_structure) {
        return true;
    }
    return false;
});

const fetchGroups = async (params?:string) => {
    const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : `?page=${page.value}&perPage=${perPage.value}`;
    try {
        const response = await getGroups(url);
        groups.value = response.items;
        totalItems.value = response.totalItems;
        totalPages.value = response.totalPages;
        if(isFirstLoad.value) {
            store.addSuccessNotification('Grupės gautos sėkmingai!');
            isFirstLoad.value = false;
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

watch(page, () => {
    fetchGroups();
})
onMounted(() => {
    fetchGroups();
})
</script>