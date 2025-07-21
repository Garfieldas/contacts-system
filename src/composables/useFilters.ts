import { computed, ref, watch, type Ref } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import { useOffices } from '@/composables/useOffices';
import { useDivisions } from '@/composables/useDivisions';
import { useDepartments } from '@/composables/useDepartments';
import { useGroups } from '@/composables/useGroups';
import type { Office, expandOffice } from '@/types/officeType';
import type { Division, expandDivision } from '@/types/divisionType';
import type { Department, expandDepartment } from '@/types/departmentType';
import type { Group, expandGroup } from '@/types/groupType';

export function useFilters(fetchRequest: (query: string) => void, perPage: Ref<Number>, page: Ref<Number>) {
  const { companies } = useCompanies();
  const { offices, fetchOffices } = useOffices();
  const { divisions, fetchDivisions } = useDivisions();
  const { departments, fetchDepartments } = useDepartments();
  const { groups, fetchGroups } = useGroups();

  const selectedCompany = ref();
  const fetchedOffices = ref<Office[]>([]);
  const selectedOffice = ref();
  const fetchedDivisions = ref<Division[]>([]);
  const selectedDivision = ref();
  const fetchedDepartments = ref<Department[]>([]);
  const selectedDepartment = ref();
  const fetchedGroups = ref<Group[]>([]);
  const selectedGroup = ref();
  const isResetting = ref(false);

  const filterQuee = computed(() => {
    const filters: string[] = [];

    if (selectedCompany.value) {
      filters.push(`company_id="${selectedCompany.value}"`);
    }
    if (selectedOffice.value) {
      filters.push(`office_id="${selectedOffice.value}"`);
    }
    if (selectedDivision.value) {
      filters.push(`division_id="${selectedDivision.value}"`);
    }
    if (selectedDepartment.value) {
      filters.push(`department_id="${selectedDepartment.value}"`);
    }
    if (selectedGroup.value) {
      filters.push(`group_id="${selectedGroup.value}"`);
    }

    let query = '';
    if (filters.length > 0) {
      query = `&filter=${encodeURIComponent(filters.join(' && '))}&expand=office_id`;
    } else {
      query = '&expand=office_id';
    }
    return query;
  });

  watch([page, perPage], ([newPage, newPerPage], [oldPage, oldPerPage]) => {
    if (isResetting.value) return;
    if (newPerPage !== oldPerPage) {
      page.value = 1;
    }
    fetchRequest(filterQuee.value);
  })

  watch(selectedCompany, async () => {
    if (isResetting.value) return;
    isResetting.value = true;
    perPage.value = 25;
    page.value = 1;
    selectedOffice.value = null;
    fetchedOffices.value = [];
    fetchedDivisions.value = [];
    selectedDivision.value = null;
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    isResetting.value = false;
    
    await fetchOffices(`?filter=company_id="${selectedCompany.value}"&expand=office_id&fields=expand.office_id`);
    fetchedOffices.value = (offices.value as expandOffice[]).map(item => item.expand.office_id);
    fetchRequest(filterQuee.value);
  });

  watch(selectedOffice, async () => {
    if (isResetting.value) return; 
    
    isResetting.value = true;
    perPage.value = 25;
    page.value = 1;
    fetchedDivisions.value = [];
    selectedDivision.value = null;
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    isResetting.value = false;
    
    fetchRequest(filterQuee.value);

    await fetchDivisions(`?filter=office_id="${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
    fetchedDivisions.value = (divisions.value as expandDivision[]).map(item => item.expand.division_id)
  });

  watch(selectedDivision, async () => {
    if (isResetting.value) return;
    
    isResetting.value = true;
    perPage.value = 25;
    page.value = 1;
    fetchedDepartments.value = [];
    selectedDepartment.value = null
    fetchedGroups.value = [];
    selectedGroup.value = null;
    isResetting.value = false;
    
    fetchRequest(filterQuee.value);

    await fetchDepartments(`?filter=division_id="${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
    fetchedDepartments.value = (departments.value as expandDepartment[]).map(item => item.expand.department_id);
  });

  watch(selectedDepartment, async () => {
    if (isResetting.value) return;
    
    isResetting.value = true;
    perPage.value = 25;
    page.value = 1;
    fetchedGroups.value = [];
    selectedGroup.value = null;
    isResetting.value = false;
    
    fetchRequest(filterQuee.value);

    await fetchGroups(`?filter=department_id="${selectedDepartment.value}"&expand=group_id&fields=expand.group_id`);
    fetchedGroups.value = (groups.value as expandGroup[]).map(item => item.expand.group_id);
  });

  watch(selectedGroup, () => {
    if (isResetting.value) return;
    
    fetchRequest(filterQuee.value);
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