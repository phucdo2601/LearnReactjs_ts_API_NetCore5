import axios from "axios";
import { Contact } from '../models/contact';

export class ContactInfoService {
    /**
     * get all contact info
     */
    async getAllContacts() {
        return await axios.get("https://localhost:44352/api/Contacts");
    }

    /**
     * get contact info by id
     */
    async getContactInfoById(id: string | undefined) {
        return await axios.get(`https://localhost:44352/api/Contacts/${id}`);
    }

    /**
     * Add new contact info (cach 1: nhap tung field)
     */
    async addNewContactInfo2( firstName: string, lastName: string) {
        

        return await axios.post("https://localhost:44352/api/Contacts", { 
            id:0,
            firstName: firstName,
            lastName: lastName
         });
    }
    /**
     * Cach nay dang tim hieu va dang fix, (cach 2: nhap mot object)
     */
    addNewContactInfo(contact: Contact) {
        return  axios.post("https://localhost:44352/api/Contacts", contact);
    }

    /**
     * Delete contact info
     */
    async deleteContactInfo(id: number) {
        return await axios.delete(`https://localhost:44352/api/Contacts/${id}`);
    }

    async updateContactInfo(id: number, firstName: string, lastName: string) {
        return await axios.put(`https://localhost:44352/api/Contacts/${id}`, {
            id:id,
            firstName: firstName,
            lastName: lastName

        });
    }
}

const contactsService: ContactInfoService = new ContactInfoService();
export default contactsService;