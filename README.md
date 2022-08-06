# Bookseller API in typescript

## Functional requirements

Endpoints to:

1. Get all books with pagination.
2. Create a sales order which will have basic information of the user, total amount and a list of books along with quantity.

## API endpoints

1. `GET /book?page=3&limit=2` - Returns all books in database. Pagination is supported. If page is not provided, it defaults to 1. If limit is not provided, it defaults to 10. Maximum limit is 15.
2. `POST /sales-order` - Creates a sales order.
3. `GET /sales-order?transactionId=YgCLICW` - Returns a sales order by transaction ID. If transaction ID is not provided, returns all sales orders.

## Expected payload for creating a sales order

```json
{
    "items": [
        {
            "isbn": "1935182420",
            "quantity": "2"
        },
        {
            "isbn": "1933988312",
            "quantity": "1"
        }
    ],
    "userDetails": {
        "name": "ABC",
        "email": "abc@def.com",
        "phone": "+919876543210",
        "address": "#123, XYZ Street, PQR, India"
    }
}
```
