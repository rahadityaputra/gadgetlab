# Brand Api Spec

## Get Brands API

Endpoint : GET /api/brands/

Response Body Success :

```json
{
  "data": [
        {
            "id": "apple-phones-48",
            "name": "Apple",
            "devices": 98
        }
    ]
}

```


## Get List Device by Brands API

Endpoint : GET /api/brands/:brand_id

Response Body Success :

```json
{
  "data": [
        {
            "id": "apple_iphone_13_pro_max-11089",
            "name": "iPhone 13 Pro Max",
            "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
            "description": "Apple iPhone 13 Pro Max smartphone. Announced Sep 2021..."
        }
    ]
}

```