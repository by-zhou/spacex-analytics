# SpaceX Analytics

This single page application shows some insights of past and upcoming SpaceX flights.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#framework-and-folder-structure">Framework and Folder Structure</a>
    </li>
    <li>
      <a href="#available-scripts">Available Scripts</a>
    </li>
  </ol>
</details>

## Framework and Folder Structure
This project is built with React and written in TypeScript.
This app adopts clean architecture to divide modules into three layers: presentation layer, domain layer and data layer.
These modules are hence distributed to folders according to their layers and organized as follows. 

    .
    ├── build                   # Compiled files
    ├── public                  # Static public files (index.html and assets)
    ├── src                     # Source files
    │   ├── containers          # React components used in the presentation layer
    │   │   ├── __tests__       # Unit tests for the React components
    │   │   └── testing         # Test utilities for components
    │   ├── domain              # All modules in the domain layer
    │   │   ├── entities        # Domain models and repository interfaces
    │   │   └── usecases        # Use cases to process domain entities with business logic
    │   └── intrastructure      # Repository implementation in data layer
    └── README.md

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
