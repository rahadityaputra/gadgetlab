# Feedback Api Spec

## Add Feedback API

Endpoint : POST /api/feedbacks/

Request Header :

- Authorization : "unique-token"

Request Body:

```json
{
  "category": "Bug",
  "description": "The login page doesn't work on mobile devices.",
  "email": "naruto@example.com"
}
```

Response Body Success :

```json
{
  "data": {
    "message" : "Thank you for your feedback!"
    }
}

```