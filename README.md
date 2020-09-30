## Metric App
App to save metric value (number) for various (as required) key-strings and get sum of values for last 1 hour.

## APIs
#### POST metric
**Request**
```
POST /metric/{key}
{
    value: number
}

key - the name of metric being stored.
value - a numeric value.
```
E.g. 
```
/metric/hhh
{
    "value": 30
}
```
**Response (200)**
```
{}
```

#### GET metric sum
**Request**
```
GET /metric/{key}/sum

key - the name of metric for which the sum value is to be fetched.
```
**Response (200)**
```
{
    "value": number
}

value - the sum of metric values of last 1 hour.
```
E.g.
```
{
    "value": 400
}
```
**Error Response (500) E.g.**
```
{
    "message": "No metric for \"<your key>\" found."
}
```