# Gallería Dream Solutions

Este proyecto está creado con React. Consiste en una galería de arte donde se pueden exponer obras de manera virtual. Tiene un panel adminsitrativo por el cual se pueden administrar las obras.[CRUD BÁSICO]
Para el bakend fue usado firebase y su rest API para los servicios de authentificación, base de datos no relacional y almacen de archivos.

## La estructura del frontend es la siguiente:

La entrada a la aplicación es por el componente APP donde mediante react - router se maneja las diferentes routas asi como su guarda en función de la authentificación.
 
Los componentes en la carpeta containers manjan estados ya sea global o propios. Aquí encontramos el login, la galería en si, y el formulario que se reutiliza para las aciones de crear, modificar y eliminar una obra determinada.

Los componentes en la carpeta components son state-less, no manejan estados. 

Además se utilizó redux para llevar un estado global o storage. En la carpeta storage encontramos el reducers y los actions creators(actions.js). Los actions creator son los que permiten hacer cambios en el estado global asi como correr las funciones asyncronas relacionadas con la interacción con la API del bakend. En el reducer se manejan las acciones despachadas en los actions creators. El reducer siempre devuleve un estado, el estado global y maneja sus cambios dada la información que proviene de los actions. 

Las interacciones HTTP se realizaron usando axios.

También de manera adicional se agregó un panel de busqueda en cascada por algunos de los parámetros que tiene las obras. Se seleciona uno se hace una query se busca y sobre esos mismos resultados se puede continuar haciendo otras busquedas. Estas búsquedas son relativamente rápidas ya que se realizan en el cliente.


## Elementos a considerar

El estado actual de la aplicacíon permite facilmente un primer release. Por supuesto se pududieran mejorar muchos detalles en cuanto a estilo y además añadir nuevos features como una busqueda avanzada más especifica. Estos features pueden irse incorporando a manera de se vallan desarrollando.  

La elección de firebase bakend fue sustentada en el nivel de complejidad baja de la app y el objetivo de este proyecto y las especificaciones. Firebase ayuda a hacer este proceso más sencillo dado que no existe una compleja relación entre los objetos que se quieren guardar en la base de datos en este caso solo uno. De esta forma poder obtener un release más rápido. 


Si desea puede ver la aplicación publicada en uso en la siguiente dirección: [galeria dream solutions](https://dreamsolutionsgallery.maxblu.vercel.app/). El bakend de firebase está restringido con Cuba por lo que es necesario usar vpn sino dará network error.


 ## Installación del Proyecto
 
 Si se desea revisar el código y trabajar en futuros release solo es necesario clonar este repo y ejecutar :
 
 ### `npm install`
 
 y luego poner en marcha el servidor local con:
 
### `npm start`

Gracias!! :)
 











