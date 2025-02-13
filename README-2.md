# 🚀 Task Assist Backend

This project is a backend for **Task Assist** built with **Firebase Cloud Functions** and **Express** in TypeScript. It uses MongoDB as the data store and is designed to run seamlessly both locally (via the Firebase Emulator) and on Firebase.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/brandon-ide/Task-Assist-Backend.git)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Node.js v22](https://img.shields.io/badge/Node-v22-blue.svg)](https://nodejs.org/)  
[![Firebase](https://img.shields.io/badge/Firebase-Functions-orange.svg)](https://firebase.google.com/)

---

## 📁 Project Structure

/Task-Assist-Backend ├── .env # Environment variables (root) ├── .firebaserc # Firebase project configuration ├── firebase.json # Firebase configuration ├── README.md # This documentation ├── jest.config.js # Jest configuration for tests (optional) ├── package.json # Root-level package.json (optional) └── functions # Firebase Functions folder ├── .gitignore # Ignores node_modules, lib folder, etc. ├── package.json # Functions dependencies & scripts ├── tsconfig.json # TypeScript configuration └── src ├── index.ts # Entry point – wraps Express app as a Cloud Function ├── app.ts # Express app configuration (middlewares, routes) ├── config │ └── db.ts # MongoDB connection helper ├── models │ └── taskModel.ts # Task model interface └── routes └── taskRouter.ts # Express routes for tasks


---
```yaml
## ⚙️ Prerequisites

- **Node.js v22**  
  (as specified in `functions/package.json` → `engines`)
- **Firebase CLI**  
  Install globally with:  
  ```bash
  npm install -g firebase-tools
```

A Firebase project
(Ensure the project ID is configured in .firebaserc)


**🛠️ Setup Instructions**

**1.Clone the Repository**
```bash
git clone https://github.com/brandon-ide/Task-Assist-Backend.git
cd Task-Assist-Backend
```
**2.Install Root Dependencies (if applicable)**
(Only if you have shared dependencies or scripts in the root)
```bash
npm install
```
**3.Setup Firebase Functions**
Navigate into the functions folder and install its dependencies:

```bash
cd functions
npm install
```
**4.Configure Environment Variables**
Create or update the ```bash.env``` file in the root directory with your MongoDB URI and any other secrets:
```bash
URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/TaskAssist?retryWrites=true&w=majority
```
**5.Build the Functions**
From the ```bash functions ``` folder, compile the TypeScript files:
```bash
npm run build
```
**6.Run Locally with Firebase Emulators**
First, set your Firebase project (if you haven’t already):
```bash
firebase use --add
```
Then, start the emulator:
```bash
npm run serve
```
The emulator loads your Cloud Function (wrapped Express app) for local testing.

**7.Deploy to Firebase**
When ready, deploy your functions with:

```bash
npm run deploy
```
📚 Testing
If tests are set up, run:
```bash
npm test
```
💡 Notes
**Node Version:**
Ensure you are using Node.js v22. If not, use nvm to manage Node versions.
**Firebase Project Configuration:**
If the emulator complains about a missing project ID, run:
```bash
firebase use --add
```
**Rebuilding:**
For every change in your TypeScript files, rebuild with:
```bash
npm run build
```
📜 License
This project is licensed under the MIT License.
```pgsql

This README file includes all the details, icons, and links needed to set up, run, and deploy your project. It is formatted for clarity and ease of use. Simply copy, paste, and save as `README.md` in your project's root directory.
```
