# Oystr CodeTest

## Tested with:

-   NodeJS v16.3.0
-   npm v7.15.1

## Steps to set-up the project:

1. Install the npm packages with: **npm install**.

2. Make sure to change the **WEBHOOK** key on the .env file to a valid one.

3. Run the project with: **node ./src/main.js**


## Testing

- The __tests.py__ have some basic tests to simulate the notification messages and some possible errors.


## Question

Which HTTP response code is most suitable for this endpoint in case of a valid payload? Why?
- A: 200. It could be 201 but since the webhook and the application itself does not allocate any resource(permanent) for the request, 200 is the correct one to tell the user that the request was completed succesfully.
