# LoanSphere Architecture

## 1. Architecture style
LoanSphere uses a layered modular-monolith architecture. The React frontend communicates with Spring Boot through REST APIs. Spring Boot applies business rules and persists data through Spring Data JPA/Hibernate to MySQL.

## 2. High-level view

```text
[ React + Vite UI ]
        |
        | HTTPS / JSON REST
        v
[ Spring Boot REST API ]
        |
        +-- Controllers
        +-- DTOs and Validation
        +-- Services / Business Rules
        +-- Security / Authorization
        +-- Repositories (Spring Data JPA)
        |
        v
[ MySQL Database ]
```

## 3. Backend package responsibilities

- `controller`: HTTP endpoints, request mapping, response status.
- `dto`: API request and response models; do not expose JPA entities directly.
- `entity`: persistent domain objects and relationships.
- `repository`: database access interfaces.
- `service`: business operations and transaction boundaries.
- `service.impl`: service implementations.
- `security`: authentication token processing and user lookup.
- `config`: security, CORS, and OpenAPI configuration.
- `exception`: domain exceptions and centralized error mapping.
- `enums`: controlled status and role values.
- `util`: focused reusable helpers such as EMI calculation and CSV formatting.

## 4. Frontend responsibilities

- `pages`: route-level screens grouped by business module.
- `components`: reusable layout, forms, tables, dialogs, and dashboard widgets.
- `services`: Axios API calls.
- `context`: shared authentication state.
- `hooks`: reusable React hooks.
- `routes`: route definitions and protected-route behavior.
- `utils`: formatting and UI constants.

## 5. Core domain relationships

- A User has one or more assigned roles (or one role in a simplified MVP).
- A Customer can have many LoanApplications.
- A LoanProduct can be referenced by many LoanApplications.
- A LoanApplication can have many LoanDocuments.
- An approved LoanApplication can result in one Loan.
- A Loan has many RepaymentSchedule entries.
- A RepaymentSchedule entry can have one or more Payment records, depending on partial-payment support.
- A Loan can have many CollectionFollowUp records.
- Important business actions can create AuditLog records.

## 6. Workflow and status rules

Suggested application statuses:
`DRAFT -> SUBMITTED -> UNDER_REVIEW -> APPROVED | REJECTED`

Suggested document statuses:
`PENDING -> VERIFIED | REJECTED`

Suggested loan statuses:
`PENDING_DISBURSEMENT -> ACTIVE -> CLOSED`
with `DEFAULTED` or `WRITTEN_OFF` reserved for later scope.

Suggested instalment statuses:
`PENDING -> PARTIALLY_PAID -> PAID`, with `OVERDUE` derived from due date and outstanding amount rather than being the only stored source of truth.

Status transitions must be checked in backend service methods. Do not accept arbitrary status values from the frontend.

## 7. Financial calculation and transaction rules

- Store money as `DECIMAL` in MySQL and `BigDecimal` in Java.
- Define currency scale and rounding explicitly (for example, two decimal places with `HALF_UP` where appropriate).
- Use a documented EMI formula and test zero-interest, normal-interest, short-term, and rounding cases.
- Use `@Transactional` for payment posting and related balance/schedule updates.
- Use unique payment references to prevent duplicate posting.
- Never use `double` or `float` for money.

## 8. Security

- Hash passwords using a modern password encoder.
- Authenticate API requests using signed tokens.
- Enforce role permissions at endpoint/service level.
- Validate all request DTOs.
- Keep secrets in environment variables or local ignored configuration.
- Restrict customers to their own records if customer-facing access is enabled.

## 9. API conventions

- Base path: `/api/v1`
- JSON request and response bodies.
- Use DTOs rather than entities.
- Use consistent HTTP status codes.
- Paginate collection endpoints.
- Return structured validation and error responses.
- Document endpoints with OpenAPI.

## 10. Deployment shape
For local development, run MySQL, Spring Boot, and React separately. Docker Compose can later orchestrate the database and application services. The MVP can be deployed as one backend service and one frontend static application.
