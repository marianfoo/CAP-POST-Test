using AdminService as service from '../../srv/admin-service';

annotate AdminService.Books with @(UI: {LineItem: [
    {
        Label: 'Title',
        Value: title
    },
    {
        Label: 'Description',
        Value: descr
    },
    {
        Label: 'Price',
        Value: price
    },
    {
        Label: 'Stock',
        Value: stock
    }
] }
);