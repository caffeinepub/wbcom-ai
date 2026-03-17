# WBCom AI

## Current State
App has admin panel visibility bug: `registerUser()` function conflicts with MixinAuthorization's admin assignment via `_initializeAccessControlWithSecret`. Also has 'actor not ready' error in Customer Case and recurring white screen issue.

## Requested Changes (Diff)

### Add
- Backend `forceClaimAdmin()` function: allows the current user to claim admin if no admin exists OR if they already have the MixinAuthorization token-based admin role
- Frontend retry logic for admin check with exponential backoff
- Actor readiness wait utility

### Modify
- `registerUser()`: Check `AccessControl.hasPermission` before downgrading user to `#user` role — prevents overriding MixinAuthorization admin
- `isAdminSafe()`: Use `AccessControl.hasPermission` for consistent admin check
- `App.tsx`: Improve admin check timing with retry after actor is ready
- `CustomerCasePage.tsx`: Add actor wait/retry before submitCustomerMessage
- `useInternetIdentity.ts`: Fix re-initialization loop by tracking init state with ref

### Remove
- Nothing removed

## Implementation Plan
1. Fix backend `registerUser()` to not downgrade MixinAuthorization-assigned admins
2. Fix `isAdminSafe()` to use AccessControl.hasPermission
3. Add `forceClaimAdmin()` backend function  
4. Fix frontend App.tsx admin check with retry
5. Fix CustomerCasePage actor readiness check
6. Fix useInternetIdentity re-init loop
