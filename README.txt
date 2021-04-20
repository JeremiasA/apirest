Esta Api REST permite:

- Registrar un usuario
- Login de usuario

- Control de usuarios a través de roles:
	- Crear usuarios determinando roles (Admin/Moderator/User)
	- Eliminar usuarios
	- Modificar
	- Consultar usuarios de acuerdo al nivel del consultante(Ej: Moderators solo
		pueden visualizar a otros moderators y a users. Admins pueden visualizar
		todos)
 
- Obtener posteos y respuestas


En su implementación, esta API cuenta con:

- Verificación de la no existencia del username o email al momento de registrar
	un nuevo usuario.

- Creación de token para el usuario que se registra o logea a traves de JWT.

- Verificación de validez del token(1hr).

- Verificación de rol del usuario a través del token.

- Encriptación de password a través de Bcrypt.

- Obtención de respuestas asociadas a un posteo.

- Control de usuario a través del token para modificar o eliminar un posteo o respuesta.


Rutas válidas:

Authentication:
	/api/register         : crear nuevo usuario (POST)
	/api/login            : ingresar con un usuario ya creado (GET)

Users control:
	/api/users            : obtener listado de usuarios (GET)
	/api/users   	      : crear nuevo usuario (con roles) (POST)
	/api/users/:userId    : actualizar roles de un usuario (PUT)
	/api/users/:userId    : eliminar un usuario (DELETE)		 

Data:
	/api/posts            : obtener todos los posteos del foro (GET)
	/api/posts/:postId    : obtener un posteo y sus respuestas (GET)
	/api/posts/:postId            : modificar un posteo (PUT)
	/api/posts/:postId    : eliminar un posteo o respuesta (DELETE)
				   a) Eliminar posteo: /api/posts/:postId?type=post
				   b) Eliminar respuesta: /api/posts/:postId?type=response


Tecnologías utilizadas: 

	- FRAMEWORK: NodeJs
	- MODULES: Express, bcrypt, jsonwebtoken
	- DATABASE: MongoDB
	- ODM: Mongoose	
	- TEST: Postman

Realizado por: 

	Jeremias Amestoy
	GITHUB: https://github.com/JeremiasA
	LINKEDIN: https://www.linkedin.com/in/jeremias-amestoy-a746621bb/ 
	 