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
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "3" });
// invokeAction({
//   action: "add",
//   name: "Vitalii",
//   email: "scales00@gmail.com",
//   phone: "(068) 644-6486",
// });
// invokeAction({
//   action: "remove",
//   id: "5af15da9-1804-4c55-853a-8ab4d47a6795",
// });

invokeAction(argv);
