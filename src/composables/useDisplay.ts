import { shallowRef } from "vue"
import ContactList from "@/components/UI/Contacts/ContactList.vue";
import ContactTable from "@/components/UI/Contacts/ContactTable.vue";

export const useDisplay = () => {
    const currentDisplay = shallowRef(ContactList);
    const toggleComponent = () => {
        currentDisplay.value = currentDisplay.value === ContactList ? ContactTable : ContactList;
    }
    return { currentDisplay, toggleComponent };
}