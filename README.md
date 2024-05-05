```markdown
# Backend-API für MongoDB-Datenbank

Dies ist eine einfache Node.js-Express-Anwendung, die als Backend-API für eine MongoDB-Datenbank dient. Sie enthält Endpunkte zum Abrufen von Daten aus verschiedenen Sammlungen der MongoDB-Datenbank.

## Setup

1. Stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind.

2. Klonen Sie dieses Repository auf Ihren lokalen Computer.

3. Öffnen Sie das Terminal im Verzeichnis des geklonten Repositories und führen Sie den folgenden Befehl aus, um die Abhängigkeiten zu installieren:

    ```bash
    npm install
    ```

4. Erstellen Sie eine MongoDB-Datenbank und stellen Sie die Verbindungs-URI in der Datei `backend/index.js` ein.

5. Starten Sie den Server mit dem folgenden Befehl:

    ```bash
    npm start
    ```

## Verwendung

### 1. Abrufen aller Elemente aus einer Sammlung

Um alle Elemente aus einer bestimmten Sammlung abzurufen, senden Sie eine GET-Anfrage an den Endpunkt `/api/elements/:collectionName`.

Beispiel:

```http
GET /api/elements/movies
```

### 2. Abrufen aller Schlüssel für eine bestimmte Sammlung

Um alle Schlüssel (Feldnamen) für eine bestimmte Sammlung abzurufen, senden Sie eine GET-Anfrage an den Endpunkt `/api/keys/:collectionName`.

Beispiel:

```http
GET /api/keys/movies
```

### 3. Abrufen aller Tabellendaten für eine bestimmte Sammlung mit Paginierung

Um alle Tabellendaten für eine bestimmte Sammlung mit Paginierung abzurufen, senden Sie eine GET-Anfrage an den Endpunkt `/api/tables/:collectionName`.

Beispiel:

```http
GET /api/tables/movies?page=1&limit=10
```

### 4. Abrufen aller Sammlungen

Um alle Sammlungen in der MongoDB-Datenbank abzurufen, senden Sie eine GET-Anfrage an den Endpunkt `/api/collections`.

Beispiel:

```http
GET /api/collections
```

### 5. Abrufen aller Dokumente aus einer bestimmten Sammlung

Um alle Dokumente aus einer bestimmten Sammlung abzurufen, senden Sie eine GET-Anfrage an den Endpunkt `/api/table/:collectionName`.

Beispiel:

```http
GET /api/table/movies
```

## Port

Standardmäßig wird der Server auf Port 5000 gestartet. Sie können den Port in der Datei `backend/index.js` ändern.

```

Diese README-Datei erklärt die Schritte zum Einrichten der Backend-Anwendung, sowie die Verwendung der verschiedenen Endpunkte für den Zugriff auf die MongoDB-Datenbank.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

| Sprache        | Erscheinungsjahr | Entwickler      | Paradigma       |
| -------------- | ---------------- | --------------- | --------------- |
| Python         | 1991             | Guido van Rossum| Multiparadigma  |
| JavaScript     | 1995             | Brendan Eich    | Multiparadigma  |
| Java           | 1995             | Sun Microsystems| Objektorientiert|
| C++            | 1985             | Bjarne Stroustrup| Multiparadigma  |
| Ruby           | 1995             | Yukihiro Matsumoto| Objektorientiert|
| Swift          | 2014             | Apple Inc.      | Multiparadigma  |

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Start Backend Server

Open a second Terminal and navigate to "./mern/server" folder.
Run: "node index.js" to start the server.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
