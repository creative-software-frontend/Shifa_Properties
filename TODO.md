# TODO - Fix blank white screen after Navbar logo migration

- [ ] Inspect current implementation of Navbar and logo hook
- [x] Identify unsafe API response access in `useWebsiteLogo`
- [ ] Update `src/hooks/useWebsiteLogo.ts`:
  - [ ] Use optional chaining for `response.data.data.header_logo.file_path`
  - [ ] Never throw in the hook
  - [ ] Keep API logo as primary
  - [ ] Fallback to local `src/assets/image/logo.jpeg` when API fails or field is missing
- [ ] Ensure Navbar renders during loading/failure (hook returns a valid string immediately)
- [ ] Run TypeScript/build check
- [ ] Confirm the website no longer shows a blank white screen

