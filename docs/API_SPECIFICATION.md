# LoanSphere --- API Specification (Draft)

Base path: `/api/v1`

This is a preliminary endpoint inventory. Request/response schemas,
status codes, validation rules, and permissions must be documented as
each endpoint is implemented.

## Authentication

-   `POST /auth/login` --- authenticate and issue an access token.
-   `POST /auth/refresh` --- optional token refresh, if implemented.
-   `POST /auth/logout` --- optional logout/revocation, if supported.

## Customers

-   `POST /customers` --- create customer (authorized roles).
-   `GET /customers` --- list/search customers with pagination.
-   `GET /customers/{customerId}` --- view a customer.
-   `PATCH /customers/{customerId}` --- update permitted fields.

## Loan products

-   `POST /loan-products` --- create product (administrator).
-   `GET /loan-products` --- list active products.
-   `GET /loan-products/{productId}` --- view product details.
-   `PATCH /loan-products/{productId}` --- update configuration
    (administrator).

## Loan applications

-   `POST /loan-applications` --- submit application.
-   `GET /loan-applications` --- list applications according to role and
    permissions.
-   `GET /loan-applications/{applicationId}` --- view application.
-   `POST /loan-applications/{applicationId}/submit` --- submit a draft.
-   `POST /loan-applications/{applicationId}/reviews` --- add a review
    or verification record.
-   `POST /loan-applications/{applicationId}/decision` ---
    approve/reject (authorized officer).

## Documents

-   `POST /loan-applications/{applicationId}/documents` ---
    upload/register a document.
-   `GET /loan-applications/{applicationId}/documents` --- list
    permitted document metadata.
-   `POST /documents/{documentId}/verification` --- record verification
    result.

## Loans and disbursement

-   `GET /loans` --- search loans.
-   `GET /loans/{loanId}` --- view loan details.
-   `POST /applications/{applicationId}/disbursements` --- record
    simulated disbursement (finance role).
-   `GET /loans/{loanId}/schedule` --- retrieve repayment schedule.

## Payments

-   `POST /loans/{loanId}/payments` --- record a simulated payment;
    design idempotency and transactional updates.
-   `GET /loans/{loanId}/payments` --- payment history.
-   `GET /payments/{paymentId}` --- view a payment record.

## Reports

-   `GET /reports/dashboard` --- role-appropriate dashboard summary.
-   `GET /reports/portfolio` --- portfolio report with supported
    filters.
-   `GET /reports/overdue` --- overdue installments.
-   `GET /reports/collections` --- collection summary.

## API conventions

-   Use JSON for request/response bodies unless uploading a file.
-   Validate request fields and return consistent error responses.
-   Use pagination for list endpoints.
-   Use HTTP status codes consistently.
-   Enforce authorization on every protected endpoint.
-   Document query parameters and response schemas in OpenAPI.
-   Never expose password hashes, secrets, or unrestricted sensitive
    records.
