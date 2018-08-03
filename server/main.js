import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Docentes } from '../imports/api/docentes.js';
import {Alumnos} from '../imports/api/alumnos.js';
import {Libros} from '../imports/api/libros.js';
import {Articulos} from '../imports/api/articulos.js';
import {ObjetosAprendizaje} from '../imports/api/objetosAprendizaje.js';
import {ElementosObjetosAprendizaje} from '../imports/api/elementosObjetosAprendizaje.js';
import {Documentos} from '../imports/api/documentos.js';
import {ContenidosMultimedia } from '../imports/api/contenidosMultimedia.js';
import {AdministradorSistemas} from '../imports/api/administradorSistema.js';
import {AdministradorContenidos} from '../imports/api/administradorContenidos.js';
import {Temas} from '../imports/api/temas.js';
import {Notificaciones} from '../imports/api/notificaciones.js';
import {Lobby} from '../imports/api/lobby.js';
import {Bloques} from '../imports/api/bloques.js';
import {Materias} from '../imports/api/materias.js';
import {Escuelas} from '../imports/api/escuelas.js';
import {Grupos} from '../imports/api/grupos.js';
import {UsuarioSAprendizaje} from '../imports/api/usuariosSesionAprendizaje.js';
import {SesionesAprendizaje} from '../imports/api/sesionesAprendizaje.js';
import {Estadisticas} from '../imports/api/estadisticas.js';
import {UsuarioLobby} from '../imports/api/usuarioLobby.js';
import {UserFiles} from '../imports/api/images.js';

import '../imports/api/links';
import '../imports/api/users';

Meteor.startup(() => {
  // code to run on server at startup
    Accounts.onCreateUser(function(datos, user) {
        if (datos.tipoUsuario)
            user.tipoUsuario = datos.tipoUsuario;

        if (datos.profile)
            user.profile = datos.profile;
            return user;
    });

});
