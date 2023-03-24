# React Debt-Free Calculator
This is a project I completed for the Devslopes Academy, and is my first-ever React project. I was tasked with building a debt-free calculator. Here's how it works:
* There are three input fields, in which the user enters the Debt Principal, the Interest Rate, & the amount they would like to pay
* Interest Owed is calculated anew with each payment made; it is calculated as follows: Current Principal * Interest Rate / 100 / 12
* Since money is being handled, the three input fields are numbers & all calculated values are rounded to two decimal places. The fields pertaining to the Debt Principal & the payment amount accept decimals to the hundredths decimal place. The Debt Principal field is set to a minimum value of 1, the Interest Rate field is set to a minimum value of 0, & the payment field is set to a minimum value of the following calculation if the Total Balance is greater than or equal to 100: (Current Principal / 100) + Interest Rate / 100 / 12. If the Total Balance is less than 100, then the minimum & maximum values are set to the Total Balance.
  * These calculations to determine the minimum & maximum value of the payment field are performed in a method, the return value of which is set in the payment field element inside render(){} return() - in other words, the appropriate method is called in the <input> like so: min={this.getMinPmt()}
  * The numbers in these calculations are based on state values, which change when the Principal & Interest Rate fields are changed, and upon submission of a payment
* At the end of the payment form, there are two buttons. One of them resets the form and, if the user hasn't made a payment yet, all state values pertaining to the Principal, Interest Rate, & Total Balance. The second button is used to submit payment, as long as all conditions are met.
* As long as the Total Balance is greater than or equal to 100, the user is obligated to pay at least the minimum as detailed above, but they may pay extra against the Principal, and this will be accounted for correctly when a payment is made. The amount of Interest the user must make in a single payment is fixed (also see calculation of Interest Owed above).
* Upon submitting a payment, the Debt Principal & Interest Rate fields are disabled, & a new minimum & a new maximum value for the payment field are set, as well as a placeholder indicating the range the user's next payment can fall in (see calculations of min & max value, depending on conditions, above).
* Also upon submitting a payment, a separate component from App.js, named PaymentHistory.jsx, is used to display a summary of the most-recent payment & updates to relevant values, including Previous Principal, Current Payment on Principal, New Principal; Previous Interest Owed, Current Interest Payment, Interest Due on Next Payment; Previous Total Balance, Total Current Payment, New Total Balance. All of these values are passed to PaymentHistory.jsx from App.js through props. Values pertaining to a single payment are placed in an object, which is part of an array containing objects with data for all payments made so far. I then mapped through this array to display the appropriate values inside of render(){} return().
* I used conditional rendering to display a button prompting the user to make another payment if the Total Balance is over 0; upon clicking this button, the page scrolls back up to the payment form. If Total Balance is 0 (debt has been fully paid off), then the message "You're Debt-Free!" displays at the bottom of the current payment's details. The payment field, as well as the Reset & Submit buttons, are disabled if Total Balance equals 0.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
