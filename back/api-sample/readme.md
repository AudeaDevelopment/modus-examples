# Setup

- clone repository
- in bash: yarn install
- create .env file
- copy/paste the following into .env:
  ```
  API_1_KEY="Phi YXVkZWFkZXZlbG9wbWVudEBnbWFpbC5jb206R2lhdXNlcjg3IQ=="
  API_1_URL="https://giamaplogin.com/api_v2"
  API_2_KEY="api_key=add050f3a29fe44b776274af5ce8edfc&_=1547846313439"
  API_2_URL="https://api.giscloud.com/1/layers/1945147/features"
  ```
- in bash: yarn run start

# Routes

### **/books**

#### Url: **/books**

#### Method: **GET**

#### Protocol: **HTTP**

#### Returns:

- 200 (OK) + an array of books

#### Example URL:

```
  http://localhost:${PORT}/books
```

#### Example Response:

```
[
    {
        "id": 14,
        "group": "Demo",
        "title": "GIA Demo Book",
        "symbol": "house-yellow.ico",
        "color": "#ffffff",
        "tablename": "book_Demo_GIA_Demo_Book",
        "table_updated": null,
        "filename": "book_Demo_GIA_Demo_Book.geojson",
        "file_updated": null,
        "counts": {
            "rows": 4291,
            "geocoded": 4291,
            "giaScored": 0
        },
        "row_count": 4291
    },
    ...
]
```

### **/saturation**

#### Url: **/saturation?bookId=[BOOK_ID]&lat=[LATITUDE]&lon=[LONGITUDE]&rad=[RADIUS_METERS]**

#### Method: **GET**

#### Protocol: **HTTP**

#### Returns:

- 200 (OK) + a feature collection of all items in a book within the radius from the lat/long

#### Example URL:

```
http://localhost:${PORT}/saturation?bookId=14&lat=36.54&lon=-121.91&rad=10000
```

#### Example Response:

```
[
    {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                -121.932151,
                36.598653
            ]
        },
        "properties": {
            "Policy": "GIA126156",
            "Effective_Date": "1/1/2018",
            "Expiration_Date": "1/1/2019",
            "Policy_Type": "Home",
            "Policy_Limit": "625000",
            "Street": "1303 BUENA VISTA",
            "City": "PACIFIC GROVE",
            "State": "",
            "County": "Monterey",
            "Zipcode": "93950",
            "Year_Built": "2001",
            "Roof_Type": "Comp",
            "Protection_Class": "5",
            "Agency": "GIA Demo"
        }
    },
    ...
]
```

### **/score**

#### Url:

- **/score?lat=[LATITUDE]&lon=[LONGITUDE]**

  or

- **/score?bounds=[BOUNDING_BOX]**

#### Method: **GET**

#### Protocol: **HTTP**

#### Returns:

- 200 (OK) + an object representing a gia score at a lat/lon

* 200 (OK) + an object representing the gia score

  or

  - 200 (OK) + an array of objects representing multiple gia scores within a bounding box

#### Example URLs:

```
http://localhost:${PORT}/score?lat=-116.940864&lon= 34.251192
```

```
http://localhost:${PORT}/score?bounds=-117.91,33.84,-127.91,43.84
```

#### Example Responses:

```
{
    "__id": 4,
    "__ymax": 41.998461,
    "__ymin": 32.542381,
    "__xmax": -114.49383,
    "__xmin": -124.269262,
    "data": {
        "gia_score": 5
    }
}
```

```
[
  {
      "__id": 0,
      "__ymax": 34.789247,
      "__ymin": 34.77455,
      "__xmax": -118.545639,
      "__xmin": -118.56343,
      "data": {
          "gia_score": 0
      }
  },
  ...
]
```
