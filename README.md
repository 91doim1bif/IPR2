# CI/CD

![CI](https://github.com/91doim1bif/IPR2/workflows/CI/CD%20Pipeline/badge.svg)

# Coverage

[![codecov](https://codecov.io/gh/91doim1bif/IPR2/graph/badge.svg?token=EDD7EI62T4)](https://codecov.io/gh/91doim1bif/IPR2)

# Overview

## Feauters

1. VerifyToken - Als User, möchte ich dass im Hintergrund mein Profil gesichert wird über einen VerifyToken, damit mein Profil geschützt bleibt.
2. Login - Als User möchte, ich mich in meinem Account anmelden, damit ich auf meine Profile Zugriff bekomme.
3. Register - Als Interessent, möchte ich einen Account erstellen, damit ich Zugriff auf den Service erhalten kann.
4. Profile anzeigen - Als User, möchte ich meine Profile anzeigen, damit ich zwischen Profilen wechseln kann.
5. Profile entfernen - Als User, möchte ich Profile entfernen können, damit ich meine Profilanzahl organisieren kann.
6. Profile ändern - Als User, möchte ich meine Profile ändern, damit ich meine Profilübersicht organisieren kann kann.
7. Profilbild ändern - Als User, möchte ich mein Profilbild ändern können, damit ich mein Profil personalisieren kann.
8. Billboard - Als User, möchte ich nach im Hauptbildschirm eine Übersicht von allem haben, damit ich leicht durch alles navigieren kann.
9. Bilboardkategorien - Als User, möchte ich dass auf dem Billboard die Medien unterkategorisiert werden, damit ich eine leichter Übersicht über die verschiedenen Genres habe.
10. Videos anzeigen - Als User, möchte ich dass Filme/Serien größer werden wenn ich mit der Maus über sie hover, damit ich mehr Informationen bekomme bevor ich ein Film/ eine Serie öffne.
11. Videos abspielen - Als User, möchte ich Filme/Serien abspielen können, damit ich das gewählte Medium anschauen kann.
12. Videos favorisieren - Als User, möchte ich Filme/Serien favorisieren, damit ich an einem späteren Zeitpunkt leichter Zugriff auf meine Lieblingsserien habe.
13. Video Wiedergabe mit zurück Button - Als User, möchte ich wissen welche Medien ich als letztes geschaut habe, damit ich weiß wo ich weiterschauen kann.
14. Suche - Als User, möchte ich nach Medien direkt suchen können, damit ich schnell Zugriff darauf bekomme.
15. Watchlist ("My List") - Als User, möchte ich auf meine favorisierten Medien in einer Liste Zugriff haben, damit ich eine Übersicht über meine Lieblingsserien habe.
16. Aus Watchlist Videos entfernen - Als User, möchte ich Medien aus meiner Wachlist entfernen, damit ich meine Meinung über Medien ändern kann.
17. Verlauf - Als User, möchte ich wissen welche Medien ich als letztes geschaut habe, damit ich weiß wo ich weiterschauen kann.
18. Videos aus Verlauf löschen - Als User, möchte ich Medien aus meinem Verlauf löschen, damit ich Teile meines Verlaufs privat halten kann.
19. Navigation Bar - Als User, möchte ich oben eine Übersicht haben, damit ich sehr leicht über die Hauptfunktionen navigieren kann.
20. Account bearbeiten - Als User, möchte ich meine Accountdaten bearbeiten, damit ich weiterhin Zugriff darauf haben kann falls sich Sachen bei mir ändern.
21. Account entfernen - Als User, möchte ich meinen Account löschen, damit mein Account nicht mehr bei Notflix ist falls ich den Service nicht mehr nutzen will.
22. Mobile Ansicht - Als User, möchte ich dass die App sich anpasst für Smartphones, damit die Navigation damit sich besser anfühlt.

## Movie List Anwendung

### Übersicht

Diese Anwendung ermöglicht es Benutzern, Filme anzuzeigen, hinzuzufügen, zu bearbeiten und zu löschen. Sie beinhaltet auch Funktionen zur Benutzerauthentifizierung, Profilverwaltung und zum Ansehen einzelner Filmdetails.

<details>
  <summary>Diese Modelle wurden gezeigt</summary>

(Die Modelle können noch angepasst werden)

#### Account

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

#### VerificationToken

| Feld       | Typ    | Beschreibung                                |
| ---------- | ------ | ------------------------------------------- |
| \_id       | String | Eindeutige Kennung des Verifizierungstokens |
| identifier | String | Bezeichner für die Verifizierung            |
| token      | String | Token zur Verifizierung                     |
| expires    | Date   | Ablaufdatum des Tokens                      |

#### Movie

| Feld         | Typ    | Beschreibung                                  |
| ------------ | ------ | --------------------------------------------- |
| \_id         | String | Eindeutige Kennung des Films                  |
| title        | String | Titel des Films                               |
| description  | String | Beschreibung des Films                        |
| videoUrl     | String | URL zum Video des Films                       |
| thumbnailUrl | String | URL zum Thumbnail-Bild des Films              |
| genre        | String | Genre des Films                               |
| duration     | String | Dauer des Films (z.B. '2 Stunden 30 Minuten') |

#### User

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

### Anmeldung

#### Admin

Email: admin@net-movies.de
Passwort: admin

#### User

Email: user@net-movies.de
Passwort: user

### Verwendung

#### API-Routen

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

### Beispiel-Filme

Die folgenden Filme wurden in die Datenbank hinzugefügt:

##### Big Buck Bunny

- **Title**: Big Buck Bunny
- **Description**: Big Buck Bunny is a short computer-animated comedy film by the Blender Institute.
- **Video URL**: [Big Buck Bunny Video](http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4)
- **Thumbnail URL**: [Big Buck Bunny Thumbnail](https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217)
- **Genre**: Animation
- **Duration**: 10:34
- **ID**: 664a6a887d397d87582c27e0

##### Sintel

- **Title**: Sintel
- **Description**: Sintel is a short computer-animated fantasy film by the Blender Institute.
- **Video URL**: [Sintel Video](https://archive.org/download/Sintel/sintel-2048-surround.mp4)
- **Thumbnail URL**: [Sintel Thumbnail](https://ddz4ak4pa3d19.cloudfront.net/cache/cb/6d/cb6dd0a5f551eec35f896…)
- **Genre**: Fantasy
- **Duration**: 14:48
- **ID**: 664a6a887d397d87582c27df

##### Tears of Steel

- **Title**: Tears of Steel
- **Description**: Tears of Steel is a short science fiction film by the Blender Institute.
- **Video URL**: [Tears of Steel Video](https://archive.org/download/tearsofsteel_202010/TEARSOFSTEEL.mp4)
- **Thumbnail URL**: [Tears of Steel Thumbnail](https://m.media-amazon.com/images/M/MV5BNzNiMDUxYmItMzkyMS00MzlmLWJlNWYtYmUyMmFkZDE4MjExXkEyXkFqcGdeQXVyNjMxMTk1NTM@._V1_.jpg)
- **Genre**: Sci-Fi
- **Duration**: 12:14
- **ID**: 664c50d14f906d0ca1b2cf0a

##### Elephants Dream

- **Title**: Elephants Dream
- **Description**: Elephants Dream is a short computer-animated film by the Blender Institute.
- **Video URL**: [Elephants Dream Video](https://www.youtube.com/embed/ePVe9FzuFfQ)
- **Thumbnail URL**: [Elephants Dream Thumbnail](https://upload.wikimedia.org/wikipedia/commons/f/fd/Elephants_Dream_Emo_Proog_s6.jpg)
- **Genre**: Animation
- **Duration**: 10:53
