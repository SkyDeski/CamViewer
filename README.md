# CamViewer

**CamViewer** es una aplicación de escritorio diseñada para **Raspberry Pi** que permite visualizar 4 páginas web o streams de cámaras simultáneamente en una cuadrícula de 2x2.

La aplicación está pensada para funcionar en modo "kiosco" (pantalla completa) y es ideal para centros de monitorización, dashboards o simplemente para tener varias fuentes de información visibles al mismo tiempo.

## Características

*   **Visualización en Grid 2x2**: Muestra 4 navegadores independientes en una sola pantalla.
*   **Pantalla Completa**: La aplicación se inicia automáticamente maximizada para aprovechar todo el espacio.
*   **Auto-refresco**: Configurable para recargar las páginas automáticamente cada cierto tiempo (por defecto, 3 minutos).
*   **Configuración Sencilla**: Las URLs y el intervalo de actualización se definen en un archivo `config.json`.
*   **Interfaz Oscura**: Diseño "Dark Mode" amigable para la vista en entornos de poca luz.

## Instalación en Raspberry Pi

1.  Ve a la sección de **[Releases](https://github.com/SkyDeski/CamViewer/releases)** de este repositorio.
2.  Descarga el archivo con extensión `.AppImage` (recomendado) o `.deb` correspondiente a la arquitectura de tu Raspberry Pi (normalmente `armv7l` o `arm64`).

### Opción A: Usando AppImage (Recomendado)

Una vez descargado el archivo (por ejemplo, `CamViewer-1.0.0-armv7l.AppImage`):

1.  Dale permisos de ejecución:
    ```bash
    chmod +x CamViewer-1.0.0-armv7l.AppImage
    ```
2.  Ejecútalo:
    ```bash
    ./CamViewer-1.0.0-armv7l.AppImage
    ```

### Opción B: Usando paquete .deb

1.  Instala el paquete:
    ```bash
    sudo dpkg -i camviewer_1.0.0_armhf.deb
    ```
2.  Busca "CamViewer" en el menú de aplicaciones o ejecútalo desde la terminal:
    ```bash
    camviewer
    ```

## Configuración

La aplicación lee la configuración del archivo `config.json`.

**Nota:** Por defecto, la aplicación trae unas URLs de ejemplo. Para personalizarlas, debes modificar el archivo `config.json`.

El formato del archivo es el siguiente:

```json
{
  "urls": [
    "https://tu-camara-1.com",
    "https://tu-camara-2.com",
    "https://google.com",
    "https://bing.com"
  ],
  "refreshInterval": 180
}
```

*   **urls**: Una lista de 4 direcciones web que quieres mostrar.
*   **refreshInterval**: El tiempo en segundos para recargar las páginas automáticamente (180 segundos = 3 minutos). Ponlo en `0` para desactivar el auto-refresco.

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
