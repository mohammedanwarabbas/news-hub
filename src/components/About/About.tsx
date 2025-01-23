/* this component represents the About page of the application.
 It provides information about the application, its purpose, and key features. */
import React from "react";
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <>
    <Helmet>
      <title>News Hub | About-us</title>
    </Helmet>
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4">About This Project</h1>
          <p className="lead">
            A case study by <strong>Mohammed Anwar</strong>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3>Project Overview</h3>
          <p>
            This project was developed as part of a case study for your company,{" "}
            <strong>Innoscripta</strong>. The goal of the project was to create
            a news aggregator website using a variety of technologies,
            incorporating data from multiple APIs to provide users with
            real-time, curated news.
          </p>
          <p>
            Technologies and tools used in the development of this project
            include:
          </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Bootstrap</li>
            <li>ReactJS</li>
            <li>React Router DOM</li>
            <li>React Helmet</li>
            <li>Axios</li>
            <li>Docker</li>
          </ul>
          <p>The project integrates data from three major news APIs:</p>
          <ul>
            <li>
              <strong>NewsAPI</strong>
            </li>
            <li>
              <strong>The Guardian API</strong>
            </li>
            <li>
              <strong>The New York Times API</strong>
            </li>
          </ul>
        </div>
        <div className="col-lg-6">
          <h3>Folder Structure</h3>
          <pre className="bg-dark text-white p-3 rounded-4">
            {`
src/
├── api/
│   └── fetchNewsData.ts
├── App.css
├── App.test.tsx
├── App.tsx
├── components/
│   ├── About/
│   │   └── About.tsx
│   ├── Layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── News/
│   │   ├── NewsCard.tsx
│   │   ├── NewsDetailModal.tsx
│   │   └── NewsFeed.tsx
│   └── Shared/
│       └── LoadingSpinner.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
└── styles/
    └── global.css
`}
          </pre>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
