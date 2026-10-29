# Software Requirements Specification (SRS)

## 1. Document information

-   **Project:** LoanSphere
-   **Full name:** Loan Operations & Repayment Management Platform
-   **Version:** 0.1 --- Draft
-   **Status:** Initial requirements baseline
-   **Application:** Full-stack web application
-   **Stack:** React.js, Java, Spring Boot, MySQL

## 2. Purpose

This document defines the initial functional and non-functional
requirements for LoanSphere. It is the reference for design,
implementation, testing, and acceptance of the MVP.

## 3. Problem statement

Loan operations require coordination between application intake,
document verification, approval, disbursement, installment scheduling,
payment recording, overdue follow-up, and reporting. When these
activities are spread across disconnected tools, teams may have
difficulty tracking the current status and maintaining consistent
records.

LoanSphere will centralize these workflows in a role-based application
with traceable status changes and consistent repayment records.

## 4. Goals and objectives

1.  Centralize loan application and repayment data.
2.  Provide a defined application review and approval workflow.
3.  Calculate EMI values and generate repayment schedules.
4.  Track simulated disbursements, payments, balances, and overdue
    installments.
5.  Restrict functionality according to user roles.
6.  Provide dashboard summaries and operational reports.
7.  Protect data integrity through validation, database transactions,
    and testing.
8.  Deliver a documented and deployable full-stack portfolio project.

## 5. Stakeholders and user roles

### 5.1 Customer

-   Maintain permitted profile details.
-   Submit a loan application.
-   Upload required supporting documents.
-   View application status and decision history visible to the
    customer.
-   View loan details, repayment schedule, and payment history.

### 5.2 Loan Officer

-   View and manage assigned applications.
-   Review application information and documents.
-   Record verification results and comments.
-   Record an approval or rejection decision within assigned authority.

### 5.3 Finance Officer

-   View approved loans.
-   Record simulated disbursement details.
-   Record repayments and payment references.
-   Review payment history, balances, and overdue accounts.
-   Generate authorized financial reports.

### 5.4 Administrator

-   Manage users and roles.
-   Configure loan products and permitted terms.
-   Review audit logs and system-level reports.
-   Maintain reference data and application settings.

## 6. Scope

### 6.1 In scope

-   Authentication and role-based authorization.
-   Customer profile management.
-   Loan product configuration.
-   Loan application submission and tracking.
-   Supporting-document metadata and verification status.
-   Application review, approval, and rejection.
-   Disbursement record creation.
-   EMI calculation and repayment schedule generation.
-   Simulated payment entry and reconciliation.
-   Outstanding balance and overdue tracking.
-   Dashboard, search, filtering, pagination, and reports.
-   Audit logs, automated tests, API documentation, and deployment
    preparation.

### 6.2 Out of scope

-   Real transfer of money or integration with a payment gateway.
-   Real bank-account connectivity.
-   Credit bureau checks or production credit scoring.
-   Automated AI decisions on loan approval.
-   Legally binding agreements or production regulatory certification.
-   Multi-bank production integrations.
-   Microservices in the MVP.

## 7. Functional requirements

### FR-01: Authentication

The system shall authenticate registered users and identify their
assigned roles. Passwords shall not be stored in plaintext.

### FR-02: Authorization

The backend shall verify permissions for every protected operation.
Hiding a button in the frontend shall not count as authorization.

### FR-03: Customer management

Authorized users shall create, view, update, and search customer
profiles according to their permissions.

### FR-04: Loan product management

Administrators shall create and maintain loan products with configured
interest rates, principal limits, and available tenure options. Invalid
configurations shall be rejected.

### FR-05: Application submission

Customers shall submit loan applications with the required fields. The
system shall assign a unique application identifier and an initial
status.

### FR-06: Application review

Loan officers shall view assigned applications, record review notes, and
update verification status. All permitted status changes shall be
validated by the backend.

### FR-07: Application decision

Authorized loan officers shall record an approval or rejection decision.
A rejection shall require a reason. Decisions shall be timestamped and
attributed to the acting user.

### FR-08: Disbursement

Finance officers shall record disbursement details only for an eligible
approved application. The system shall prevent duplicate or invalid
disbursement records.

### FR-09: EMI calculation

The system shall calculate an estimated EMI for valid principal, annual
interest rate, and tenure inputs using the configured reducing-balance
method. The calculation shall use decimal arithmetic and documented
rounding rules.

### FR-10: Repayment schedule

After disbursement, the system shall generate a schedule containing
installment number, due date, opening balance, principal component,
interest component, installment amount, and closing balance.

### FR-11: Payment recording

Authorized finance users shall record a payment with amount, date,
method/reference, and status. The service shall validate the payment and
update installment and loan balances transactionally.

### FR-12: Duplicate-payment protection

The system shall use an idempotency or equivalent duplicate-detection
mechanism for payment submission. Retrying a request shall not silently
record the same payment twice.

### FR-13: Overdue monitoring

The system shall identify unpaid or partially paid installments whose
due dates have passed, according to a documented business rule. Overdue
status should be derived consistently from schedule and payment data.

### FR-14: Loan closure

A loan may be closed only when its outstanding amount is zero under the
configured rounding and settlement rules. Closure shall be recorded in
the audit history.

### FR-15: Dashboard

The application shall show role-appropriate summary metrics, such as
pending applications, approved loans, disbursed principal, outstanding
principal, collections, and overdue installments.

### FR-16: Reports

Authorized users shall filter reports by date range, loan status, and
relevant loan attributes. Exported results shall match the displayed
filtered dataset.

### FR-17: Audit history

The system shall record important actions, including decisions,
disbursement records, payment changes, and loan closure, with actor,
timestamp, action, and relevant record reference.

### FR-18: Document handling

The system shall store document metadata and verification state. File
access shall be restricted to authorized users. File type and size
limits shall be enforced.

## 8. Business rules

1.  An application must be submitted before it can enter review.
2.  Only authorized roles can record application decisions.
3.  A rejected application cannot be disbursed.
4.  A loan cannot be disbursed more than once unless an explicitly
    defined additional-disbursement feature is implemented.
5.  Repayment schedules are generated from the approved loan terms and
    actual disbursement details.
6.  Principal, interest, payment, and balance calculations use decimal
    types, not binary floating-point types.
7.  Payment allocation rules must be documented. The MVP should define
    whether a payment settles the oldest due installment first and how
    partial payments are handled.
8.  A payment amount must be positive and must not exceed the permitted
    amount under the chosen payment-allocation policy.
9.  Overdue status is determined from due dates and remaining
    installment amounts, not solely from a manually edited status field.
10. Every material decision or financial-record change must be
    auditable.
11. The system uses synthetic demonstration data and does not transfer
    real money.
12. Loan eligibility checks in the MVP are workflow checks only, not a
    real-world credit decision.

## 9. Non-functional requirements

### Security

-   Hash passwords using an established password-hashing implementation.
-   Enforce authorization on the backend.
-   Validate input and avoid exposing sensitive information in logs.
-   Protect uploaded documents and secrets.

### Reliability and consistency

-   Use database transactions for payment and balance updates.
-   Enforce suitable unique constraints and foreign keys.
-   Handle concurrent and repeated requests safely.
-   Return consistent error responses.

### Performance

-   Paginate large result sets.
-   Index columns used frequently for search and joins.
-   Avoid unnecessary database queries and excessive data loading.

### Maintainability

-   Separate controllers, services, repositories, DTOs, and entities.
-   Keep business rules in service/domain logic.
-   Use clear naming, consistent error handling, and documented
    configuration.

### Usability and accessibility

-   Provide responsive layouts and clear validation messages.
-   Include loading, empty, success, and error states.
-   Support keyboard navigation for core workflows where practical.

### Testability

-   Test EMI calculations, workflow transitions, authorization, and
    payment processing.
-   Include integration tests for key API and database behavior.

## 10. Core data entities

Initial entities expected in the data model:

-   User
-   Role (or role field/authority model)
-   Customer
-   LoanProduct
-   LoanApplication
-   LoanDocument
-   ApplicationReview / DecisionHistory
-   Loan
-   RepaymentSchedule / Installment
-   Payment
-   AuditLog

Exact attributes and relationships will be finalized in the ER diagram
and database design.

## 11. High-level workflows

### Application workflow

Draft → Submitted → Under Review → Approved or Rejected.

### Approved loan workflow

Approved → Disbursement Recorded → Repayment in Progress → Closed when
fully repaid.

### Document workflow

Uploaded → Pending Verification → Verified or Rejected, with review
notes.

### Payment workflow

Payment Submitted → Validated → Recorded → Allocated to installment(s) →
Balances updated.

Invalid state transitions must be rejected by the backend.

## 12. Acceptance criteria for MVP

-   A customer can submit an application and view its status.
-   A loan officer can review the application and record a decision.
-   An application cannot be disbursed after rejection.
-   EMI and schedule values pass independently verified test cases.
-   A finance officer can record a simulated payment.
-   The payment updates installment and loan balances consistently.
-   Duplicate payment retries do not create duplicate financial records.
-   Unauthorized API requests are denied.
-   Overdue reports reflect due dates and unpaid balances.
-   Audit history records key decisions and financial events.
-   Automated tests cover the critical business rules.
-   The project can be run using the documented setup steps.

## 13. Assumptions and risks

-   This is an educational portfolio project using synthetic data.
-   Interest calculation, rounding, payment allocation, and overdue
    rules must be explicitly defined before implementation.
-   Real-world lending requirements vary by jurisdiction and
    institution; this project does not claim regulatory compliance.
-   Uploaded files and personal data must be protected even in a
    demonstration.
-   Scope should remain limited until the MVP is complete.

## 14. Planned deliverables

1.  Approved SRS.
2.  Use-case and workflow diagrams.
3.  ER diagram and schema.
4.  API specification.
5.  React frontend.
6.  Spring Boot backend.
7.  Automated tests.
8.  README, screenshots, and deployment instructions.
