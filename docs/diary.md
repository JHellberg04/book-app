
## 📖 Group 11 – Project Diary

**Project:** *Peach Pages – Bookshelf Review*
**Slogan:** *"Review the shelf, not just the story."*

A daily log of progress, task division, design and code decisions during development.

---

### 📅 2025-05-07 – Kickoff & Task Assignment

* Assigned core responsibilities:

  * **Auth & Users** → Therese
  * **Books** → Jonatan
  * **Reviews** → Alexandra

* Alexandra and Jonatan created and connected a MongoDB database for the backend (`books-api`).

* Therese initialized the GitHub repository and invited collaborators.

---

### 📅 2025-05-08 – Client Setup & Visual Identity

* Alexandra and Jonatan finalized the `book-api` backend, including **endpoints** and **MongoDB structure**.
* Therese focused on client and design direction:

  * Created **logotype**, **brand identity**, and **slogan**
  * Designed **login** and **register** views in Figma
  * Initialized `books-client` using **Vue 3**, **TypeScript**, and **SCSS**
  * Set up SCSS structure with folders: `abstracts`, `base`, `layout`, `themes`
  * Added reusable mixins/functions and media queries for responsiveness
  * Configured `vite.config.ts` for **global SCSS injection** and **alias resolution**

_The SCSS structure and utility setup are suggested defaults and open for discussion and adjustment in the group._

---


Självklart! Här är en mer komplett och engelskspråkig version, anpassad för en gruppdagbok:

---

### 📅 2025-05-09 – Component Setup & Page Responsibilities

* We divided the main client pages according to the project requirements.

* Therese began by building the first atomic components: **BaseInput** and **BaseButton**.

* She is responsible for the shared layout and user-related pages:

  * **Landing page**, **Header**, **Navigation/Menu**
  * **Login** and **Register** views
  * **User dashboard ("My Pages")** in the admin panel

* Jonatan and Alexandra are continuing to build their respective feature areas:

  * **Books** Jonatan: book list, individual book pages, and admin views:
    * Built the public book list view displaying all available books
    * Implemented navigation from the list to each book’s detail page
    * Created a form for adding new books with all required MongoDB fields

  * **Reviews** Alexandra: review functionality and integration with books:
    * Built review creation and listing features linked to individual books
    * Developed a shared book detail view showing book info and its reviews
    * Created a reusable StarRating.vue component for 1–5 star selection
    * Integrated the rating component into both the form and review display
    * Connected review data dynamically via API for real-time updates



> We'll update the task division as designs are finalized and implementation progresses.

**Plan** : upload db exports and try setup on monday may 12th, 2025
---

### 📅 2025-05-14 – Final Refinements & Deployment Setup

* Jonatan implemented the admin panel for books:
  * Created a password-protected admin view for managing books
  * Displayed all books in a table format
  * Built a form to create new books, covering all MongoDB fields
  * Exported and imported sample book data to the database for testing

* Therese is finalizing the admin panel for users:
  * Completed login functionality for both users and admin
  * Created a password-protected admin view to manage users
  * Displays all users in a table format.