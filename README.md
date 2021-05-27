# Loaner

Loaner is web application to store all the loans of a user.

## Assumptions

The following points have been assumed while craeting Loaner:

- A user can have multiple loans.
- A user will input correct information about the loan.
- A loan will be fixed and immutable once added.

## Limitations

Loaner has the following limitations:

- Loaner cannot differentiate between a fake and a real user. It only marks user unique by their email id.
- Loaner cannot determine the authenticity of the Loan information provided.
- A user cannot connect multiple email addresses together.
- Loaner does not have alternate way to sign in/ sign up.
- The web application is not scalable yet.
- Since, it is assumed that a loan cannot be changed, hence their is no option to edit a loan.

## Getting Started

- Replicate `.env` from `.env.example`.
- Run `npm install` to install dependencies.
- Run `npm start` the project on [localhost:3000](http://localhost:3000).

- Run `npm run test` to run tests.
