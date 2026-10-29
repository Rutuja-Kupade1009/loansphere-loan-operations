# LoanSphere --- Implementation Plan

## Delivery approach

Build a modular monolith with a React frontend, Spring Boot REST API,
and MySQL database. Complete one vertical workflow at a time and keep
the main branch in a runnable state.

## Milestones

### Milestone 0 --- Documentation and repository

-   [ ] Create GitHub repository.
-   [ ] Add README and SRS.
-   [ ] Define issue labels and milestone plan.
-   [ ] Review scope and agree on MVP.

### Milestone 1 --- Design

-   [ ] Use-case diagram and role-permission matrix.
-   [ ] Loan lifecycle and payment-allocation rules.
-   [ ] ER diagram.
-   [ ] API naming and error-response conventions.
-   [ ] EMI calculation and rounding specification.

### Milestone 2 --- Backend foundation

-   [ ] Create Spring Boot Maven project.
-   [ ] Configure profiles and MySQL connection.
-   [ ] Add entities, repositories, DTOs, services, and controllers.
-   [ ] Add validation and global exception handling.
-   [ ] Implement customer and loan-product endpoints.
-   [ ] Add tests and OpenAPI documentation.

### Milestone 3 --- Application workflow

-   [ ] Create and submit loan applications.
-   [ ] Add review and document verification.
-   [ ] Implement allowed status transitions.
-   [ ] Record approval/rejection history.
-   [ ] Add backend authorization tests.

### Milestone 4 --- React foundation

-   [ ] Create React app with Vite.
-   [ ] Configure routing and shared layout.
-   [ ] Build login and role-specific navigation.
-   [ ] Build application queue, details, and forms.
-   [ ] Add API client, loading states, and error handling.

### Milestone 5 --- Loan servicing

-   [ ] Implement EMI calculator with BigDecimal.
-   [ ] Generate repayment schedules.
-   [ ] Record simulated disbursement.
-   [ ] Record payments transactionally.
-   [ ] Prevent duplicate payment recording.
-   [ ] Calculate outstanding and overdue amounts.
-   [ ] Test partial-payment and rounding cases.

### Milestone 6 --- Reporting and audit

-   [ ] Build dashboard metrics.
-   [ ] Add search, filters, pagination, and reports.
-   [ ] Add CSV export.
-   [ ] Add audit history.
-   [ ] Verify reports against database data.

### Milestone 7 --- Quality and release

-   [ ] Run backend unit and integration tests.
-   [ ] Test complete user journeys.
-   [ ] Add Docker configuration.
-   [ ] Add CI workflow.
-   [ ] Deploy frontend and backend.
-   [ ] Add screenshots, architecture diagram, and setup guide.

## Suggested weekly schedule

-   Week 1: requirements, ER diagram, project setup, foundational APIs.
-   Week 2: application workflow and initial React screens.
-   Week 3: security, document review, EMI and schedule generation.
-   Week 4: payment processing, overdue logic, reports.
-   Weeks 5--6: tests, deployment, documentation polish, and bug fixes.

This is a target schedule; prioritize correctness and a complete MVP
over adding optional technologies.

## Definition of done for a feature

A feature is complete when: 1. Its requirements and permissions are
clear. 2. Backend validation and error handling exist. 3. The UI handles
loading, success, empty, and failure states. 4. Tests cover important
business rules. 5. API documentation or README notes are updated. 6.
Changes are committed with a meaningful Git message.
