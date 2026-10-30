# LoanSphere — Loan Operations & Repayment Management Platform

LoanSphere is a portfolio full-stack B2B web application for a lending organization's internal teams. It centralizes customer records, loan applications, document verification, approval workflows, loan records, repayment schedules, payment entries, overdue follow-ups, and operational reporting.

## Project scope
- Internal operations platform for lending-company staff.
- Role-based access for Administrator, Loan Officer, and Finance Officer; a Customer role may be supported for limited self-service views.
- Simulated disbursement and payment records only. No real money movement, banking integration, or credit-bureau integration.
- Decisions are made by authorized staff. The MVP does not automate credit decisions.

## Technology
- Frontend: React, Vite, JavaScript, React Router, Axios, Material UI.
- Backend: Java 17+, Spring Boot, Spring Web, Spring Data JPA, Spring Security, Jakarta Validation.
- Database: MySQL.
- Testing: JUnit 5, Mockito, Postman; Swagger/OpenAPI for API documentation.

## Repository layout
- `docs/` — requirements, plan, architecture, and API specification.
- `backend/` — Spring Boot REST API.
- `frontend/` — React application.
- `database/` — SQL scripts and synthetic sample data.
- `postman/` — API collection.

## Getting started
See `docs/PROJECT_PLAN.md` for the implementation sequence and `docs/ARCHITECTURE.md` for the technical design. Configure local database credentials outside version control before running the backend.
