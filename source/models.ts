// este import existe solo para que tsc lo tome y lo copie a /build
import "./contacts.json";
// si no estuviera este import typescript no se da cuenta que lo necesitamos
// ya que para escribir o leer al archivo usamos la libreria "jsonfile"
import fs from "fs";
import path from "path";

class Contact {
  id: number = 0;
  name: string = "";
}

class ContactsCollection {
  contacts: Contact[] = [];

  constructor() {
    this.load();
  }

  load(): void {
    try {
      const contactsPath = path.resolve(__dirname, "contacts.json");
      const fileContent = fs.readFileSync(contactsPath, "utf-8");
      this.contacts = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
      this.contacts = [];
    }
  }

  getAll(): Contact[] {
    return this.contacts;
  }

  addOne(contact: Contact): void {
    this.contacts.push(contact);
  }

  save(): void {
    const contactsPath = path.resolve(__dirname, "contacts.json");
    const data = JSON.stringify(this.contacts, null, 2);
    fs.writeFileSync(contactsPath, data, "utf-8");
  }

  getOneById(id: number): Contact | undefined {
    const contact = this.contacts.find((c) => c.id === id);
    return contact;
  }
}

export { ContactsCollection };
