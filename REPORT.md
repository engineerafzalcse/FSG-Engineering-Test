# WorkTrack Assessment Report

**Candidate:** Md. Afzal Hossen

**Repository:** https://github.com/engineerafzalcse/FSG-Engineering-Test

---

# Part 1

## Current Status

Due to the available assessment time, I focused on understanding the existing project architecture and investigating the data flow before implementing larger feature changes.

During my investigation I reviewed:

- Project form submission
- React Query mutations
- Query invalidation
- Mock in-memory data service
- Project listing
- Pagination
- Client and Server Component interaction

I also investigated the project creation lifecycle and verified that project records are added correctly into the in-memory data source.

---

# Part 2

## Investigation Summary

During the review I identified several areas that require additional investigation and improvement.

### 1. Project List Synchronization

**Priority:** Medium

After project mutations, the project table may not immediately reflect the expected state depending on pagination and query synchronization.

Recommendation:

- Improve query invalidation.
- Review table refresh behavior.
- Review pagination state after mutations.

---

### 2. Mock Data Persistence

**Priority:** Medium

The application intentionally uses an in-memory data service.

Records are reset whenever the development server restarts.

This is acceptable for the assessment but would require persistent storage in production.

---

### 3. Default Project Ordering

**Priority:** Low

Newly created projects may not appear on the first page depending on the current pagination and sorting state.

Recommendation:

Provide a consistent default ordering (for example newest first) while still respecting user-selected sorting.

---

# Remaining Work

Given additional time I would complete:

- Saved Views feature
- Local Storage persistence
- URL synchronization
- Automated tests
- Accessibility review
- Additional hidden issue investigation

---

# Notes

Rather than introducing architectural changes that I could not fully validate within the available time, I chose to understand the existing architecture and document my findings.

I believe this approach provides a more reliable foundation for future improvements.