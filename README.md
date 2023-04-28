# Quetzalcoatl API

**<h3>Mi querido Gama xd, por favor sigue al pie de la letra este instructivo, ya que de otro modo la vas a tener complicado el levantar el servicio 👽 </h3>**

***
## Programas que debes tener instalados si o si 🥵

Antes de instalar nada, comprueba si lo tienes instalado con los comandos de terminal que aparecen abajo de cada programa

1. NodeJs: [Descarga Aqui](https://nodejs.org/dist/v16.20.0/node-v16.20.0-x64.msi)
```
node --version
``` 

> Tambien te recomiendo volver a ejecutar los comandos de version para corroborar que esten instalados ✅
***

## Descargar el Proyecto 😎

Primero que nada deberas estar en la carpeta donde quieres descargar el proyecto luego deberas acceder a una terminal, ya sea **git bash, el cmd o la PowerShell**

>No sabes como cojones hacer eso...? Muy sencillo, sigue estos pasos xd

1. Dentro de la carpeta, manten apretado **shift + click derecho**, para que te despliegue el menu y puedas seleccinar alguno de las opciones.

![Image Text](/imgs/img1.png)

2. Estando dentro de la terminal, podras pegar el siguiente comando:
```
git clone https://github.com/kr4ken600/quetzalcoatl-api.git api
```

3. Esperas a que termine de descargar y prosigues con el siguiente comando:
```
cd api
```

4. Una vez dentro de la carpeta, desde la terminal, **es necesario que ejecutes el siguiente comando**
```
npm install
```
>Esto te descargara todas las dependencias que requiere el proyecto para funcionar

5. Ahora deberas renombrar el archivo con nombre ***.env_ejemplo*** y lo dejes como ***.env***. Los valores que requieres te los paso por whats xd
> No podras correr el proyecto sin esas variables de entorno, no olvides pedirmelas 👾

***

## Correr el Proyecto ⚡

Es momento de echar a andar el proyecto asi que procedemos a ejecutar en la misma terminal que usaste anteriormente.

```
npm run dev
```

Y listo, ya deberas tener listo el servicio que se conecta a la base de datos.
Deberas ver algo como esto en la terminal:

![Image Text](/imgs/img2.png)

Si quieres detener el servicio, solo has **ctrl + c** en la terminal o cierrala.
***

## Detalles importantes 👁️

1. El paso ***2*** de la descarga, solo es necesario si eliminaste la carpeta donde se encuentra el proyecto.
2. Para realizar una actualizacion de cambios, es tan sencillo como ejecutar este comando, en una terminal que este en el directorio del proyecto:
```
git pull
```
4. Siempre que actualices el proyecto ejecuta el comando
```
npm install
```

>En caso de que algo te de error y neta no sepas que pedo, me mandas mensaje xd