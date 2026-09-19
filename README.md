# Aaroha

### Personalized Learning & Career Roadmap Platform

Aaroha is a personalized learning and career roadmap platform designed to help learners understand their current skills, identify gaps, and follow a structured learning path based on their existing knowledge.

Instead of starting every learner from the same point, Aaroha considers the skills a learner already knows and uses assessment results to determine where they should begin and what they need to learn next.

---

## Problem Statement

Many students have an idea about the career or domain they want to pursue, but they may not have a clear understanding of their current skill level.

Common challenges include:

* Difficulty identifying existing strengths and weaknesses
* Unclear understanding of which skills need improvement
* Generic learning paths that do not account for prior knowledge
* Learning resources being followed without a structured progression
* Lack of a clear connection between assessment results and the next learning steps

Aaroha aims to address this by connecting learner information, skill assessment, skill-gap identification, and roadmap generation into a single learning journey.

---

## Our Approach

Aaroha follows a learner-centered flow.

The platform first understands what the learner wants to pursue and what they already know. The learner then completes a domain-specific assessment. Based on the assessment results, Aaroha presents the learner's skill proficiency and identifies areas that require further development.

The resulting information is used to provide a personalized roadmap rather than forcing every learner to follow the same starting point.

---

## Current Prototype

The current prototype demonstrates the personalized learning journey for the **Web Development** domain.

### Current User Flow

```text
Login
  ↓
Start Journey
  ↓
Career / Domain Intent
  ↓
Domain Selection
  ↓
Select Existing Skills
  ↓
Skill Assessment
  ↓
Skill Proficiency & Skill Gap
  ↓
Retake Assessment / Continue
  ↓
Personalized Roadmap
```

### How It Works

1. **Login**

   The learner begins by accessing the platform through the login interface.

2. **Start Journey**

   The learner starts their personalized learning journey.

3. **Career / Domain Intent**

   The platform asks whether the learner already has an idea of what they want to become.

4. **Domain Selection**

   For the current prototype, the learner can proceed with the **Web Development** domain.

5. **Existing Skills**

   The learner selects the skills they already know.

   This allows the platform to account for prior knowledge instead of treating the learner as a complete beginner in every topic.

6. **Assessment**

   The learner completes an assessment designed for the selected domain.

7. **Skill Proficiency**

   After the assessment, the platform displays the learner's proficiency for individual skills.

   Example:

   ```text
   HTML       → Proficiency: XX%
   CSS        → Proficiency: XX%
   JavaScript → Proficiency: XX%
   ```

8. **Skill Gap**

   The assessment results are used to identify areas where the learner needs additional learning.

9. **Retake or Continue**

   The learner can either retake the assessment or continue with the roadmap.

10. **Personalized Roadmap**

    The roadmap is generated according to the learner's assessment results and identified skill gaps.

---

## Key Features

### Personalized Skill Assessment

Learners can evaluate their existing knowledge through a domain-specific assessment.

### Existing Skill Recognition

Learners can indicate skills they already know, allowing the learning journey to account for prior knowledge.

### Skill Proficiency Analysis

Assessment results are presented as skill-wise proficiency levels so learners can understand their current standing.

### Skill-Gap Identification

The platform highlights areas where the learner requires further development.

### Personalized Roadmap

The assessment results are used to provide a learning roadmap suited to the learner's current skill level.

### Assessment Retake

Learners can retake the assessment when they want to reassess their knowledge.

### Structured Learning Journey

The platform connects learner information, assessment, skill analysis, and roadmap generation into one continuous flow.

---

## Current Domain Coverage

The current prototype focuses on:

**Web Development**

The platform is designed so that additional domains can be incorporated as the project evolves.

---

## System Flow

```text
                 ┌──────────────────┐
                 │      Learner     │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │      Login       │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Start Journey  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Domain Selection │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Existing Skills  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Assessment     │
                 └────────┬─────────┘
                          │
                          ▼
             ┌──────────────────────────┐
             │ Proficiency & Skill Gap  │
             └────────────┬─────────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Personalized     │
                 │ Roadmap          │
                 └──────────────────┘
```

---

## Technology Stack

> This section should be updated with the final technologies confirmed by the development team.

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite

### APIs

* REST APIs

### AI / ML

* [To be confirmed]

### Development Tools

* Git
* GitHub
* Visual Studio Code

---

## Project Structure

The repository is organized into separate frontend and backend applications.

```text
Aaroha-2026/
│
├── client/
│   └── Frontend application
│
├── server/
│   └── Backend application
│
└── README.md
```

The exact internal structure may evolve as the prototype continues to be developed.

---

## Getting Started

### Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/thushara-bajimar/Aaroha-2026.git
```

Move into the project directory:

```bash
cd Aaroha-2026
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Start the Frontend

```bash
npm run dev
```

### Backend Setup

Open a separate terminal and navigate to the server directory:

```bash
cd server
npm install
```

Start the backend using the project's configured development command.

> **Note:** Update the exact backend start command and any environment-variable requirements here after the final project configuration is confirmed.

---

## Environment Variables

If the final implementation requires environment variables, create a `.env` file according to the project's configuration.

Example:

```env
# Add confirmed project variables here
# API_KEY=
# DATABASE_URL=
```

**Do not commit private API keys, passwords, tokens, or other secrets to GitHub.**

---

## Future Scope

The current prototype establishes the core personalized-learning workflow. The following capabilities are planned for future development:

### AI-Powered Learning Recommendations

Use AI to provide more personalized recommendations based on learner performance, interests, and progress.

### More Career Domains

Expand beyond Web Development to support additional career and technology domains.

### Advanced Adaptive Roadmaps

Allow roadmaps to dynamically change as the learner's skills and progress evolve.

### Industry Skill-Demand Integration

Connect learning recommendations with current industry skill requirements.

### Internship and Job Matching

Explore opportunities to connect learners with relevant internships and job opportunities based on their skills and learning progress.

### Institutional Analytics

Provide institutions with aggregated insights that can help them understand student learning progress and skill development.

---

## Project Status

**Current stage:** Prototype / MVP

The current prototype demonstrates the complete flow from learner onboarding and existing-skill selection through assessment, skill-gap identification, and personalized roadmap generation for Web Development.

The project is still under active development, and additional features and UI improvements are being incorporated.

---

## Team

Developed by:

* **Thushara**
* **Aditi**
* **Trisha**
* **Spoorthi**

**Institution:** Sahyadri college of Engineering and Management

---

## Demo

**Live Demo:** [To be added]

**Demo Video:** [To be added]

---

## Presentation

**Project Presentation:** [To be added]

---

## License

This project was developed as a hackathon/prototype project.

Add an appropriate open-source license here if the team decides to make the project available under one.
