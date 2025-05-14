## API
Add routes for

- [x] equipment
- [x] exercises
- [x] muscle groups
- [x] routines (list, individual, create)
- [ ] workouts (list, individual, create)

- [x] Add rest time into exercise set schemas
- [ ] Get/add previous weight to routine exercise

Write about testing drizzle with D1 db by creating local sqlite db and mocking

## APP

- [x] need to add @ aliases
- [x] need to make auth client url more dynamic
- [x] login/logout
- [x] add toast component and trigger on form validation
- [x] navbar
      = [x] Fix Safari issues - cookies _need_ to be same-site
- [x] helper for generating metadata
- [ ] dynamic metadata titles (e.g. exercises)
- [ ] 404 page
- [ ] start calling apis in routes
    - [ ] exercises (list, individual)
    - [ ] equipment
    - [ ] muscle groups
    - [ ] routines (~~list~~, ~~individual~~, create, edit)
    - [ ] workouts
- [ ] add service worker

## Tech debt

- [ ] Tailwind?
- [ ] Replace JSDOM with vitest browser mode
- [ ] Add comment to PRs with preview links
- [ ] Update workers deployment to use built in secret handling rather than prescript. This is needed for now as it does not support the commend with wrangler v4.
