# React Playground

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project purpose
Get my hands on React & Redux.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Structure

- `components` : contains UI components
- `contexts` : contains React Context
- `hooks` : contains React custom Hooks
- `pages` : contains app pages
- `redux` : all related stuff to Redux
    - `actions`
    - `epics`
    - `reducers`
    - `selectors`
    - NOTE: Each folder has a subfolder named `features`. This folder is dedicated to feature components (e.g. Supposing we have a `Wizard.tsx` component, then we will have a `wizard.actions.ts`, `wizard.epics.ts`, `wizard.reducer.ts`, `wizard.selectors.ts` to manage the component state with the power of Redux).
- `services` : data services
- `utils` : utils functions

## Resources

- You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).
- To learn React, check out the [React documentation](https://react.dev/).
- Learn [Redux](https://redux.js.org/)
- Interesting article about Redux Action usage [here](https://phryneas.de/redux-typescript-no-discriminating-union)
- The store page use this [fake API](https://fakestoreapi.com/docs)
- This application combine the power of Redux and [RxJS](https://rxjs.dev/) to obtains a powerful reactive app. See [Redux-Observable](https://redux-observable.js.org/)
- [Tailwindcss](https://tailwindcss.com/)
- Free premade components with [Flowbite](https://flowbite.com/docs/getting-started/introduction/) using Tailwindcss