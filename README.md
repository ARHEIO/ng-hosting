# NgauHosting

This project was used for the talk "Where to stick it", a talk given at the Melbourne Angular Meetup, on January 29th 2019 at Australia Post

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## The App

The app itself has two components which are used as pages for the router outlet. One page has two form boxes the user can input, the other triggers a download from an S3 bucket.

The single service in the app is used to communicate with a nonexistent server, and download a stock certificate from an S3 bucket. It is little more than a skeleton that we can deploy.

## Branches

###master

The master branch deploys to **Github Pages**. The requirements for a Github pages deploy is:

- the following command: `ng build --prod --output-path docs --base-href /ngau-hosting/`
- Duplicating `index.html` and renaming it to `404.html`
- Pushing to **master**, and turning on Github paes in the repo settings (and setting it to mnaster/docs)

[https://arheio.github.io/ngau-hosting/]()

###gitlab-pages

The master branch deploys to **Gitlub Pages**. The requirements for a Github pages deploy is a single file, `.gitlab-ci.yml`

```
image: node:10.13.0 									# the docker image to use

# Deploy
pages:
  script:
    - npm install -g @angular/cli
    - npm install
    - ng build --prod --base-href /ngau-hosting/
    - mkdir public 										# we make the deployment directory
    - mv dist/ngau-hosting/* public 					# to prevent a permissions error
  artifacts:
    paths:
      - public
  only:
    - gitlab-pages 										# the branch name
```

As long as runners have been turned on in the Gitlab repo, it will automatically deploy to [https://arheio.gitlab.io/ngau-hosting/]()

###firebase

The master branch deploys to **Firebase**. The requirements for a Firebase deployment is running the command `firebase deploy` which we run through the gitlab task runner

```
image: node:10.13.0

production:
  cache:
    paths:
    - node_modules/

  stage: deploy
  script:
    - npm install -g @angular/cli
    - npm install -g firebase-tools
    - npm install
    - npm run build
    - firebase deploy --token $FIREBASE_TOKEN
  only:
  - firebase
```

The token is an environment variable which we can generate by running `firebase login:ci`

As long as runners have been turned on in the Gitlab repo, it will automatically deploy to [https://ngau-hosting.firebaseapp.com/]()

###firebase-extendeed

The only changes between this and the firebase branch are

- Additions to the environment file
	- Add the firebase config
- The app module [https://github.com/ARHEIO/ngau-hosting/blob/firebase-extended/src/app/app.module.ts]()
	- The inclusion of AngularFireModules and initialising the firebase app with an env file
- The certificate service: [https://github.com/ARHEIO/ngau-hosting/blob/firebase-extended/src/app/pages/services/certificate.service.ts]()
	- Getting a value from a database through a standard HTTP GET request
	- Getting a value from a database through a websocket created by the AngularFire module

###netlify

All automation occurs on commit to this branch on the netlify site, and is deployed onto [https://trusting-saha-adc550.netlify.com/]()

Of note is the `functions` folder and the `hello.js` file with it here: [https://github.com/ARHEIO/ngau-hosting/blob/netlify/functions/hello.js]()

This is deployed with the app.

###netlify-extended

This is the source branch in a PR aimed at the netlify branch. As a result a deployment preview has been generated here: [https://5c494e7f839c350008039d33--trusting-saha-adc550.netlify.com/]()

The change in question is adding the S to HTTP for the certificate download.