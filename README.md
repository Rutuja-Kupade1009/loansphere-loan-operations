# LoanSphere --- Loan Operations & Repayment Management Platform

LoanSphere is a portfolio full-stack web application designed to help a
lending organization manage internal loan operations: application
review, document verification, approval workflows, loan disbursement
records, repayment schedules, payment recording, overdue monitoring, and
reporting.

> **Project status:** Planning and documentation\
> **Application type:** Enterprise B2B web application\
> **Initial scope:** Demonstration using simulated disbursement and
> payment records; no real money movement or bank integration.

## Problem statement

Loan operations involve multiple teams and related records. When
application reviews, document checks, repayment schedules, payment
history, and reports are maintained in disconnected tools, it can be
difficult to follow a loan's lifecycle and maintain consistent records.
LoanSphere proposes a centralized system with defined workflows,
role-based access, and traceable updates.

## Objectives

-   Centralize customer, loan application, loan, and repayment
    information.
-   Support application review, document verification,
    approval/rejection, and disbursement recording.
-   Calculate estimated EMIs and generate repayment schedules.
-   Record simulated repayments and maintain outstanding balances.
-   Identify overdue installments and support collection follow-ups.
-   Provide role-specific dashboards and reports.
-   Apply backend validation, access control, audit logging, and
    automated testing.
-   Demonstrate a complete React + Spring Boot + MySQL application.

## Users and roles

-   **Customer:** submits an application and views its status, loan
    details, schedule, and payment history.
-   **Loan Officer:** reviews assigned applications, checks documents,
    and records decisions within permitted authority.
-   **Finance Officer:** records disbursements and repayments and
    reviews collection information.
-   **Administrator:** manages users, roles, loan products, settings,
    and audit information.

Authorization must be enforced by the backend, not only by hiding
frontend controls.

## Core modules

1.  User and customer management
2.  Loan product and application management
3.  Document verification
4.  Application review and decision workflow
5.  Loan disbursement records
6.  EMI and repayment schedule generation
7.  Payment recording and reconciliation
8.  Overdue monitoring and collection follow-up
9.  Dashboard, reports, and CSV export
10. Audit logs and access control

## Technology stack

  Layer               Planned technology
  ------------------- -------------------------------------------
  Frontend            React.js, Vite, JavaScript, Material UI
  Routing and API     React Router, Axios
  Backend             Java 17+, Spring Boot, Spring Web
  Security            Spring Security, JWT-based authentication
  Persistence         Spring Data JPA, Hibernate
  Database            MySQL
  Validation          Jakarta Bean Validation
  Testing             JUnit 5, Mockito, API integration tests
  API documentation   Swagger / OpenAPI
  Build               Maven
  Delivery            GitHub, Docker, CI/CD (later phase)

## Architecture

The initial implementation will be a **modular monolith**, not
microservices.

``` text
React + Vite
    |
    | HTTPS / JSON REST API
    v
Spring Security
    |
REST Controllers
    |
Service Layer (business rules)
    |
Repositories (Spring Data JPA)
    |
MySQL
```

The backend will separate controllers, services, repositories, DTOs,
entities, validation, and exception handling.

## Loan lifecycle

``` text
Draft -> Submitted -> Under Review
                         |
                         +--> Rejected
                         |
                         +--> Approved -> Disbursed
                                             |
                                             v
                                      Repayment in Progress
                                             |
                              Fully repaid -> Closed
```

Only valid state transitions should be accepted. A rejected application
cannot be disbursed, and a loan cannot be closed while an amount remains
outstanding.

## Initial scope and exclusions

### Included in the MVP

-   Personal-loan product configuration
-   Customer and loan application management
-   Manual document verification
-   Application review and decision recording
-   EMI calculation and schedule generation
-   Simulated disbursement and payment recording
-   Outstanding and overdue tracking
-   Role-based access and audit logs
-   Dashboard and basic reports

### Excluded from the MVP

-   Real bank transfers or payment gateway integration
-   Credit bureau integration or real credit scoring
-   Automated AI loan approval
-   Legally binding loan agreements
-   Production regulatory certification
-   Microservices and Kafka unless a later requirement justifies them

## Repository structure (planned)

``` text
LoanSphere/
├── frontend/              # React + Vite application
├── backend/               # Spring Boot application
├── database/
│   ├── schema.sql         # Database schema (to be added)
│   └── sample-data.sql    # Development sample data (to be added)
├── docs/
│   ├── SRS.md
│   ├── PROJECT_PLAN.md
│   ├── ARCHITECTURE.md
│   └── API_SPECIFICATION.md
├── screenshots/
├── .gitignore
└── README.md
```

## Development roadmap

1.  **Requirements and design:** approve the SRS, workflows, ER model,
    and API conventions.
2.  **Backend foundation:** project setup, schema,
    customer/product/application APIs.
3.  **Frontend foundation:** dashboard shell, routing, forms, tables,
    and API integration.
4.  **Loan workflows:** document review, approval, EMI schedule,
    disbursement, and payments.
5.  **Security and reports:** roles, audit trail, overdue monitoring,
    dashboard metrics, exports.
6.  **Quality and deployment:** automated tests, OpenAPI documentation,
    Docker, deployment, and screenshots.

## Quality and acceptance criteria

-   A user can submit and track a loan application.
-   Authorized staff can review and record a decision.
-   Invalid workflow transitions are rejected by the backend.
-   EMI calculations match independently verified test cases.
-   Payment recording updates the correct installment and balance
    consistently.
-   Repeated payment requests cannot silently create duplicate payments.
-   Unauthorized users cannot access restricted API operations.
-   Reports reconcile with the underlying records.
-   Core business rules have automated tests.
-   Setup and run instructions are documented.

## Local setup

Setup instructions will be added after the frontend and backend projects
are created. The target local prerequisites are Git, Node.js LTS, Java
17+, Maven (or Maven Wrapper), and MySQL.

## Project documentation

-   [Software Requirements Specification](docs/SRS.md)
-   [Implementation Plan](docs/PROJECT_PLAN.md)
-   [Architecture](docs/ARCHITECTURE.md)
-   [API Specification](docs/API_SPECIFICATION.md)

## Disclaimer

LoanSphere is an educational portfolio project. Use synthetic data only.
It is not a live lending service, does not make real credit decisions,
and does not process real payments.
