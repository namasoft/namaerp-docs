---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Security & Permissions
description: "Landing page for security: the overview, Security Profiles, field, page and list view security, record-level security by dimensions and filters, and users and login."
---

# Security & Permissions

Every ERP deployment runs into the same questions sooner or later: who can log in, who can see customer balances, and why does a Jeddah rep see Riyadh invoices? Nama answers all of these with a layered security model — authentication, type-level permissions, record-level visibility, and fine-grained field and page control. Start with the overview to see how the pieces fit, then dive into the page that matches what you need to lock down.

## Securing Your System

<LandingGrid>
  <LandingCard icon="🧭" title="Security System Overview" link="/platform/security/security-overview.md" details="The big picture — the chain of doors a user passes through, and how Security Profiles and User records work together." />
  <LandingCard icon="🪪" title="Security Profile" link="/platform/security/security-profiles.md" details="The reusable role template where most permissions live: standard lines, full authority, and per-type rules." />
  <LandingCard icon="🔒" title="Field, Page, and List View Security" link="/platform/security/field-page-listview-security.md" details="Finer control — hide a column, lock a tab, or block a list view, on either the profile or the user." />
  <LandingCard icon="🎯" title="Record-Level Security (Dimensions and Filters)" link="/platform/security/record-level-security.md" details="Decide which records a user sees through Dimensions, creator-only restrictions, and extra filters." />
  <LandingCard icon="👤" title="Users and Login" link="/platform/security/users-and-login.md" details="Create users and manage passwords, LDAP, two-factor authentication, sessions, and per-user permission overrides." />
  <LandingCard icon="🤝" title="Temporary Additional Permissions (Delegation)" link="/platform/security/security-delegation.md" details="Hand a stand-in someone else's permissions for a bounded period that expires on its own." />
  <LandingCard icon="🖐️" title="User Fingerprints" link="/platform/security/user-fingerprints.md" details="The server-side record of each user's fingerprints for POS fingerprint login: where it comes from and how to remove a fingerprint." />
</LandingGrid>
