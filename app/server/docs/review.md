# Review Api Spec

## Add Review API

Endpoint : POST /api/users/:user_id/devices/:device_id/reviews/

Request Header :

- Authorization : "unique-token"

Request Body:

```json
{
  "rating": 5.0,
  "review": "The device is excellent, but the battery life could be better."
}
```

Response Body Success :

```json
{
  "data": {
    "review_id": "1",
    "user_id": "1",
    "device_id": "xiaomi_12",
    "rating": 4.5,
    "review": "The device is excellent, but the battery life could be better."
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Get Reviews API

Endpoint : GET /api/devices/:device_id/reviews

Response Body Success :

```json
{
  "data": [
    {
      "username": "naruto123",
      "id": "1",
      "rating": 4.5,
      "review": "The device is excellent, but the battery life could be better."
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Device not found or invalid device ID"
}
```

## Delete Review API

Endpoint : DELETE /api/users/:user_id/reviews/:review_id

Request Header :

- authorization : unique-token

Response Body Success :

```json
{
  "message": "Review successfully deleted"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Update Review API

Endpoint : PUT /api/users/:user_id/reviews/:review_id
Request Header :

- authorization : unique-token

Request Body :

```json
{
  "rating": 4.0,
  "review": "The device is excellent, but the battery life could be better."
}
```

Response Body Success :

```json
{
  "data": {
    "review_id": "1",
    "user_id": "1",
    "device_id": "xiaomi_12",
    "rating": 4.5,
    "review": "The device is excellent, but the battery life could be better."
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Get Average Rating Review API

Endpoint : GET /api/devices/:device_id/reviews/average-rating

Response Body Success :

```json
{
  "data": {
    "average-rating" : 3.5
  }
}
```

Response Body Error :

```json
{
  "errors": "Internal Server Error"
}
```



