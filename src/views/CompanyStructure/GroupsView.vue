<template>
    <teleport defer to="#button" v-if="showEditStructure">
        <AddButton @click="switchComponent(CreateGroupForm)"/>
        <h2>Pridėti naują struktūrą:</h2>
    </teleport>
    <Spinner v-if="isLoading"/>
    <NoResultsDisplay v-else-if="(!groups || groups.length === 0) && !isLoading"
        title="Nerasta jokių grupių"
    />
    <div v-else>
    <GroupsTable :groups="groups" @edit-group="(group: Group) => {
        selectGroup(group); switchComponent(EditGroupForm);
    }" @delete-group="(group: Group) => {
        selectGroup(group); switchComponent(DeleteGroupForm);
    }"/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
   <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="showEditStructure || showDeleteStructure"
   :hide-close-button="currentForm === DeleteGroupForm">
        <component :is="currentForm" @group-submit="handleSubmit" :group="selectedGroup" @cancel-action="toggleModal"/>
    </BaseModal>
    </div>
</template>
<script setup lang="ts">
import GroupsTable from '@/components/UI/Groups/GroupsTable.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import AddButton from '@/components/UI/AddButton.vue';
import { useNotificationStore } from '@/stores/notificationstore';
import { ref, watch, onMounted, shallowRef } from 'vue';
import { getGroups } from '@/services/groupsService';
import BaseModal from '@/components/UI/BaseModal.vue';
import CreateGroupForm from '@/components/UI/forms/Groups/CreateGroupForm.vue';
import type { Group } from '@/types/groupType';
import EditGroupForm from '@/components/UI/forms/Groups/EditGroupForm.vue';
import DeleteGroupForm from '@/components/UI/forms/Groups/DeleteGroupForm.vue';
import { useActions } from '@/composables/useActions';
import Spinner from '@/components/UI/Spinner.vue';
import NoResultsDisplay from '@/components/UI/NoResultsDisplay.vue';

const groups = ref();
const page = ref(1);
const perPage=ref(25);
const totalItems = ref();
const totalPages = ref();
const store = useNotificationStore();
const isFirstLoad = ref(true);
const isLoading = ref(true);
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

const { showEditStructure, showDeleteStructure } = useActions();

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
    finally {
        isLoading.value = false;
    }
}

watch(page, () => {
    fetchGroups();
})
onMounted(() => {
    fetchGroups();
})
</script>