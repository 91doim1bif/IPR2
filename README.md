Wir werden uns auf dieses Tutorial konzentrieren:

https://www.youtube.com/watch?v=mqUN4N2q4qY

<details>
  <summary>## Klicke hier, um mehr zu erfahren</summary>

Hier kannst du zusätzliche Informationen oder Details über dein Projekt einfügen.

</details>

## Account
| Feld            | Typ                | Beschreibung                                |
|-----------------|--------------------|---------------------------------------------|
| _id             | String             | Eindeutige Kennung des Kontos               |
| userId          | ObjectId (Referenz)| Die ID des Benutzers, dem das Konto gehört  |
| type            | String             | Art des Kontos (z.B. 'Facebook', 'Google') |
| provider        | String             | Anbieter des Kontos (z.B. 'OAuth2')        |
| providerAccountId | String           | Eindeutige Kennung des Kontos beim Anbieter|
| refresh_token   | String             | Aktualisierungstoken für das Konto          |
| access_token    | String             | Zugriffstoken für das Konto                 |
| expires_at      | Number             | Ablaufdatum des Tokens                      |
| token_type      | String             | Typ des Tokens (z.B. 'Bearer')             |
| scope           | String             | Bereich des Zugriffs                        |
| id_token        | String             | Token zur Identifizierung                    |
| session_state   | String             | Zustand der Sitzung                         |

## Session
| Feld            | Typ                | Beschreibung                                |
|-----------------|--------------------|---------------------------------------------|
| _id             | String             | Eindeutige Kennung der Sitzung              |
| sessionToken    | String             | Token zur Identifizierung der Sitzung       |
| userId          | ObjectId (Referenz)| Die ID des Benutzers, dem die Sitzung gehört|
| expires         | Date               | Ablaufdatum der Sitzung                     |

## VerificationToken
| Feld            | Typ                | Beschreibung                                |
|-----------------|--------------------|---------------------------------------------|
| _id             | String             | Eindeutige Kennung des Verifizierungstokens |
| identifier      | String             | Bezeichner für die Verifizierung            |
| token           | String             | Token zur Verifizierung                      |
| expires         | Date               | Ablaufdatum des Tokens                      |

## Movie
| Feld            | Typ                | Beschreibung                                |
|-----------------|--------------------|---------------------------------------------|
| _id             | String             | Eindeutige Kennung des Films                |
| title           | String             | Titel des Films                             |
| description     | String             | Beschreibung des Films                      |
| videoUrl        | String             | URL zum Video des Films                     |
| thumbnailUrl    | String             | URL zum Thumbnail-Bild des Films            |
| genre           | String             | Genre des Films                             |
| duration        | String             | Dauer des Films (z.B. '2 Stunden 30 Minuten')|

User
| Feld            | Typ                | Beschreibung                                |
|-----------------|--------------------|---------------------------------------------|
| _id             | String             | Eindeutige Kennung des Benutzers            |
| name            | String             | Name des Benutzers                          |
| image           | String             | URL zum Profilbild des Benutzers            |
| email           | String             | E-Mail-Adresse des Benutzers                |
| emailVerified   | Date               | Datum der E-Mail-Verifizierung              |
| password        | String             | Passwort des Benutzers                      |
| createdAt       | Date               | Erstellungsdatum des Benutzerkontos         |
| updatedAt       | Date               | Datum der letzten Aktualisierung            |
| favoriteIds     | Array von ObjectId | IDs der favorisierten Konten                |
| sessions        | Array von Sessions | Liste der Benutzersitzungen                 |
| verificationTokens | Array von Verifizierungstokens | Liste der Verifizierungstokens          |
| accounts        | Array von Accounts | Liste der Benutzerkonten                    |


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
