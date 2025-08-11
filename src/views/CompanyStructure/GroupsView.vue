<template>
    <teleport defer to="#button" v-if="hideActions">
        <AddButton @click="switchComponent(CreateGroupForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <GroupsTable :groups="groups" @edit-group="(group: Group) => {
        selectGroup(group); switchComponent(EditGroupForm);
    }" @delete-group="(group: Group) => {
        selectGroup(group); switchComponent(DeleteGroupForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
   <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="hideActions"
   :hide-close-button="currentForm === DeleteGroupForm">
        <component :is="currentForm" @group-submit="handleSubmit" :group="selectedGroup" @cancel-delete="toggleModal"/>
    </BaseModal>
</template>
<script setup lang="ts">
import GroupsTable from '@/components/UI/Groups/GroupsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import { useNotificationStore } from '@/stores/notificationstore';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { ref, computed, watch, onMounted, shallowRef } from 'vue';
import { getGroups } from '@/services/groupsService';
import BaseModal from '@/components/UI/BaseModal.vue';
import CreateGroupForm from '@/components/UI/forms/Groups/CreateGroupForm.vue';
import type { Group } from '@/types/groupType';
import EditGroupForm from '@/components/UI/forms/Groups/EditGroupForm.vue';
import DeleteGroupForm from '@/components/UI/forms/Groups/DeleteGroupForm.vue';

const groups = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);
const auth = useAuthenticationStore();
const currentForm = shallowRef<typeof CreateGroupForm | typeof EditGroupForm | typeof DeleteGroupForm>(CreateGroupForm);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}

const switchComponent = (component: any) => {
    showModal.value = true;
    currentForm.value = component;
}

const handleSubmit = () => {
    fetchGroups();
    showModal.value = false;
}

const selectedGroup = ref();
const selectGroup = (group: Group) => selectedGroup.value = group;
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