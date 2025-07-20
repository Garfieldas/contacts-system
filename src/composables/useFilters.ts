import { ref, watch } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import { useOffices } from '@/composables/useOffices';
import { useDivisions } from '@/composables/useDivisions';
import { useDepartments } from '@/composables/useDepartments';
import { useGroups } from '@/composables/useGroups';

export function useFilters(fetchRequest: (query: string) => void) {
const { companies } = useCompanies();
const { offices, fetchOffices } = useOffices();
const { divisions, fetchDivisions } = useDivisions();
const { departments, fetchDepartments } = useDepartments();
const { groups, fetchGroups } = useGroups();

const selectedCompany = ref();
const fetchedOffices: any = ref([]);
const selectedOffice = ref();
const fetchedDivisions: any = ref([]);
const selectedDivision = ref();
const fetchedDepartments: any = ref([]);
const selectedDepartment = ref();
const fetchedGroups: any = ref([]);
const selectedGroup = ref();

watch(selectedCompany, async() => {
    fetchRequest(`?filter=company_id="${selectedCompany.value}"&expand=office_id`);
    selectedOffice.value = null;
    fetchedOffices.value = [];
    fetchedDivisions.value = [];
    selectedDivision.value = null;
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    await fetchOffices(`?filter=company_id="${selectedCompany.value}"&expand=office_id&fields=expand.office_id`);
    fetchedOffices.value = (offices.value as any[]).map(item => item.expand.office_id);
});
watch(selectedOffice, async() => {
    fetchedDivisions.value = [];
    selectedDivision.value = null;
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

    await fetchDivisions(`?filter=office_id="${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
    fetchedDivisions.value = (divisions.value as any[]).map(item => item.expand.division_id)
});
watch(selectedDivision, async() => {
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}" && division_id="${selectedDivision.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

    await fetchDepartments(`?filter=division_id="${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
    fetchedDepartments.value = (departments.value as any[]).map(item => item.expand.department_id);
});
watch(selectedDepartment, async () => {
    fetchedGroups.value = [];
    selectedGroup.value = null;
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}" && division_id="${selectedDivision.value}" && department_id="${selectedDepartment.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

    await fetchGroups(`?filter=department_id="${selectedDepartment.value}"&expand=group_id&fields=expand.group_id`);
    fetchedGroups.value = (groups.value as any[]).map(item => item.expand.group_id);
});
watch(selectedGroup, () => {
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}" && division_id="${selectedDivision.value}" && department_id="${selectedDepartment.value}" && group_id="${selectedGroup.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);
})
  return {
    companies,
    selectedCompany,
    selectedOffice,
    selectedDivision,
    selectedDepartment,
    selectedGroup,
    fetchedOffices,
    fetchedDivisions,
    fetchedDepartments,
    fetchedGroups,
  };
}