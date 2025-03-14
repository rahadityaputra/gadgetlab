# Device Api Spec

## Get Devices API

Endpoint : GET /api/devices/popular

Response Body Success :

```json
{
  "data": [
    {
      "_id": "677f6be3121de1f99249e77d",
      "position": 1,
      "id": "samsung_galaxy_s25_ultra-13322",
      "name": "Samsung Galaxy S25 Ultra",
      "favorites": 53790,
      "category": "Top 10 by daily interest"
    },
    {
      "_id": "677f6be3121de1f99249e77e",
      "position": 2,
      "id": "xiaomi_redmi_turbo_4-13598",
      "name": "Xiaomi Redmi Turbo 4",
      "favorites": 35779,
      "category": "Top 10 by daily interest"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Too Many Requests"
}
```

## Get Device Detail API

Endpoint : GET /api/devices/:id

Response Body Success :

```json
{
  "data": {
    "_id": "677f7660da471cd2e9adce1f",
    "id": "Apple iPhone 13 Pro Max",
    "name": "Apple iPhone 13 Pro Max",
    "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
    "quickSpec": [
      {
        "name": "Display size",
        "value": "6.7\""
      }
    ],
    "detailSpec": [
      {
        "category": "Network",
        "specifications": [
          {
            "name": "Technology",
            "value": "GSM / CDMA / HSPA / EVDO / LTE / 5G"
          }
        ]
      }
    ]
  }
}
```

Response Body Error :

```json
{
  "errors": "Device not found"
}
```

## Get File PDF for Device Detail API

Endpoint : GET /api/devices/:id/export

Response Header :

- Content-type : application/pdf
- Content-Disposition : attachment; filename="apple-specs.pdf

Response Body Success :

```json
{
  "data": {
    "message": "PDF generated successfully",
    "pdf": {
      "url": "/download/${fileName}",
      "fileName": "fileName",
      "fileSize": "2MB"
    }
  }
}
```

Response Body Error :

```json
{
  "errors": "Device not found"
}
```


## Search Devices

Endpoint : GET /api/devices/search

Query : 
- name



Response Body Success :

```json
{
  "data": [
  {
    "id": "casio_g_zone_ca_201l-5384",
    "name": "Casio G'zOne CA-201L",
    "img": "https://fdn2.gsmarena.com/vv/bigpic/casio-gzone-ca-201l.jpg",
    "description": "Casio G'zOne CA-201L Android smartphone. Announced Mar 2013..."
  },
]
}
```

Response Body Error :

```json
{
  "errors": "Device not found"
}
```

