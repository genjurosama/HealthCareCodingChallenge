# Health Care Coding Challenge

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Patient Note Management](#patient-note-management)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Health Care Coding Challenge is a web application designed to allow healthcare professionals to securely log patient notes. It provides user authentication, data storage, and basic CRUD (Create, Read, Update, Delete) operations for managing patient notes.

## Features

1. **User Authentication**
   - Sign Up: Healthcare professionals can create a new account.
   - Login: Authenticated users can log in to their accounts.
   - Logout: Users can securely log out of their accounts.

2. **Patient Note Management**
   - Create: Authenticated healthcare professionals can create patient notes.
   - View: Users can view a list of patient notes.
   - Update: Users can edit and update existing patient notes.
   - Delete: Users can delete patient notes.

3. **User Interface Aligned with Healthcare Practices**
   - The application provides separate views for patient note creation, listing, editing, and user authentication.

4. **AWS Amplify for Healthcare Context**
   - User authentication and API interactions are configured using AWS Amplify.

## Technologies

- React.js: JavaScript library for building user interfaces.
- AWS Amplify: For authentication and API integration.
- React Router: For handling navigation within the application.
- CSS/SCSS: For styling the user interface.
- Jest and React Testing Library: For unit and integration testing.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Node.js: [Download and install Node.js](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:

   cd health-care-coding-challenge


3. install the dependencies:

   npm install

4. run the app:

   npm start

