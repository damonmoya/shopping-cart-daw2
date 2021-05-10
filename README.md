# ShoppingCartDaw2

Segundo trabajo de Angular para la asignatura de Desarrollo de Aplicaciones Web II

## Despliegue de la aplicación

https://shopping-cart-daw2.web.app

## ¿De qué trata la aplicación?

Se trata de una tienda de ropa online muy básica, en la que los usuarios registrados pueden añadir productos a su carrito de compra para adquirir los productos. En el perfil de estos usuarios se puede consultar el históricos de compras anteriores. La aplicación también cuenta con un panel administrativo en el que es posible crear, editar, ver y eliminar productos (CRUD). Los atributos de los productos son: nombre, precio, descripción e imagen (url).

## ¿Cómo se ha hecho la aplicación?

Para su desarrollo, se han establecido diferentes rutas para los diversos componentes creados. Se ha utilizado Firebase para la Base de Datos, el sistema de autenticación de usuarios (con el que además se protegen algunas rutas para no ser accedidas por usuarios anónimos) y el despliegue de la propia aplicación. 

Se han establecido además los dos siguientes servicios:

- Un servicio que permite gestionar el registro de usuarios y la sesión actual del login, y que permite obtener datos sobre las sesiones actuales.
- Un servicio para la tienda, que gestiona la interacción con la base de datos y que sirve como medio de comunicación entre los componentes relacionados directamente con los productos de la tienda.