# User Api Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "narutokonoha",
  "password": "naruto123",
  "passwordConfirmation": "naruto123",
  "email": "naruto@gmail.com",
  "name": "Uzumaki Naruto"
}
```

Response Body Success :

```json
{
  "data": {
    "userId": "1",
    "message": "Verification code sent successfully"
  }
}
```

Response Body Error :

```json
{
  "errors": "email already used"
}
```

## Verify verification code register User API

Request Body :

```json
{
  "userId": "1",
  "code": "123456"
}
```

Response Body Success :

```json
{
  "data": {
    "userId": "1",
    "message": "registration successful, please login"
  }
}
```

Response Body Error :

```json
{
  "errors": "Verification code is incorrenct"
}
```

## Login User API

Endpoint : POST /api/users/login

Request body :

```json
{
  "email": "naruto@gmail.com",
  "passoword": "Naruto123$"
}
```

Response Body Success :

```json
{
  "data": {
    "userId": "1",
    "username" : "naruto123",
    "message": "Verification code sent successfully"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password not valid"
}
```

## Verify verification code login User API

Request Body :

```json
{
  "userId": "10",
  "username" : "naruto123",
  "code": "123456"
}
```

Response Body Success :

```json
{
  "data": {
    "userId": "1",
    "email": "naruto@gmail.com",
    "username": "naruto123",
    "name": "Uzumaki Narutot",
    "message": "Login successful",
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Verification code is incorrenct"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Request Header :

- authorization : unique-token

Request Body :

```json
{
  "nama": "Uzumaki Naruto",
  "password": "naruto123"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Get User API

Endpoint : GET /api/users/current

Request Header :

- authorization : unique-token

Response Body Success:

```json
{
  "username": "narutokonoha",
  "name": "Uzumaki Naruto",
  "email": "naruto@gmail.com"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : POST /api/users/logout

Request Header :

- authorization : unique-token

Response Body Success :

```json
{
  "data": {
    "status": "success",
    "message": "logout successfully"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Delete User API

Endpoint : DELETE /api/users/:id

Request Header :

- authorization : unique-token

Request Body :

```json
{
  "username": "naruto123",
  "pasword": "Naruto123#"
}
```

Response Body Success:

```json
{
  "data": {
    "message": "User account deleted successfully"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
