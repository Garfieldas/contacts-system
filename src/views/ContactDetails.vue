<template>
    <BaseLayout title="Detalesnė kontakto informacija">
        <div class="mb-8 flex justify-end items-center">
            <GoBackButton />
        </div>
        <Spinner v-if="isLoading"/>
        <NoResultsDisplay v-else-if="!employee"
            title="Nepavyko rasti informacija"/>
        <SingleContactCard v-else :employee="employee"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import SingleContactCard from '@/components/UI/Contacts/SingleContactCard.vue';
import GoBackButton from '@/components/UI/GoBackButton.vue';
import { getEmployees } from '@/services/employeesService';
import { useNotificationStore } from '@/stores/notificationstore';
import { onMounted, ref } from 'vue';
import type { Employee } from '@/types/employeeType';
import { useRouter } from 'vue-router';
import Spinner from '@/components/UI/Spinner.vue';
import NoResultsDisplay from '@/components/UI/NoResultsDisplay.vue';
const props = defineProps(['id']);
const employee = ref<Employee[]>();
const store = useNotificationStore();
const router = useRouter();
const isLoading = ref(true);
const fetchEmployee = async () => {
    try {
        const response = await getEmployees(`/${props.id}?expand=office_id,company_id,department_id,division_id,group_id`);
        employee.value = response;
    }
    catch(error: any){
        store.addErrorNotification(error);
        router.replace({ name: 'not-found' })
    }
    finally {
        isLoading.value = false;
    }
}
onMounted(() => {
    fetchEmployee();
})
</script>