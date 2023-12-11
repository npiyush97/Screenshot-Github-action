# Screenshot Github action 

## overview

This GitHub Action automates the process of taking screenshots of web pages listed in a text file whenever there is a change in the files within the frontend directory. This can be particularly useful for capturing the visual appearance of web pages and monitoring changes over time.

## Workflow
Trigger: The workflow is triggered on every git push event, but specifically focuses on changes within the frontend directory.

Action Steps:

Checkout: This step checks out the repository's code for further processing.
Setup Node.js: Sets up the required Node.js version for the project.
Install Dependencies: Installs the necessary dependencies, including any tools or libraries needed for screenshot capture.
Take Screenshots: Executes a script or command (e.g., using a headless browser) to capture screenshots of the web pages listed in a text file.
Screenshots Output: The captured screenshots can be saved in a designated directory or uploaded as artifacts for easy access and review.

Configuration
Environment Variables 

cp .env.example .env

API_PUBLIC: Public API key for accessing external services (if applicable).
API_PRIVATE: Private API key for accessing external services securely (if applicable).
API_URL: URL endpoint for external services (if applicable).

## Added links to your pages
Added links for all pages for your website in addlinksfortestpage.txt.

## Setting up Github
Go to your repository 
`'Settings' > 'environments' > 'new environment'`
Add your bucket secret in environment secrets.

## add environment in .github/workflows/onchange.yaml

`
name: PipelineGetImage

on:
  push:
    paths:
    <!-- add your frontend directory route -->
      - "frontend/**"

jobs:
  build:
    environment: ['your enivornment name here']
    runs-on: ubuntu-latest
    env:
      PUBLICKEY: ${{secrets.PUBLICKEY}}
      PRIVATEKEY: ${{secrets.PRIVATEKEY}}
      URLENDPOINT: ${{secrets.URLENDPOINT}}
    steps:
      - name: checkout
        uses: actions/checkout@v4

      - name: setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"
      - name: Install dependencies
        run: npm install

      - name: Run frontend checkout
        run: npm run pup
`
