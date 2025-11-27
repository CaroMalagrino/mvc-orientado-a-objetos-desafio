import test from "ava";
import { ContactsController } from "./controllers";
import type { ContactsControllerOptions } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  const contact = new ContactsController();
  t.truthy(contact.contacts);
  t.is(typeof contact.contacts.load, "function");
});

test("Testeo el método processOptions para obtener todos los contactos", (t) => {
  const controller = new ContactsController();

  const options: ContactsControllerOptions = {
    action: "get",
    params: {},
  };
  const result = controller.processOptions(options);
  t.deepEqual(result, controller.contacts.getAll());
});

test("Testeo el método processOptions para obtener un contacto por id", (t) => {
  const controller = new ContactsController();
  const mockContact = { id: 5, name: "Nayla" };
  controller.contacts.addOne(mockContact);
  const options: ContactsControllerOptions = {
    action: "get",
    params: { id: 5 },
  };
  const result = controller.processOptions(options);
  t.deepEqual(result, mockContact);
});

test("testo el método processOptions para agregar un nuevo contacto", (t) => {
  const controller = new ContactsController();
  const newContact = { id: 6, name: "Caro" };
  const options: ContactsControllerOptions = {
    action: "save",
    params: newContact,
  };

  controller.processOptions(options);
  const savedContact = controller.contacts.getAll();
  t.deepEqual(savedContact, [newContact]);
});
