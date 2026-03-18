# WBCom AI

## Current State
Admin panel shows customer support messages with delete option only. There is no way for admin to reply. CustomerCasePage has no section to show admin replies.

## Requested Changes (Diff)

### Add
- Backend: `replyToCustomerMessage(id, replyText)` function for admin
- Backend: `getMyCustomerMessages()` function for users to fetch their own messages with replies
- `adminReply` optional field in `CustomerMessage` type
- AdminPage: inline reply input + send button per message row
- CustomerCasePage: "My Messages" section showing user's sent messages and admin replies

### Modify
- `CustomerMessage` type to include `adminReply: ?Text`
- AdminPage table to show reply input
- CustomerCasePage to show replies

### Remove
- Nothing

## Implementation Plan
1. Update `CustomerMessage` type with `adminReply: ?Text`
2. Add `replyToCustomerMessage` shared function (admin only)
3. Add `getMyCustomerMessages` query function (user sees own messages)
4. Update AdminPage with reply UI per message
5. Update CustomerCasePage with "My Replies" section
