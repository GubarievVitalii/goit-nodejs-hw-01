const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    if (!contactById) {
      throw new Error("Contact not found");
    }
    return contactById;
  } catch (e) {
    console.log(e);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    const [result] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
