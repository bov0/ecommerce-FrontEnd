# 🏪 - eccomerce - Frontend

En este proyecto crearemos un eccomerce que funcionara sin uso de backend, mediante fetch a ficheros json y almacenaje en local storage.

## 📝 - Arbol de directorios

    En mi proyectos existe la siguiente estructura:
        * JS : Donde se situan todos los scripts.
        * CSS : Donde se situan los estilos externos a bootstrap que he usado.
        * IMG : Donde se situan todas las imagenes usadas en el proyecto.
        * AUDIO : Donde se situan los audios usados en el proyecto.

        Luego nos encontramos con los '.html', el fichero JSON, el README y esta '.txt' llamado GuiaDeEstilos.

# 🍪 - Cookies y Web Storage

las cookies se usaran para desplegar el aviso de cookies que deberan ser aceptadas debido a algunas funciones de la pagina para poder trabajar correctamente.

Te muestro algunos de los datos almacenados en local storage para ver como funciona.

> [!IMPORTANT]
> La primera vez que accedes a la web no habra usuarios, tendras que crearlos manualmente a traves del formulario en 'registrar.html'.

```bash
  localStorage.getItem('usuarios');
  localStorage.getItem('email');
  localStorage.getItem('contrasena');
  localStorage.getItem(`carrito-${emailUsuario}`);
```

Hacemos uso de web storage a la hora de creacion de usuarios, de login de usuarios y almacenaje de productos en el carrito.

## 🐈‍⬛ - Instalación

Instala mi proyecto con git:

```bash
  git clone https://github.com/bov0/ecommerce-FrontEnd.git
```

Mediante la extension live server ejecutar(Muy importante para el uso de cookies):
```bash
    index.html
```
## 🙎 - Autores

- [@IvanFernandez](https://www.github.com/bov0)
