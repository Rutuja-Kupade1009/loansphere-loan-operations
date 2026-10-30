# LoanSphere Project Plan

## 1. Goal
Build a portfolio-quality B2B loan operations application that demonstrates end-to-end Java full-stack engineering, secure REST API design, relational data modeling, business workflows, testing, and frontend integration.

## 2. Delivery approach
Build a modular monolith first. Complete one vertical feature at a time: database model, backend API, tests, and frontend screen. Avoid microservices in the MVP.

## 3. Suggested 6-week plan

| Week | Focus | Deliverables |
|---|---|---|
| 1 | Foundation | Repository structure, Spring Boot setup, MySQL connection, React/Vite setup, base layout |
| 2 | Identity and customers | Login, roles, backend authorization, user management, customer CRUD |
| 3 | Products and applications | Loan product CRUD, application creation/list/detail, status workflow |
| 4 | Documents and loan creation | Document verification, approve/reject, simulated disbursement, loan account |
| 5 | Repayments and collections | EMI calculation, repayment schedule, payment recording, overdue follow-ups |
| 6 | Dashboard and quality | Dashboard, CSV reports, audit trail, tests, API documentation, Docker/readme polish |

## 4. Implementation sequence

### Phase 1 — Foundation
- Create the Spring Boot Maven application.
- Configure MySQL and environment-specific properties.
- Add common response/error handling and validation.
- Create React application and routing.
- Add a shared API client.

### Phase 2 — Authentication and access
- Define user and role entities.
- Hash passwords.
- Implement login and token validation.
- Enforce authorization in the backend.
- Add frontend protected routes.

### Phase 3 — Core records
- Customer CRUD and search.
- Loan product CRUD and validation.
- Application creation and filtering.

### Phase 4 — Workflow
- Document status tracking.
- Application review and decision history.
- Explicit allowed status transitions.
- Simulated disbursement and loan creation.

### Phase 5 — Repayment operations
- EMI and amortization schedule calculation.
- Generate schedule rows.
- Record payments transactionally.
- Prevent duplicate payment references.
- Calculate overdue instalments and follow-ups.

### Phase 6 — Reporting and release
- Dashboard summaries.
- CSV export.
- Audit log coverage.
- Unit and integration tests.
- Swagger/OpenAPI documentation.
- Docker setup and final README.

## 5. Definition of done
A feature is complete when:
- Backend validation and authorization are implemented.
- API behavior is documented.
- Database changes are persisted correctly.
- Success and error cases are handled.
- Relevant tests pass.
- The frontend supports the intended user workflow.
- No secrets or real personal/financial data are committed.

## 6. Git workflow
Use small, descriptive commits, for example:
- `chore: initialize spring boot backend`
- `feat: add customer management APIs`
- `feat: implement loan application workflow`
- `test: cover repayment calculations`
- `docs: update API specification`

## 7. Risks and mitigations
- Financial rounding errors: use `BigDecimal`, define scale and rounding policy, and test edge cases.
- Invalid workflow transitions: enforce state transitions in service methods.
- Duplicate payments: enforce unique references and transactional processing.
- Frontend-only security: always enforce authorization on API endpoints.
- Scope growth: keep real integrations and automated credit decisions out of the MVP.
