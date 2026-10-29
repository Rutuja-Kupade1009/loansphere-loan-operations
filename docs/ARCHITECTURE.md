# LoanSphere --- Architecture Notes

## Architecture style

Use a modular monolith for the MVP. The React application calls a single
Spring Boot REST API. The API contains domain-focused modules with clear
responsibilities.

## Logical layers

1.  **Presentation:** React pages, reusable components, hooks, forms,
    tables, and route layouts.
2.  **API:** Spring MVC controllers, request/response DTOs, and HTTP
    status mapping.
3.  **Application/service:** Use cases, workflow validation,
    authorization checks, transaction boundaries, and orchestration.
4.  **Domain:** Loan rules, statuses, EMI and repayment calculations,
    payment allocation rules.
5.  **Persistence:** Spring Data JPA repositories and MySQL.
6.  **Cross-cutting:** Spring Security, validation, exception handling,
    audit logging, and observability.

## Suggested backend package structure

``` text
com.loansphere
├── auth
├── user
├── customer
├── loanproduct
├── application
├── document
├── loan
├── repayment
├── payment
├── reporting
├── audit
└── common
    ├── config
    ├── exception
    └── response
```

Each business module can contain controller, service, repository, DTO,
entity, and mapper classes where appropriate. Avoid creating unnecessary
abstractions before they are needed.

## Data integrity

-   Use `BigDecimal` for money and define scale/rounding rules.
-   Use foreign keys and unique constraints where appropriate.
-   Use transactions for payment creation and related balance changes.
-   Define an idempotency strategy for payment requests.
-   Use optimistic locking or another concurrency strategy where
    simultaneous updates could conflict.
-   Keep a traceable history for approval decisions and financial
    events.

## Security notes

-   Enforce permissions at the API/service layer.
-   Store password hashes, never plaintext passwords.
-   Do not commit secrets or production credentials.
-   Restrict document access and validate uploaded file types and sizes.
-   Use synthetic data in demos and screenshots.
-   Avoid logging passwords, tokens, or unnecessary personal data.

## Deployment direction

Local development can use React/Vite, Spring Boot, and a local MySQL
instance. Docker Compose can later standardize local setup. Production
deployment should use environment-based configuration, HTTPS, managed
secrets, database backups, and appropriate logging/monitoring.
