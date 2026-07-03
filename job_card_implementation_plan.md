# Goal Description

Automatically generate and display a "Job Card ID" when a customer raises a service request. The Job Card ID will be derived from the automatically generated unique booking ID in the database and shown to the customer upon success, as well as displayed to admins and managers.

## User Review Required

> [!NOTE]
> Instead of requiring you to run SQL commands to add a new column, the system will derive the Job Card ID from the first 8 characters of the automatically generated unique booking ID (e.g., `SVC-A1B2C3D4`). This ensures guaranteed uniqueness without changing the database schema!

## Proposed Changes

### website/src/components/BookingModal.jsx
- **[MODIFY]**: Update the Supabase `insert` call to return the newly created row (`.select()`).
- **[MODIFY]**: Store the newly generated `id` in state.
- **[MODIFY]**: Update the `success` view to prominently display the generated Job Card ID to the customer so they can track their request.

### admin-portal/src/screens/AdminServiceRequests.js
- **[MODIFY]**: Update the service request card UI to prominently display the Job Card ID (e.g., `#A1B2C3D4`) next to the customer name or in the bike info section.

### manager portal/screens/manager/ManagerRequests.js
- **[MODIFY]**: Update the manager's service request board UI to display the Job Card ID on the request cards and inside the details modal.

## Verification Plan

### Manual Verification
1. Open the website, fill out the booking form, and submit it.
2. Verify that the success screen displays a Job Card ID (e.g., `#A1B2C3D4`).
3. Open the Admin Portal and Manager Portal and verify that the same Job Card ID is visible on the new booking card.
