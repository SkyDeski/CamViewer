# CamViewer

**CamViewer** es una aplicación de escritorio diseñada para **Raspberry Pi** que permite visualizar 4 páginas web o streams de cámaras simultáneamente en una cuadrícula de 2x2.

La aplicación está pensada para funcionar en modo "kiosco" (pantalla completa) y es ideal para centros de monitorización, dashboards o simplemente para tener varias fuentes de información visibles al mismo tiempo.

## Características

*   **Visualización en Grid 2x2**: Muestra 4 navegadores independientes en una sola pantalla.
*   **Pantalla Completa**: La aplicación se inicia automáticamente maximizada para aprovechar todo el espacio.
*   **Auto-refresco**: Configurable para recargar las páginas automáticamente cada cierto tiempo (por defecto, 3 minutos).
*   **Etiquetas Personalizables**: Puedes añadir un nombre a cada cámara para identificarla fácilmente.
*   **Controles de Zoom y Recarga**: Haz clic derecho sobre cualquier cámara para acceder a un menú con opciones de Zoom y recarga individual.
*   **Editor de Configuración**: Modifica las URLs y etiquetas fácilmente desde un menú visual, sin editar archivos a mano.
*   **Configuración Sencilla**: Los datos se guardan en un archivo JSON local.
*   **Auto-Actualización**: La aplicación buscará y descargará nuevas versiones automáticamente al iniciarse.
*   **Interfaz Oscura**: Diseño "Dark Mode" amigable para la vista en entornos de poca luz.

## Instalación en Raspberry Pi

1.  Ve a la sección de **[Releases](https://github.com/SkyDeski/CamViewer/releases)** de este repositorio.
2.  Descarga el archivo con extensión `.AppImage` (recomendado) o `.deb` correspondiente a la arquitectura de tu Raspberry Pi (normalmente `armv7l` o `arm64`).

### Opción A: Usando AppImage (Recomendado)

Una vez descargado el archivo (por ejemplo, `CamViewer-1.0.7-armv7l.AppImage`):

1.  Dale permisos de ejecución:
    ```bash
    chmod +x CamViewer-1.0.7-armv7l.AppImage
    ```
2.  Ejecútalo:
    ```bash
    ./CamViewer-1.0.7-armv7l.AppImage
    ```

### Opción B: Usando paquete .deb

1.  Instala el paquete:
    ```bash
    sudo dpkg -i camviewer_1.0.7_armhf.deb
    ```
2.  Busca "CamViewer" en el menú de aplicaciones o ejecútalo desde la terminal:
    ```bash
    camviewer
    ```

### Actualizaciones Automáticas
La aplicación comprobará automáticamente si hay nuevas versiones al iniciarse. Si encuentra una actualización, te notificará para descargarla e instalarla.

## Configuración

### Opción 1: Editor Visual (Recomendado)
Haz **clic derecho** sobre cualquier cámara y selecciona **"⚙️ Edit Configuration"**.
Se abrirá una ventana donde podrás escribir las URLs, los nombres de las cámaras y el tiempo de refresco. Al pulsar "Save", los cambios se aplicarán al instante.

### Opción 2: Archivo JSON
La aplicación guarda la configuración en el archivo `camviewer-config.json` en la **carpeta de usuario**.
*   **Windows**: `C:\Users\TuUsuario\camviewer-config.json`
*   **Raspberry Pi (Linux)**: `/home/pi/camviewer-config.json`

Puedes editar este archivo manualmente si lo prefieres. La aplicación soporta **recarga en caliente**, por lo que al guardar el archivo, los cambios se verán reflejados inmediatamente.

El formato del archivo es:

```json
{
  "urls": [
    "https://tu-camara-1.com",
    "https://tu-camara-2.com",
    "https://google.com",
    "https://bing.com"
  ],
  "labels": [
    "Entrada Principal",
    "Jardín Trasero",
    "Sala de Estar",
    "Garaje"
  ],
  "refreshInterval": 180
}
```

*   **urls**: Lista de 4 direcciones web.
*   **labels**: Lista de 4 nombres para identificar cada cámara.
*   **refreshInterval**: Tiempo en segundos para auto-recargar (0 para desactivar).

### Menú Contextual
Haz **clic derecho** sobre cualquier cámara para ver opciones adicionales:
*   **⚙️ Edit Configuration**: Abre el editor visual.
*   **Reload Camera**: Recarga esa cámara individualmente.
*   **Zoom In/Out/Reset**: Controla el nivel de zoom de esa cámara.


## Desarrollo

Si quieres ejecutar la aplicación en tu propio ordenador para probarla o modificarla:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/SkyDeski/CamViewer.git
    ```
2.  Instala las dependencias (necesitas Node.js instalado):
    ```bash
    npm install
    ```
3.  Inicia la aplicación:
    ```bash
    npm start
    ```
