# Feauters

Features:
1. VerifyToken
2. Login
3. Register
4. Profile anzeigen
5. Profile entfernen
6. Profile ändern
7. Profilbild ändern
8. Billboard
9. Videos anzeigen
10. Videos abspielen
11. Videos favorisieren
12. Video Wiedergabe mit zurück Button
13. Suche
14. Watchlist ("My List")
15. Aus Watchlist Videos entfernen
16. Verlauf
17. Videos aus Verlauf löschen
18. Navigation Bar
19. Account bearbeiten
20. Account entfernen
21. Mobile Ansicht


# Movie List Anwendung

## Übersicht

Diese Anwendung ermöglicht es Benutzern, Filme anzuzeigen, hinzuzufügen, zu bearbeiten und zu löschen. Sie beinhaltet auch Funktionen zur Benutzerauthentifizierung, Profilverwaltung und zum Ansehen einzelner Filmdetails.

<details>
  <summary>Diese Modelle wurden gezeigt</summary>

(Die Modelle können noch angepasst werden)

### Account

| Feld              | Typ                 | Beschreibung                                |
| ----------------- | ------------------- | ------------------------------------------- |
| \_id              | String              | Eindeutige Kennung des Kontos               |
| userId            | ObjectId (Referenz) | Die ID des Benutzers, dem das Konto gehört  |
| type              | String              | Art des Kontos (z.B. 'Facebook', 'Google')  |
| provider          | String              | Anbieter des Kontos (z.B. 'OAuth2')         |
| providerAccountId | String              | Eindeutige Kennung des Kontos beim Anbieter |
| refresh_token     | String              | Aktualisierungstoken für das Konto          |
| access_token      | String              | Zugriffstoken für das Konto                 |
| expires_at        | Number              | Ablaufdatum des Tokens                      |
| token_type        | String              | Typ des Tokens (z.B. 'Bearer')              |
| scope             | String              | Bereich des Zugriffs                        |
| id_token          | String              | Token zur Identifizierung                   |
| session_state     | String              | Zustand der Sitzung                         |

### VerificationToken

| Feld       | Typ    | Beschreibung                                |
| ---------- | ------ | ------------------------------------------- |
| \_id       | String | Eindeutige Kennung des Verifizierungstokens |
| identifier | String | Bezeichner für die Verifizierung            |
| token      | String | Token zur Verifizierung                     |
| expires    | Date   | Ablaufdatum des Tokens                      |

### Movie

| Feld         | Typ    | Beschreibung                                  |
| ------------ | ------ | --------------------------------------------- |
| \_id         | String | Eindeutige Kennung des Films                  |
| title        | String | Titel des Films                               |
| description  | String | Beschreibung des Films                        |
| videoUrl     | String | URL zum Video des Films                       |
| thumbnailUrl | String | URL zum Thumbnail-Bild des Films              |
| genre        | String | Genre des Films                               |
| duration     | String | Dauer des Films (z.B. '2 Stunden 30 Minuten') |

### User

| Feld               | Typ                            | Beschreibung                        |
| ------------------ | ------------------------------ | ----------------------------------- |
| \_id               | String                         | Eindeutige Kennung des Benutzers    |
| name               | String                         | Name des Benutzers                  |
| image              | String                         | URL zum Profilbild des Benutzers    |
| email              | String                         | E-Mail-Adresse des Benutzers        |
| emailVerified      | Date                           | Datum der E-Mail-Verifizierung      |
| password           | String                         | Passwort des Benutzers              |
| createdAt          | Date                           | Erstellungsdatum des Benutzerkontos |
| updatedAt          | Date                           | Datum der letzten Aktualisierung    |
| favoriteIds        | Array von ObjectId             | IDs der favorisierten Filme         |
| verificationTokens | Array von Verifizierungstokens | Liste der Verifizierungstokens      |
| accounts           | Array von Accounts             | Liste der Benutzerkonten            |

</details>

## Anmeldung

### Admin

Email: admin@net-movies.de
Passwort: admin

### User

Email: user@net-movies.de
Passwort: user

## Verwendung

### API-Routen

| Pfad                                             | Methode | Beschreibung                               |
| ------------------------------------------------ | ------- | ------------------------------------------ |
| `/api/signup`                                    | POST    | Benutzeranmeldung                          |
| `/api/signin`                                    | POST    | Benutzeranmeldung                          |
| `/api/collections`                               | GET     | Liste aller Sammlungen                     |
| `/api/keys/:collectionName`                      | GET     | Schlüssel für eine Sammlung                |
| `/api/table/:collectionName`                     | GET     | Tabelle für eine Sammlung                  |
| `/api/tables/:collectionName`                    | GET     | Liste aller Tabellen einer Sammlung        |
| `/api/add-element/:collectionName`               | POST    | Neues Element zu einer Sammlung hinzufügen |
| `/api/delete-element/:collectionName/:elementId` | DELETE  | Element aus einer Sammlung löschen         |
| `/api/update-element/:collectionName/:elementId` | PUT     | Element aus einer Sammlung aktualisieren   |
| `/api/profiles`                                  | GET     | Alle Profile eines Benutzers abrufen       |
| `/api/profiles`                                  | POST    | Neues Profil hinzufügen                    |
| `/api/profiles/:profileId`                       | DELETE  | Profil löschen                             |

## CI/CD Pipeline
codecov
cypress

## Beispiel-Filme

Die folgenden Filme wurden in die Datenbank hinzugefügt:

#### Big Buck Bunny

- **Title**: Big Buck Bunny
- **Description**: Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.
- **Video URL**: [Big Buck Bunny Video](http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4)
- **Thumbnail URL**: [Big Buck Bunny Thumbnail](https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217)
- **Genre**: Animation
- **Duration**: 10:34
- **ID**: 664a6a887d397d87582c27e0

#### Sintel

- **Title**: Sintel
- **Description**: Sintel is a short computer-animated fantasy film by the Blender Institute.
- **Video URL**: [Sintel Video](https://archive.org/download/Sintel/sintel-2048-surround.mp4)
- **Thumbnail URL**: [Sintel Thumbnail](https://ddz4ak4pa3d19.cloudfront.net/cache/cb/6d/cb6dd0a5f551eec35f896…)
- **Genre**: Fantasy
- **Duration**: 14:48
- **ID**: 664a6a887d397d87582c27df

#### Tears of Steel

- **Title**: Tears of Steel
- **Description**: Tears of Steel is a short science fiction film by the Blender Institute.
- **Video URL**: [Tears of Steel Video](https://archive.org/download/tearsofsteel_202010/TEARSOFSTEEL.mp4)
- **Thumbnail URL**: [Tears of Steel Thumbnail](https://m.media-amazon.com/images/M/MV5BNzNiMDUxYmItMzkyMS00MzlmLWJlNWYtYmUyMmFkZDE4MjExXkEyXkFqcGdeQXVyNjMxMTk1NTM@._V1_.jpg)
- **Genre**: Sci-Fi
- **Duration**: 12:14
- **ID**: 664c50d14f906d0ca1b2cf0a

#### Elephants Dream

- **Title**: Elephants Dream
- **Description**: Elephants Dream is a short computer-animated film by the Blender Institute.
- **Video URL**: [Elephants Dream Video](https://www.youtube.com/embed/ePVe9FzuFfQ)
- **Thumbnail URL**: [Elephants Dream Thumbnail](https://upload.wikimedia.org/wikipedia/commons/f/fd/Elephants_Dream_Emo_Proog_s6.jpg)
- **Genre**: Animation
- **Duration**: 10:53
