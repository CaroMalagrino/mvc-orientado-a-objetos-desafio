import { ContactsCollection } from "./models";

export type ContactsControllerOptions = {
  action?: "get" | "save" | null;
  params: any;
};

class ContactsController {
  contacts: ContactsCollection;
  constructor() {
    this.contacts = new ContactsCollection();
    this.contacts.load();
  }

  processOptions(options: ContactsControllerOptions) {
    const existeId = options.params ? options.params.id : null;
    if (options.action === "get") {
      if (existeId) {
        return this.contacts.getOneById(existeId);
      } else {
        return this.contacts.getAll();
      }
    }
    if (options.action === "save") {
      this.contacts.addOne(options.params);
      this.contacts.save();
      return { message: "Contacto guardado correctamente" };
    }
    return { message: "Acción no reconocida" };
  }
}

export { ContactsController };
