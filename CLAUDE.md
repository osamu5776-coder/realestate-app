# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real estate application (`realestate-app`). As the project grows, update this file with build commands, architecture details, and development workflows.

## Git Rules

**Push to GitHub after every code change.**

Follow this workflow for all changes:

1. Stage the relevant files:
   ```
   git add <files>
   ```
2. Commit with a clear message:
   ```
   git commit -m "brief description of what changed"
   ```
3. Push to GitHub immediately:
   ```
   git push
   ```

Never leave committed changes unpushed. Each logical change (feature, fix, refactor) should result in a push to the remote repository.

If the repository has not been initialized yet:
```
git init
git remote add origin <GitHub repository URL>
git push -u origin main
```
