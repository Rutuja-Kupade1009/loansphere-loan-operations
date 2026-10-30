# LoanSphere API Specification (Initial)

Base URL: `http://localhost:8080/api/v1`

All endpoints return JSON unless noted. This is the initial endpoint contract; request/response DTO fields can be refined during implementation.

## 1. Authentication

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/login` | Public | Authenticate user |
| POST | `/auth/register` | Admin / controlled setup | Create user |
| GET | `/auth/me` | Authenticated | Get current user |

Example login request:

```json
{
  "username": "loan.officer",
  "password": "ChangeMe123!"
}
```

## 2. Users

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/users` | Admin | List users |
| GET | `/users/{id}` | Admin | Get user |
| POST | `/users` | Admin | Create user |
| PUT | `/users/{id}` | Admin | Update user |
| PATCH | `/users/{id}/status` | Admin | Activate/deactivate user |

## 3. Customers

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/customers` | Staff | List/search customers |
| GET | `/customers/{id}` | Staff / owner | Get customer |
| POST | `/customers` | Loan Officer, Admin | Create customer |
| PUT | `/customers/{id}` | Loan Officer, Admin | Update customer |
| PATCH | `/customers/{id}/status` | Admin | Change customer status |

## 4. Loan products

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/loan-products` | Staff | List products |
| GET | `/loan-products/{id}` | Staff | Get product |
| POST | `/loan-products` | Admin | Create product |
| PUT | `/loan-products/{id}` | Admin | Update product |
| PATCH | `/loan-products/{id}/status` | Admin | Activate/deactivate product |

## 5. Loan applications

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/applications` | Staff | List/filter applications |
| GET | `/applications/{id}` | Staff / owner | Get application |
| POST | `/applications` | Loan Officer | Create application |
| PATCH | `/applications/{id}/submit` | Loan Officer | Submit application |
| PATCH | `/applications/{id}/review` | Loan Officer | Start review |
| PATCH | `/applications/{id}/decision` | Authorized Loan Officer | Approve/reject |

Example decision request:

```json
{
  "decision": "APPROVED",
  "remarks": "Documents reviewed and application approved."
}
```

## 6. Documents

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/applications/{applicationId}/documents` | Staff | List application documents |
| POST | `/applications/{applicationId}/documents` | Loan Officer | Add document metadata |
| PATCH | `/documents/{id}/verification` | Loan Officer | Verify/reject document |

## 7. Loans and simulated disbursement

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/loans` | Staff | List loans |
| GET | `/loans/{id}` | Staff / owner | Get loan |
| POST | `/applications/{applicationId}/disbursements` | Finance Officer | Record simulated disbursement |
| GET | `/loans/{id}/schedule` | Staff / owner | Get repayment schedule |

The disbursement endpoint records a demonstration event only; it does not transfer funds.

## 8. Repayments and collections

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/loans/{loanId}/payments` | Staff / owner | List payment records |
| POST | `/payments` | Finance Officer | Record simulated payment |
| GET | `/repayments/overdue` | Staff | List overdue instalments |
| POST | `/collections/follow-ups` | Loan Officer, Finance Officer | Record follow-up |
| GET | `/loans/{loanId}/follow-ups` | Staff | View follow-ups |

Example payment request:

```json
{
  "loanId": 1001,
  "scheduleId": 5001,
  "amount": 12500.00,
  "paymentReference": "DEMO-PAY-0001",
  "paymentDate": "2026-10-30",
  "notes": "Simulated payment entry"
}
```

## 9. Dashboard and reports

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/dashboard/summary` | Staff | Operational KPI summary |
| GET | `/reports/applications` | Staff | Application report |
| GET | `/reports/loans` | Staff | Loan report |
| GET | `/reports/collections` | Staff | Collection report |
| GET | `/reports/overdue` | Staff | Overdue report |
| GET | `/reports/export` | Authorized staff | Export filtered CSV |

## 10. Standard response and errors

Successful responses should use suitable HTTP codes such as `200`, `201`, and `204`. Common errors:
- `400 Bad Request`: invalid input or invalid workflow transition.
- `401 Unauthorized`: missing or invalid authentication.
- `403 Forbidden`: authenticated user lacks permission.
- `404 Not Found`: requested record does not exist.
- `409 Conflict`: duplicate reference or conflicting state.
- `500 Internal Server Error`: unexpected server failure.

Example error body:

```json
{
  "timestamp": "2026-10-30T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Requested loan amount is outside the product limits.",
  "path": "/api/v1/applications"
}
```

## 11. API implementation notes
- Validate request DTOs using Jakarta Bean Validation.
- Apply backend role checks to every protected operation.
- Use pagination and filtering for list endpoints.
- Do not expose passwords, token secrets, or internal entity fields.
- Treat payment and disbursement records as simulated portfolio data only.
