### IONIX TEST

## Ejercicio 2

Considerar el siguiente caso:
Una aplicación debe capturar data sensible y enviarla a un servicio de autorización. La data sensible debe ser transmitida a través de la APP API según se indica en el siguiente diagrama, sin embargo, no puede ser legible hasta que llegue al servicio de autorización.
Describa un método para permitir la captura y transmisión de información de forma segura según lo planteado, sin considerar el uso de certificados SSL.

Respuesta: 

Se debe implementar registro de usuario e inicio de sesion para autenticar a la persona (que enviara la data sensible) tambien implementar la auntenticación por token con JWT (JSON Web Token) para autenticar la sesion del usuario, por ultimo con este token ya podemos hacer llamadas al servidor de forma segura, por ultimo implementar cifrado de la data con RSA con llave publica y privada, una vez que el usuario tenga el token (sin expirar) puede proceder a pedirle al "Authorizer Api" la llave privada, y con este poder decrifrar toda la data que el "Ahutorizer Api" le envie, en este caso el cliente enviara la "data sensible" al servidor cifrada con la llave privada recibida del "Authorizer Api", y despues esta "data sensible" puede ser decifrada por la "Authorizer Api" con la llave publica. De esta forma se puede transportar la data de forma segura sin el uso de certificados SSL. Claro en este caso "App Api" es solo intermediaria entre la data que enviara cifrada el cliente, ya que al final es "Authorizer API" quién se encargará de cifrar / descifrar con la llave pública. 

## Unit testing

Run `npm run test` to run tests from __tests__ folder.
