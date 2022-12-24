const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require(`${__dirname}/contacts`);
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await getContactById(id.toString());
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id.toString());
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
