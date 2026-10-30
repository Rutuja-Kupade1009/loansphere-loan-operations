# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for LoanSphere, a centralized loan operations and repayment management platform.

### 1.2 Product scope
LoanSphere supports internal lending operations from customer registration through application review, document verification, approval, simulated disbursement, repayment tracking, overdue follow-up, and reporting.

### 1.3 Intended users
- Administrator: manages users, roles, reference data, and system oversight.
- Loan Officer: manages customer profiles, applications, documents, and application review.
- Finance Officer: records simulated disbursement and repayment entries and monitors outstanding balances.
- Customer (optional MVP role): views their own application and loan information only.

### 1.4 Definitions
- Applicant: a customer who has submitted a loan application.
- Loan: an approved application represented as an active lending record.
- EMI: Equated Monthly Instalment.
- Disbursement: a recorded event representing release of loan funds; in this project it is simulated.
- Repayment schedule: planned instalments for a loan.
- Overdue instalment: an instalment whose due date has passed and whose outstanding amount is greater than zero.

## 2. Overall description

### 2.1 Product perspective
The system is a web application with a React client, Spring Boot REST API, and MySQL persistence layer. The backend is the authority for business rules, validation, permissions, and financial calculations.

### 2.2 Operating environment
- Modern desktop browser.
- Java 17 or later.
- Spring Boot 3.x.
- MySQL 8.x (or compatible version).
- Node.js LTS for frontend development.

### 2.3 Constraints
- Use synthetic/demo personal and financial data only.
- Do not connect to real banking, payment, or credit-bureau systems.
- Do not move real money.
- All money values must use decimal-safe types (`BigDecimal` in Java and DECIMAL in MySQL).
- Authorization must be enforced by the backend, not only by hiding frontend controls.

### 2.4 Assumptions
- Staff users are provisioned by an administrator in the MVP.
- Loan products have configured interest rates, terms, and limits.
- Payments entered in the system are simulated records for demonstration and testing.

## 3. Functional requirements

### FR-01 Authentication
The system shall allow registered users to log in and receive an authenticated session/token. Invalid credentials shall be rejected with a generic error.

### FR-02 Role-based authorization
The system shall restrict operations according to assigned roles. Unauthorized requests shall be rejected by the backend.

### FR-03 User management
Administrators shall be able to create, view, update, activate, and deactivate staff users and assign roles.

### FR-04 Customer management
Authorized staff shall be able to create, view, update, search, and deactivate customer records. Customer identifiers and contact details shall be validated.

### FR-05 Loan product management
Administrators shall be able to create, view, update, activate, and deactivate loan products. A product shall include a name, description, interest rate, minimum and maximum principal, and permitted term range.

### FR-06 Loan application
Loan Officers shall be able to create and review applications linked to a customer and loan product. An application shall capture requested principal, requested term, purpose, submission date, and status.

### FR-07 Document verification
Authorized staff shall be able to record required document metadata and mark each document as pending, verified, or rejected, including a reason for rejection. File storage can be added as a later enhancement.

### FR-08 Application decision
Authorized Loan Officers shall be able to approve or reject an application. The system shall validate allowed status transitions and record decision maker, timestamp, and remarks.

### FR-09 Simulated disbursement
Finance Officers shall be able to create a disbursement record for an approved application. The system shall prevent duplicate disbursement records for the same loan. This feature shall not initiate a real transfer.

### FR-10 Loan account
The system shall maintain an approved loan record with principal, interest rate, term, start date, maturity date, status, and outstanding balance.

### FR-11 Repayment schedule
The system shall generate an instalment schedule for an active loan. Each instalment shall include sequence number, due date, principal component, interest component, total due, amount paid, and status.

### FR-12 Payment recording
Finance Officers shall be able to record simulated payments against an instalment. The backend shall validate positive amounts, prevent duplicate payment references, update balances transactionally, and retain payment history.

### FR-13 Overdue monitoring
The system shall identify instalments past their due dates with an outstanding amount and allow authorized staff to record collection follow-up notes and next-action dates.

### FR-14 Dashboard
The dashboard shall display operational summaries such as application counts by status, active loans, total outstanding balance, collections recorded, and overdue instalments.

### FR-15 Reporting and export
Authorized users shall be able to filter operational records and export supported reports as CSV.

### FR-16 Audit trail
The system shall record important actions such as application decisions, document status changes, disbursement entries, and payment entries with actor and timestamp.

## 4. Non-functional requirements

- Security: password hashing, authenticated APIs, backend role checks, input validation, and safe error responses.
- Reliability: payment and balance updates shall execute within a database transaction.
- Data integrity: use foreign keys, unique constraints where applicable, and decimal-safe monetary columns.
- Maintainability: use layered architecture with controllers, services, repositories, DTOs, entities, and centralized exception handling.
- Performance: paginated list endpoints and database indexes for common search/filter fields.
- Usability: consistent navigation, form validation feedback, loading states, and clear status labels.
- Testability: unit tests for service rules and integration tests for critical API flows.

## 5. MVP acceptance criteria

1. Authorized users can log in and access only permitted operations.
2. Staff can create and maintain customer records and loan products.
3. A Loan Officer can create an application, record document checks, and approve or reject it.
4. A Finance Officer can record a simulated disbursement for an approved application.
5. The system generates a repayment schedule and records simulated payments.
6. Payment recording updates instalment and loan balances consistently.
7. Overdue instalments can be identified and assigned follow-up notes.
8. Dashboard metrics and CSV reports reflect persisted records.
9. Critical business rules are covered by automated tests.

## 6. Out of scope
Real payment processing, bank integrations, credit bureau checks, automated credit scoring/decisions, production KYC verification, SMS/email delivery, and multi-tenant deployment.
