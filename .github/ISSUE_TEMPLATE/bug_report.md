---
name: Bug report
about: Create a report to help us improve
title: Invalid paths in AppBottomNav (Creator App)
labels: bug
assignees: ''
---

**Destination:**
Creator App

**Issue:**
`AppBottomNav` contains invalid route paths.
The `/posts` path is no longer available and has been restructured as `/studio`, causing navigation to break when users interact with the bottom navigation.

**To Reproduce:**
1. Open the Creator App
2. Use the bottom navigation
3. Click on the Posts-related tab
4. Navigation fails or routes incorrectly

**Expected behavior:**
Bottom navigation should correctly route users to `/studio` instead of the deprecated `/posts` path.

**Implementation:**
- Update `appBottomNavOptions`
- Replace all `/posts` routes with `/studio`
- Verify navigation works across all bottom nav items

**Additional context:**
The `/posts` route has been fully deprecated and should no longer be referenced anywhere in the Creator App.
