# CamViewer

**CamViewer** es una aplicación de escritorio diseñada para **Raspberry Pi** que permite visualizar 4 páginas web o streams de cámaras simultáneamente en una cuadrícula de 2x2.

La aplicación está pensada para funcionar en modo "kiosco" (pantalla completa) y es ideal para centros de monitorización, dashboards o simplemente para tener varias fuentes de información visibles al mismo tiempo.

## Características

*   **Visualización en Grid 2x2**: Muestra 4 navegadores independientes en una sola pantalla.
*   **Pantalla Completa**: La aplicación se inicia automáticamente maximizada para aprovechar todo el espacio.
*   **Auto-refresco**: Configurable para recargar las páginas automáticamente cada cierto tiempo (por defecto, 3 minutos).
*   **Etiquetas Personalizables**: Puedes añadir un nombre a cada cámara para identificarla fácilmente.
*   **Controles de Zoom y Recarga**: Haz clic derecho sobre cualquier cámara para acceder a un menú con opciones de Zoom y recarga individual.
*   **Configuración Sencilla**: Las URLs y el intervalo de actualización se definen en un archivo JSON fácil de editar.
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

## Configuración

La aplicación busca el archivo de configuración `camviewer-config.json` en la **carpeta de usuario** (Home Directory).

*   **Windows**: `C:\Users\TuUsuario\camviewer-config.json`
*   **Raspberry Pi (Linux)**: `/home/pi/camviewer-config.json` (o `/home/tu_usuario/`)

Si el archivo no existe, la aplicación lo creará automáticamente con valores por defecto al iniciarse.

### Edición en Vivo
La aplicación soporta **recarga en caliente**. Puedes editar el archivo `camviewer-config.json` mientras la aplicación está funcionando, y al guardar los cambios, las URLs, etiquetas y el tiempo de refresco se actualizarán automáticamente sin necesidad de reiniciar.

El formato del archivo es el siguiente:

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

*   **urls**: Una lista de 4 direcciones web que quieres mostrar.
*   **labels**: (Opcional) Una lista de 4 nombres para identificar cada cámara. Aparecerán superpuestos en la esquina superior izquierda.
*   **refreshInterval**: El tiempo en segundos para recargar las páginas automáticamente (180 segundos = 3 minutos). Ponlo en `0` para desactivar el auto-refresco.

### Menú Contextual (Clic Derecho)
Haz **clic derecho** sobre cualquier cámara para ver un menú con las siguientes opciones:
*   **Reload Camera**: Recarga esa cámara individualmente (útil si se ha quedado congelada o ha perdido conexión).
*   **Zoom In (+)**: Aumenta el zoom de esa cámara específica.
*   **Zoom Out (-)**: Disminuye el zoom.
*   **Reset Zoom**: Restablece el nivel de zoom al 100%.


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
