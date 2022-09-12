<p align="center">
  <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc03.deviantart.net%2Ffs32%2Ff%2F2008%2F188%2F8%2F2%2Flock_logon_resource_by_lebreton.png&f=1&nofb=1" alt="database ilustration" width="300px"/>
</p>
<h1 align="center">DrivenPass API</h1>
<h2 align="center">Built with</h2>
<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" height="30px"/>
</div>

## General Info

DrivenPass API is a password manager. You can *store*, *acess* and *delete* four types of passwords:
 
&rarr; website **credentials**;

&rarr; **credit/debi**t cards;

&rarr; **Notes**;

&rarr; **Wi-fis**.

## Table of Contents

- [API Reference](#api-reference)
  - [Signup](#signup)
  - [Signin](#signin)
  - [Credentials](#create-a-credential)
  - [Secury Notes](#create-a-secury-note)
  - [Cards](#create-a-card)
  - [Wi-fi](#create-a-wifi)
- [DataBase](#database)
- [Author](#author)

## API Reference

### SignUp

``` bash
POST /signup
```
#### Request

- **Body**:

```json
{
  "email": "l3@g.com", // string (REQUIRED)
  "password": "1234567890" // string (REQUIRED)
}
```

> ⚠ `password`: 10 characters at least

#### Response

- **Status:** `201 Created`

```json
{
  "email": "l3@g.com"
}
```

### SignIn

``` bash
POST /signin
```
#### Request

- **Body**:
```json
{
  "email": "l3@g.com", // string (REQUIRED)
  "password": "1234567890" // string (REQUIRED)
}
```

#### Response

- **Status:** `202 Accepted`

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibDFAZy5jb20iLCJpYXQiOjE2NjMwMTQ1MDEsImV4cCI6MTY2NTYwNjUwMX0.5wtjDxAZcTeadqQ0nTh23lf7v_IwwAizkpDT8UZqocQ
```

### Create a Credential

``` bash
POST /credentials/:userId
```
#### Request

- **Body**:
```json
{
  "url": "https://http.cat",  // VALID URL
  "username": "lucasnetto",  // MAX 50 CHARACTERS
  "password": "123456",     // STRING
  "title": "TITLE"         // MAX 50 CHARECTERS
}
```

- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 11,
  "url": "https://http.cat",
  "username": "lucasnetto",
  "password": "d40b7ea7af2e2559ca05efcb020f7d6a31f2a3fb4325d9cf7005537c8754b575d266a234b13f04bb17f4bde7965cadc5a8967ad3128009fa4ac40aca08ff3817079a06e68ef62475ff6592b0fdbef9e711ea478458ba8995a6f6286a941cac63b67a74ba8281",
  "title": "1D",
  "userId": 1,
  "createdAt": "2022-09-12T20:37:19.538Z"
}
```
### Get all Credentials

``` bash
GET /credentials
```
#### Request

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```

#### Response

- **Status:** `200 OK`

```json
[
  {
    "id": 2,
    "url": "https://http.cat",
    "username": "lucasnetto",
    "password": "123456",
    "title": "TITULO MANEIRO",
    "userId": 1,
    "createdAt": "2022-09-12T19:49:29.930Z"
  },
  {
    "id": 3,
    "url": "https://http.cat",
    "username": "lucasnetto",
    "password": "123456",
    "title": "1",
    "userId": 1,
    "createdAt": "2022-09-12T19:50:00.975Z"
  },
]
```

### Get One Credential

``` bash
GET /credentials/:credentialId
```
#### Request


- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `200 OK`

```json
{
  "id": 12,
  "url": "https://http.cat",
  "username": "lucasnetto",
  "password": "123456",
  "title": "1d",
  "userId": 1,
  "createdAt": "2022-09-12T20:40:21.230Z"
}
```

### Delete One Credential

``` bash
DELETE /credentials/:credentialId
```
#### Request


- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 12,
  "url": "https://http.cat",
  "username": "lucasnetto",
  "password": "4b9e1107bb86b69947c4ed6db9e1726a4f8a648653d6f05c7bbe33df92c643bdd773006fc8cab36fa374dfff83da1bfee9c9c6192188df4071442cba396f7a66f1ef18ed45abeee9ed9c07410e0bb5a15fdde01e70bd112168b992f93a8a61f553b35d6d4e21",
  "title": "1d",
  "userId": 1,
  "createdAt": "2022-09-12T20:40:21.230Z"
}
```

### Create a Secury Note

``` bash
POST /securityNotes/:userId
```
#### Request

- **Body**:
```json
{
  "description": "descrição super top", // max 1000 characters
  "title": "title"                     // max 50 characters
}
```

> ⚠️ `title`: unique for each user 
- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 13,
  "title": "12",
  "description": "descrição super top",
  "userId": 1,
  "createdAt": "2022-09-12T20:44:57.412Z"
}
```

### Get all Secury Notes

``` bash
GET /securityNotes
```
#### Request

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```

#### Response

- **Status:** `200 OK`

```json
[
  {
    "id": 2,
    "title": "TITULO MANEIRO",
    "description": "descrição super top",
    "userId": 1,
    "createdAt": "2022-09-12T19:57:29.220Z"
  },
  {
    "id": 9,
    "title": "1",
    "description": "descrição super top",
    "userId": 1,
    "createdAt": "2022-09-12T20:04:10.852Z"
  },
  {
    "id": 10,
    "title": "9",
    "description": "descrição super top",
    "userId": 1,
    "createdAt": "2022-09-12T20:04:13.205Z"
  },
  {
    "id": 13,
    "title": "12",
    "description": "descrição super top",
    "userId": 1,
    "createdAt": "2022-09-12T20:44:57.412Z"
  }
]
```

### Get One Secury Note

``` bash
GET /securityNotes/:notesId
```
#### Request


- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `200 OK`

```json
{
  "id": 13,
  "title": "12",
  "description": "descrição super top",
  "userId": 1,
  "createdAt": "2022-09-12T20:44:57.412Z"
}
```

### Delete One Secury Note

``` bash
DELETE /securityNotes/:notesId
```
#### Request


- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 13,
  "title": "12",
  "description": "descrição super top",
  "userId": 1,
  "createdAt": "2022-09-12T20:44:57.412Z"
}
```

### Create a Card

``` bash
POST /card/:userId
```
#### Request

- **Body**:
```json
{
  "number": "139650745363", // string (12 numbers - luhn algorithm)
  "securityCode": "123", // string (3 numbers)
  "cardholderName": "Lucas B Barbosa", // string
  "expirationDate": "12/24", // string in format mm/yy
  "password": "1234", // string
  "type": "debit", // enum type: debit/credit/both
  "isVirtual": false, // boolean
  "title": "titile" // max 50 characters
}
```

> ⚠️ `title`: unique for each user 
- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 8,
  "number": "139650745363",
  "cardholderName": "Lucas B Barbosa",
  "securityCode": "123",
  "expirationDate": "12/24",
  "password": "4371c9d1ed98195a1362899492fa408ceb9ae2f86419aded245a54efdda38ab04de8053a7ba78b849c3c3b85ad33141a6e01c3fd45020bbb254ef1e1e450f2d67e13b8c2107d8233025f03e09e9cf343bcaaae983220a75965229774ef2cde9fd7f44da8",
  "isVirtual": false,
  "type": "debit",
  "title": "titile 7",
  "userId": 1,
  "createdAt": "2022-09-12T20:50:30.023Z"
}
```

### Get all Card

``` bash
GET /card
```
#### Request

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```

#### Response

- **Status:** `200 OK`

```json
[
  {
    "id": 2,
    "number": "139650745363",
    "cardholderName": "Lucas B Barbosa",
    "securityCode": "123",
    "expirationDate": "12/24",
    "password": "1234",
    "isVirtual": false,
    "type": "debit",
    "title": "1",
    "userId": 1,
    "createdAt": "2022-09-12T20:04:58.241Z"
  },
  {
    "id": 3,
    "number": "139650745363",
    "cardholderName": "Lucas B Barbosa",
    "securityCode": "123",
    "expirationDate": "12/24",
    "password": "1234",
    "isVirtual": false,
    "type": "debit",
    "title": "1d",
    "userId": 1,
    "createdAt": "2022-09-12T20:05:38.739Z"
  },
  {
    "id": 4,
    "number": "139650745363",
    "cardholderName": "Lucas B Barbosa",
    "securityCode": "123",
    "expirationDate": "12/24",
    "password": "1234",
    "isVirtual": false,
    "type": "debit",
    "title": "asdfsadf",
    "userId": 1,
    "createdAt": "2022-09-12T20:07:48.247Z"
  },
  {
    "id": 5,
    "number": "139650745363",
    "cardholderName": "Lucas B Barbosa",
    "securityCode": "123",
    "expirationDate": "12/24",
    "password": "1234",
    "isVirtual": false,
    "type": "debit",
    "title": "titile 12",
    "userId": 1,
    "createdAt": "2022-09-12T20:09:08.448Z"
  },
]
```

### Get One Card

``` bash
GET /card/:cardId
```
#### Request


- **Params**:
```http
:cardId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `200 OK`

```json
{
  "id": 8,
  "number": "139650745363",
  "cardholderName": "Lucas B Barbosa",
  "securityCode": "123",
  "expirationDate": "12/24",
  "password": "1234",
  "isVirtual": false,
  "type": "debit",
  "title": "titile 7",
  "userId": 1,
  "createdAt": "2022-09-12T20:50:30.023Z"
}
```

### Delete One Card

``` bash
DELETE /card/:cardId
```
#### Request


- **Params**:
```http
:cardId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 8,
  "number": "139650745363",
  "cardholderName": "Lucas B Barbosa",
  "securityCode": "123",
  "expirationDate": "12/24",
  "password": "4371c9d1ed98195a1362899492fa408ceb9ae2f86419aded245a54efdda38ab04de8053a7ba78b849c3c3b85ad33141a6e01c3fd45020bbb254ef1e1e450f2d67e13b8c2107d8233025f03e09e9cf343bcaaae983220a75965229774ef2cde9fd7f44da8",
  "isVirtual": false,
  "type": "debit",
  "title": "titile 7",
  "userId": 1,
  "createdAt": "2022-09-12T20:50:30.023Z"
}
```

### Create a Wifi

``` bash
POST /wifi/:userId
```
#### Request

- **Body**:
```json
{
  "networkName": "139650745363", // string
  "password": "1234", // string 
  "title": "TITULO" // string
}
```

- **Params**:
```http
:userId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 4,
  "networkName": "139650745363",
  "password": "9648170d449a674c49f6e0a20e07a281da382022744fa69d5ce84b804eb6caab081366542fdb7bc1f39273361e60d07dfb911d03fff071285876bcbb67b65281cfe10c1136878af47697891eb52f2ab98e030be6b25b3bd7bedb823e1b275a679df091cb",
  "title": "TITULO",
  "userId": 1,
  "createdAt": "2022-09-12T20:55:41.751Z"
}
```

### Get all Wifi

``` bash
GET /wifi
```
#### Request

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```

#### Response

- **Status:** `200 OK`

```json
[
  {
    "id": 1,
    "networkName": "139650745363",
    "password": "1234",
    "title": "TITULO",
    "userId": 1,
    "createdAt": "2022-09-12T20:10:26.427Z"
  },
  {
    "id": 4,
    "networkName": "139650745363",
    "password": "1234",
    "title": "TITULO",
    "userId": 1,
    "createdAt": "2022-09-12T20:55:41.751Z"
  }
]
```

### Get One Wifi

``` bash
GET /wifi/:wifiId
```
#### Request


- **Params**:
```http
:wifiId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `200 OK`

```json
{
  "id": 4,
  "networkName": "139650745363",
  "password": "1234",
  "title": "TITULO",
  "userId": 1,
  "createdAt": "2022-09-12T20:55:41.751Z"
}
```

### Delete One Wifi

``` bash
DELETE /wifi/:wifiId
```
#### Request


- **Params**:
```http
:wifiId -> integer (required)
```

**Headers**
```json
{
  "Authorization": "Bearer {{TOKEN}}" // TOKEN IS EMITED BY JWT
}
```


#### Response

- **Status:** `201 Created`

```json
{
  "id": 4,
  "networkName": "139650745363",
  "password": "9648170d449a674c49f6e0a20e07a281da382022744fa69d5ce84b804eb6caab081366542fdb7bc1f39273361e60d07dfb911d03fff071285876bcbb67b65281cfe10c1136878af47697891eb52f2ab98e030be6b25b3bd7bedb823e1b275a679df091cb",
  "title": "TITULO",
  "userId": 1,
  "createdAt": "2022-09-12T20:55:41.751Z"
}
```


## Database

<img src="src/assets/drivenPass_Database.png" alt="database ilustration"/>

## Author

[![gitHub](https://img.shields.io/badge/-GitHub-181717?logo=gitHub&logoColor=white&style=for-the-badge)](https://github.com/lucasborges24)
[![LinkedIn][linkedin-shield]][linkedin-url]
[![AGPL License](https://img.shields.io/badge/-Instagram-E4405F?logo=instagram&logoColor=white&style=for-the-badge)](https://www.instagram.com/lucas__fisica/)

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/lucas-b-barbosa-12a157216/
