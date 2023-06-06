import { db } from "../firebase/firebase-config";
import { addDoc, collection, query, getDocs } from "@firebase/firestore";

const permissions_additionals = [
  //Ranking
  {
    group: "Ranking",
    permission: "ranking.display",
    text_front: "Mostrar Todos los rankings",
    description: "Este Permiso mostrara la tabla con todos los rankings",
  },
  { group: "Ranking", permission: "ranking.update", text_front: "Editar un Ranking", description: "" },
  { group: "Ranking", permission: "ranking.import_excel", text_front: "Importar Datos", description: "Permitirá una importacion masiva." },

  //Configiración Global
  { group: "Configiración Global", permission: "global_settings.display", text_front: "Mostrar todas las configuraciones globales", description: "" },
  { group: "Configiración Global", permission: "global_settings.update", text_front: "Editar configuraciones globales", description: "" },
  { group: "Configiración Global", permission: "global_settings.remove", text_front: "Eliminar todas las configuraciones globales", description: "" },

  //Comisiones
  { group: "Comisiones", permission: "commissions.display", text_front: "Mostrar todas las comisiones", description: "" },
  { group: "Comisiones", permission: "commissions.create", text_front: "Crear comisiones", description: "" },
  { group: "Comisiones", permission: "commissions.update", text_front: "Actualizar las comisiones", description: "" },
  { group: "Comisiones", permission: "commissions.remove", text_front: "Eliminar las comisiones", description: "" },
  { group: "Comisiones", permission: "commissions.import_excel", text_front: "Importar comisiones", description: "" },

  //Asignación Comisiones
  { group: "Asignación Comisiones", permission: "commissions_assign.display", text_front: "Mostrar todas las asignaciones de comisiones", description: "" },
  { group: "Asignación Comisiones", permission: "commissions_assign.create", text_front: "Crear asignaciones de comisiones", description: "" },
  { group: "Asignación Comisiones", permission: "commissions_assign.update", text_front: "Actualizar las asignaciones de comisiones", description: "" },
  { group: "Asignación Comisiones", permission: "commissions_assign.remove", text_front: "Eliminar las asignaciones de comisiones", description: "" },
  { group: "Asignación Comisiones", permission: "commissions_assign.import_excel", text_front: "Importar excel", description: "" },

  //Distrito
  { group: "Distrito", permission: "district.display", text_front: "Mostrar todos los distritos", description: "" },
  { group: "Distrito", permission: "district.create", text_front: "Crear los distritos", description: "" },
  { group: "Distrito", permission: "district.update", text_front: "Actualizar los distritos", description: "" },
  { group: "Distrito", permission: "district.remove", text_front: "Eliminar los distritos", description: "" },
  { group: "Distrito", permission: "district.import_excel", text_front: "Importar excel", description: "" },
  { group: "Distrito", permission: "district.show", text_front: "Mostrar detalles de distrito", description: "" },

  //Diputados
  { group: "Diputados", permission: "politicians.display", text_front: "Mostrar todos los diputados", description: "" },
  { group: "Diputados", permission: "politicians.create", text_front: "Crear diputados", description: "" },
  { group: "Diputados", permission: "politicians.update", text_front: "Actualizar los diputados", description: "" },
  { group: "Diputados", permission: "politicians.remove", text_front: "Eliminar diputado", description: "" },
  { group: "Diputados", permission: "politicians.import_excel", text_front: "Importar excel", description: "" },
  { group: "Diputados", permission: "politicians.show", text_front: "Mostrar detalle de diputados", description: "" },

  //Legistarua
  { group: "Legistarua", permission: "legislature.display", text_front: "Mostrar todas las legislaturas", description: "" },
  { group: "Legistarua", permission: "legislature.create", text_front: "Crear legislaturas", description: "" },
  { group: "Legistarua", permission: "legislature.update", text_front: "Actualizar legislaturas", description: "" },
  { group: "Legistarua", permission: "legislature.remove", text_front: "Eliminar legislaturas", description: "" },
  { group: "Legistarua", permission: "legislature.import_excel", text_front: "Importar excel", description: "" },

  //Partido Politico
  { group: "Partido Politico", permission: "political_parties.display", text_front: "Mostrar todos los partidos politicos", description: "" },
  { group: "Partido Politico", permission: "political_parties.create", text_front: "Crear partido politico", description: "" },
  { group: "Partido Politico", permission: "political_parties.update", text_front: "Actualizar partido politico", description: "" },
  { group: "Partido Politico", permission: "political_parties.remove", text_front: "Eliminar partido politico", description: "" },
  { group: "Partido Politico", permission: "political_parties.import_excel", text_front: "Importar excel", description: "" },

  //Usuarios
  { group: "Usuarios", permission: "users.display", text_front: "Mostrar todos los usuarios", description: "" },
  { group: "Usuarios", permission: "users.create", text_front: "Crear usuario", description: "" },
  { group: "Usuarios", permission: "users.update", text_front: "Actualizar usuario", description: "" },
  { group: "Usuarios", permission: "users.remove", text_front: "Eliminar usuario", description: "" },

  //Roles
  { group: "Roles", permission: "roles.display", text_front: "Mostrar todos los roles", description: "" },
  { group: "Roles", permission: "roles.create", text_front: "Crear roles", description: "" },
  { group: "Roles", permission: "roles.update", text_front: "Actualizar roles", description: "" },

  //Permisos
  { group: "Permisos", permission: "permissions.display", text_front: "Mostrar todos los permisos", description: "" },
  { group: "Permisos", permission: "permissions.update", text_front: "Actualizar permisos", description: "" },
];

const CreatePermissions = async () => {
  try {
    const q = await query(collection(db, "permissions"));
    const querySnapshot = await getDocs(q);

    const permissions_created = [];
    await querySnapshot.forEach((document, index) => {
      const data = {
        id: document.id,
        ...document.data(),
      };
      permissions_created.push(data);
    });

    if (permissions_created.length < permissions_additionals.length) {
      console.log(`Faltan permisos por crear. Creando...`);
      let count = 0;
      await Promise.all(
        permissions_additionals.map(async (per, index) => {
          if (!permissions_created.map((p) => p.permission).includes(per.permission)) {
            //Crear el documento si no existe
            await addDoc(collection(db, "permissions"), { ...per });

            console.log({ per });

            count++;
          }
        })
      );
      console.log(`Se han creado los ${count} nuevos permisos. En total ${permissions_additionals.length}`);
    } else {
      console.log(`Los ${permissions_additionals.length} permisos ya existen en firebase :D.`);
    }
  } catch (error) {
    console.log({ error });
  }
};

export default CreatePermissions;
