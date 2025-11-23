import { ContactsController, ContactsControllerOptions } from "./controllers";
import minimist from "minimist";
function parseaParams(argv): ContactsControllerOptions {
  // parsear el argv usando https://www.npmjs.com/package/minimist
  const args = minimist(argv.slice(2));
  const { action, _: unused, ...params } = args;
  return {
    action: action || null,
    params: Object.keys(params).length ? params : null,
  };
}

function main() {
  const contacto = new ContactsController();
  const params = parseaParams(process.argv);
  const resultado = contacto.processOptions(params);
  console.log(resultado);
}
main();
