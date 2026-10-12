---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines
This document provides guidelines for fetching data in the project. It covers best practices, recommended libraries, and common patterns to ensure efficient and maintainable data fetching.

## 1. Use server components for data fetching

In next.js, ALWAYS using server components for data fetching. NEVER use client components for data fetching.

## 2. Data fetching methods

ALWAYS use the helper functions provided in the /data directory for data fetching. NEVER fetch data directly in the components. 

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.

