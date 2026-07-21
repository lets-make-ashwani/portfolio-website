'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';

const skillGroups = [
  {
    label: 'Languages',
    emoji: '🗣️',
    color: '#3b82f6',
    skills: [
      { name: 'Python', level: 85, note: 'My first love — scripts, bots, automation' },
      { name: 'JavaScript', level: 80, note: 'React, Node.js, browser APIs' },
      { name: 'TypeScript', level: 65, note: 'Learning fast — used in Vitta Nipun' },
      { name: 'SQL', level: 70, note: 'MySQL — joins, queries, schemas' },
      { name: 'HTML/CSS', level: 90, note: 'The foundation — semantic & responsive' },
    ],
  },
  {
    label: 'Frontend',
    emoji: '🎨',
    color: '#a855f7',
    skills: [
      { name: 'React', level: 80, note: 'Hooks, context, routing, SPA' },
      { name: 'Next.js', level: 75, note: 'App router, SSR, metadata, SEO' },
      { name: 'CSS/Flexbox', level: 88, note: 'Animations, grid, responsive design' },
      { name: 'Framer Motion', level: 60, note: 'Used in this portfolio!' },
    ],
  },
  {
    label: 'Backend',
    emoji: '⚙️',
    color: '#22c55e',
    skills: [
      { name: 'Django', level: 70, note: 'ORM, auth, REST APIs' },
      { name: 'Node.js', level: 65, note: 'Express, basic REST services' },
      { name: 'MySQL', level: 70, note: 'Relational DB design' },
      { name: 'REST APIs', level: 78, note: 'Design, consume, test' },
    ],
  },
  {
    label: 'Tools & Platforms',
    emoji: '🛠️',
    color: '#f59e0b',
    skills: [
      { name: 'Git & GitHub', level: 82, note: 'Version control, open-source' },
      { name: 'Vercel', level: 80, note: 'All live projects deployed here' },
      { name: 'VS Code', level: 90, note: 'My daily driver' },
      { name: 'Telegram API', level: 75, note: 'Built multiple bots' },
      { name: 'Linux', level: 65, note: 'Command line comfort' },
    ],
  },
];

const currently = [
  'Deep-diving into TypeScript generics',
  'Exploring Next.js 15 app router',
  'Building REST APIs with Django REST Framework',
  'Learning Docker for containerization',
  'Reading: Clean Code by Robert C. Martin',
];

const cubeSkills = [
  { name: 'Python', level: 85, color: '#3b82f6', note: 'My core language — used for automation scripts, scrapers, and Telegram bots' },
  { name: 'React', level: 80, color: '#a855f7', note: 'Modern UI library — building reusable states, hooks, and responsive frontends' },
  { name: 'Django', level: 70, color: '#22c55e', note: 'Python backend framework — designing secure schemas, ORMs, and REST APIs' },
  { name: 'JavaScript', level: 80, color: '#f59e0b', note: 'Interactive web experiences — client-side rendering and async browser APIs' },
  { name: 'TypeScript', level: 65, color: '#06b6d4', note: 'Type-safe programming — scaling components with interfaces and generics' },
  { name: 'SQL', level: 70, color: '#ec4899', note: 'Relational databases — writing efficient queries, indices, and database joins' },
  { name: 'Node.js', level: 65, color: '#10b981', note: 'Server-side javascript runtime — building microservices and REST endpoints' },
  { name: 'Git/GitHub', level: 82, color: '#6366f1', note: 'Version control — managing branches, pull requests, and open-source contributions' },
  { name: 'Telegram API', level: 75, color: '#14b8a6', note: 'Automated chatbots — integration with webhooks, message polling, and commands' },
  { name: 'Docker', level: 40, color: '#2496ed', note: 'Containerization — learning to package apps into portable Docker containers' },
  { name: 'Next.js', level: 75, color: '#e2e8f0', note: 'Full-stack React — exploring the App Router, SSR, and edge functions' },
  { name: 'Vercel', level: 80, color: '#8b8b8b', note: 'Deployment platform — all my live projects are shipped and hosted here' },
  { name: 'CSS/Flexbox', level: 88, color: '#a78bfa', note: 'Layouts & animations — grid, flexbox, custom properties, and keyframes' },
  { name: 'Framer Motion', level: 60, color: '#e0176c', note: 'UI animation library — powering all the transitions in this portfolio' },
  { name: 'Linux', level: 65, color: '#fcc624', note: 'Command-line comfort — shell scripts, file management, and SSH workflows' },
  { name: 'MySQL', level: 70, color: '#00758f', note: 'Open-source RDBMS — designing schemas, relations, and optimised queries' },
  { name: 'REST APIs', level: 78, color: '#ff6b35', note: 'API design & consumption — building, testing, and integrating REST services' },
  { name: 'Vite', level: 75, color: '#bd34fe', note: 'Lightning-fast build tool — HMR, ESM bundling, and modern dev tooling' },
  { name: 'HTML', level: 90, color: '#e34f26', note: 'Semantic markup foundation — accessible, well-structured, standards-based HTML5' },
  { name: 'VS Code', level: 90, color: '#007acc', note: 'My daily driver — extensions, debugger, integrated terminal, and Git workflow' },
  { name: 'Express.js', level: 62, color: '#68a063', note: 'Minimal Node.js framework — REST endpoints, middleware chains, and routing' },
  { name: 'MongoDB', level: 50, color: '#47a248', note: 'NoSQL document store — schema-less collections, aggregations, and Atlas cloud' },
  { name: 'Postman', level: 72, color: '#ef5b25', note: 'API testing & debugging — collections, environments, and automated test runs' },
  { name: 'Figma', level: 55, color: '#f24e1e', note: 'UI design & prototyping — wireframes, components, and developer handoff' },
  { name: 'npm', level: 80, color: '#cb3837', note: 'Package ecosystem — managing dependencies, scripts, and publishing modules' },
  { name: 'Redux', level: 45, color: '#764abc', note: 'State management — actions, reducers, and centralised store for React apps' },
  { name: 'Sass', level: 58, color: '#cc6699', note: 'CSS preprocessor — variables, mixins, nesting, and modular stylesheets' },
];

function getSkillIcon(name: string) {
  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M14.25.18c-.9 0-1.66.72-1.66 1.62v2.7h-3.3c-1.34 0-2.5 1.16-2.5 2.5v2.23H3.56c-.9 0-1.62.76-1.62 1.66v6.58c0 .8.8 1.6 1.6 1.6h2.17v-3.18c0-1.34 1.16-2.5 2.5-2.5h3.23V9.26c0-1.34 1.16-2.5 2.5-2.5h3.33c.9 0 1.62-.76 1.62-1.66V1.8c0-.8-.8-1.62-1.6-1.62H14.25zm-4.5 23.64c.9 0 1.66-.72 1.66-1.62v-2.7h3.3c1.34 0 2.5-1.16 2.5-2.5v-2.23h3.23c.9 0 1.62-.76 1.62-1.66V6.53c0-.8-.8-1.6-1.6-1.6h-2.17v3.18c0 1.34-1.16 2.5-2.5 2.5H12.6v3.23c0 1.34-1.16 2.5-2.5 2.5H6.77c-.9 0-1.62.76-1.62 1.66v3.33c0 .8.8 1.62 1.6 1.62h6.58zM9.75 3.4a.68.68 0 1 1 0 1.36.68.68 0 0 1 0-1.36zm4.5 15.84a.68.68 0 1 1 0 1.36.68.68 0 0 1 0-1.36z"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="skills-cube-icon">
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'Django':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M11.19 2.12v9.64h-3.4c-1.83 0-3.39.73-3.39 2.92v2.79c0 2.19 1.48 2.92 3.39 2.92h3.4v1.5h1.61V2.12h-1.61zm-1.61 16.66H7.95c-1.02 0-1.78-.32-1.78-1.42v-2.79c0-1.1.76-1.42 1.78-1.42h1.63v5.63z" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 3h18v18H3V3zm10.7 13.6c0 1.2-.8 2-2 2-1 0-1.7-.5-2.1-1.2l1.2-.7c.3.5.5.7.9.7.4 0 .6-.2.6-.5V11h1.4v5.6zm4.2 0c0 1.2-.8 2-2 2-1.1 0-1.8-.6-2.2-1.3l1.2-.7c.2.4.5.7.9.7.3 0 .5-.2.5-.5 0-.3-.2-.5-.8-.7l-.5-.2c-1.1-.4-1.6-.9-1.6-1.8 0-1 .8-1.8 1.9-1.8.9 0 1.6.4 2 1.1l-1.2.7c-.2-.4-.5-.5-.7-.5-.3 0-.5.2-.5.4 0 .3.2.4.8.7l.5.2c1.2.4 1.7 1 1.7 1.8z" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 3h18v18H3V3zm8.2 8H7v1.4h1.4v5.2h1.4v-5.2H11.2V11zm6.1 4.6c0-.8-.5-1.3-1.6-1.5l-.5-.2c-.6-.2-.8-.4-.8-.7 0-.3.2-.5.6-.5.4 0 .7.2.9.6l1.2-.7c-.4-.7-1.1-1.1-2.1-1.1-1.1 0-1.9.8-1.9 1.8 0 .8.5 1.3 1.6 1.5l.5.2c.6.2.8.4.8.7 0 .3-.2.5-.6.5-.4 0-.8-.2-1-.7l-1.2.7c.4.8 1.2 1.2 2.2 1.2 1.2 0 2-1 2-2z" />
        </svg>
      );
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="skills-cube-icon">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M12 1L3 6v12l9 5 9-5V6L12 1zm7.5 16.15l-7.5 4.15-7.5-4.15V7.85l7.5-4.15 7.5 4.15v9.3z" />
        </svg>
      );
    case 'Git/GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skills-cube-icon">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
        </svg>
      );
    case 'Telegram API':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.2-.02-.08.02-1.3 1.02-3.66 2.61-.34.24-.65.35-.93.34-.31 0-.91-.17-1.36-.32-.55-.18-.99-.28-.95-.58.02-.16.24-.32.66-.49 2.58-1.12 4.31-1.86 5.17-2.21 2.47-.99 2.98-1.16 3.31-1.17.07 0 .23.02.34.1.09.07.12.17.13.27 0 .06-.01.2-.02.27z"/>
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M13.5 9H15V7.5h-1.5V9zm-3 0H12V7.5h-1.5V9zm-3 0H9V7.5H7.5V9zM12 6h1.5V4.5H12V6zm-3 0H10.5V4.5H9V6zm9.9 3.45c-.37-.26-.97-.37-1.45-.31-.06-.51-.3-1-.72-1.37l-.24-.22-.25.21c-.3.26-.58.7-.67 1.12-.08.4 0 .8.19 1.13-.28.14-.57.2-.88.2H2.1l-.05.3c-.1.62-.1 2.54 1.14 3.88.94 1.02 2.38 1.54 4.26 1.54 4.04 0 7.03-1.83 8.44-5.16.55.01 1.75.02 2.37-1.12l.12-.21-.39-.22zM4.5 10.5H6V12H4.5v-1.5zm3 0H9V12H7.5v-1.5zm3 0H12V12h-1.5v-1.5zm3 0H15V12h-1.5v-1.5z"/>
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z"/>
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
        </svg>
      );
    case 'CSS/Flexbox':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M1.5 0l1.77 19.9L12 22.5l8.73-2.6L22.5 0zm18.4 5H5.2l.3 3.4h11.6l-.7 7.1-4.4 1.2-4.4-1.2-.3-3.3H10l.1 1.8 1.9.5 1.9-.5.2-2.3H6.7l-.6-7z"/>
        </svg>
      );
    case 'Framer Motion':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
        </svg>
      );
    case 'Linux':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M20.581 19.049c-.55-.446-.336-1.589-.159-2.411.108-.501.22-1.01.22-1.496 0-1.119-.568-2.087-1.952-2.733C18.604 10.855 18 9.524 18 8c0-3.313-2.686-6-6-6S6 4.687 6 8c0 1.524-.604 2.855-.69 4.409-1.384.646-1.952 1.614-1.952 2.733 0 .486.112.995.22 1.496.177.822.391 1.965-.159 2.411C2.97 19.7 2 20.5 2 22h20c0-1.5-.97-2.3-1.419-2.951z"/>
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.246.274l.066.06v-.014c.055-.02.115-.045.14-.1a.33.33 0 0 0-.192-.266zM5.001 1C2.239 1 0 3.24 0 6.001v11.998C0 20.761 2.239 23 5.001 23h13.998C21.761 23 24 20.761 24 18.001V6.001A5.001 5.001 0 0 0 18.999 1H5.001zm11.698 14.293c-1.208 0-2.047-.66-2.047-1.596 0-.963.861-1.606 2.047-1.606.558 0 1.052.131 1.453.359v-.86c0-.617-.417-.969-1.146-.969-.52 0-.981.149-1.33.38l-.358-.771c.459-.282 1.071-.462 1.726-.462 1.214 0 1.99.56 1.99 1.621v3.035c-.416.56-1.067.869-1.735.869zm-.069-2.595c-.538 0-.887.283-.887.7 0 .412.349.7.887.7.419 0 .779-.162 1.029-.434v-.534c-.257-.271-.617-.432-1.029-.432zm-3.956 2.486l-1.965-6.19H9.34l1.93 6.19h1.404zm-5.85-6.19L8.73 14.95h1.329l1.884-5.956H10.61zm1.883-.618L10.19 3.03H8.787L8.186 6.376h2.521z"/>
        </svg>
      );
    case 'REST APIs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skills-cube-icon">
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/>
          <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>
        </svg>
      );
    case 'Vite':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M13.397.396L.823 12.185l11.14 1.736-8.608 9.683 19.652-12.26-11.378-1.818L13.397.396z"/>
        </svg>
      );
    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M1.5 0l1.77 19.9L12 22.5l8.73-2.6L22.5 0zm14.7 6.9H7.9l.2 2.4h7.9l-.6 6.6-3.4 1-3.4-1-.2-2.6H10l.1 1.4 1.9.5 1.9-.5.2-2.1H7.3l-.5-6.2H17l-.8 1z"/>
        </svg>
      );
    case 'VS Code':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.846V4.154a1.5 1.5 0 0 0-.85-1.567zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
        </svg>
      );
    case 'Express.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 10.7l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.013-.448-.013-.894-.013-1.826zm1.12-.228h9.084c-.034-1.938-.752-3.485-2.475-4.297-2.056-.95-4.86-.3-6.209 1.164a5.055 5.055 0 0 0-.4 3.133z"/>
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      );
    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.858.858 0 1 0-1.21-1.21l-4.452 4.453-.308-.307 4.453-4.453a2.395 2.395 0 0 1 3.061 3.217zm-4.863 8.347l-3.44-3.44 5.937-5.937 3.44 3.44zm-4.588-2.996l3.439 3.439-1.515.552-2.476-2.477zm7.003 2.056l-1.289 1.289c-2.756 2.756-7.259 2.756-10.015 0-2.756-2.757-2.756-7.26 0-10.016l1.289-1.289 1.629 1.629-1.29 1.29a5.25 5.25 0 0 0 7.427 7.427l1.29-1.29 1.63 1.63z"/>
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019S6.507 22.529 8.172 22.529c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02zm7.703.019h-.005c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.005c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.005c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.024-3.019z"/>
        </svg>
      );
    case 'npm':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
        </svg>
      );
    case 'Redux':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.043.479.214.894.479 1.193-1.013 1.999-2.548 3.469-4.864 4.699-1.565.84-3.196 1.148-4.83.914-1.349-.194-2.397-.81-3.045-1.829-.959-1.524-1.047-3.167-.24-4.809.586-1.192 1.522-2.086 2.134-2.548a9.765 9.765 0 0 1-.338-1.692c-2.957 2.134-2.635 5.007-1.809 6.336C3.418 20.43 5.032 21.504 6.818 21.504c.545 0 1.091-.075 1.632-.224 3.513-.71 6.185-2.878 8.184-4.776zm5.092-7.777c-2.04-2.384-5.048-3.707-8.498-3.707h-.438C12.395 4.15 11.484 3 10.185 3c-.844 0-1.618.524-1.952 1.314-.25.589-.193 1.199.154 1.709.316.464.81.764 1.34.838.05.007.099.01.149.01.49 0 .974-.198 1.324-.551a1.69 1.69 0 0 0 .484-1.184c-.007-.067-.016-.132-.028-.197h.238c2.883 0 5.534 1.066 7.46 3.008 1.47 1.49 2.252 3.368 2.24 5.374 0 1.53-.495 3.087-1.426 4.393-.708.997-1.947 2.19-3.786 2.948.334.381.56.83.645 1.327 1.97-.84 3.382-2.177 4.253-3.43 1.177-1.698 1.803-3.63 1.8-5.549-.008-2.63-.83-4.997-2.5-6.985z"/>
        </svg>
      );
    case 'Sass':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.437 15.835c-.54.137-1.002.052-1.36-.22-.288-.218-.436-.534-.448-.94a3.81 3.81 0 0 1 .016-.433c.07-.558.332-1.135.594-1.613l.027.009a4.58 4.58 0 0 0 .19.31c.14.194.297.357.468.476.171.12.352.179.516.165.207-.018.39-.131.523-.31.156-.207.213-.49.174-.804-.039-.314-.152-.603-.337-.851-.315-.42-.822-.637-1.43-.608-.665.031-1.241.337-1.626.863-.417.573-.463 1.301-.46 1.747.001.113.006.226.017.336.047.456.17.87.376 1.239.207.37.505.674.886.896.38.22.818.325 1.3.31.538-.018.992-.188 1.284-.484.107-.109.187-.24.237-.389l-.747-.198zm.896-3.765c-.33.427-.65.705-.85.735a.22.22 0 0 1-.033.003c-.146 0-.255-.1-.28-.255a1.02 1.02 0 0 1-.012-.177c.004-.175.048-.363.132-.573.1-.254.253-.51.455-.773.203-.266.448-.502.716-.68.268-.18.556-.29.838-.322.281-.033.55.006.783.108.23.1.416.257.54.454.125.197.18.42.162.648-.007.089-.026.176-.057.257-.055.141-.152.256-.282.332-.16.092-.346.13-.55.11-.238-.022-.445-.12-.605-.28-.12-.12-.196-.27-.218-.437z"/>
        </svg>
      );
    default:
      return null;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<typeof cubeSkills[0] | null>(null);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container skills-page">
        <Breadcrumbs items={[{ name: 'Home', item: '/' }, { name: 'Skills', item: '/skills' }]} />

        {/* 3D Hero Layout */}
        <div className="skills-hero-layout">
          <motion.div className="skills-hero-left" variants={fadeUp} initial="hidden" animate="show">
            <header className="skills-header" style={{ marginBottom: 0 }}>
              <p className="section-label">Skills</p>
              <h1 className="section-title">What I work with</h1>
              <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
                A snapshot of my current tech stack. Hover or tap the interactive 3D grid to inspect my core technologies and tools.
              </p>
            </header>

            {/* Glowing Skill Details Card */}
            <div className="skills-cube-info">
              <AnimatePresence mode="wait">
                {hoveredSkill ? (
                  <motion.div
                    key={hoveredSkill.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="skills-cube-card"
                    style={{ borderColor: `${hoveredSkill.color}40` }}
                  >
                    <span
                      className="skills-cube-card__dot"
                      style={{ backgroundColor: hoveredSkill.color, boxShadow: `0 0 12px ${hoveredSkill.color}` }}
                    />
                    <div className="skills-cube-card__content">
                      <h4>{hoveredSkill.name}</h4>
                      <p className="skills-cube-card__note" style={{ marginTop: '4px' }}>{hoveredSkill.note}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="skills-cube-placeholder"
                  >
                    <span className="glow-dot" style={{ background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)' }} />
                    <p className="muted" style={{ fontSize: '0.82rem' }}>
                      Hover or tap the blocks on the 3D grid to inspect skills
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interactive 3D Cube Grid */}
          <motion.div
            className="skills-cube-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="skills-cube-grid">
              {[0, 1, 2].map((cubeIdx) => (
                <div key={cubeIdx} className="skills-cube" style={{ zIndex: cubeIdx === 1 ? 1 : cubeIdx === 0 ? 2 : 3 }}>
                  {[-1, 0, 1].map((xVal) => (
                    <div key={xVal} style={{ '--x': xVal, '--y': 0 } as React.CSSProperties}>
                      {[3, 2, 1].map((iVal) => {
                        const skillIndex = (3 - iVal) * 9 + cubeIdx * 3 + (xVal + 1);
                        const skill = cubeSkills[skillIndex] || null;
                        const hoverColor = skill ? skill.color : 'var(--blue)';

                        return (
                          <span
                            key={iVal}
                            className={hoveredSkill?.name === skill?.name ? 'active' : ''}
                            style={{
                              '--i': iVal,
                              '--hover-color': hoverColor,
                            } as React.CSSProperties}
                            onMouseEnter={() => {
                              if (skill) setHoveredSkill(skill);
                            }}
                            onMouseLeave={() => {
                              if (skill) setHoveredSkill(null);
                            }}
                            onClick={() => {
                              if (skill) {
                                setHoveredSkill(hoveredSkill?.name === skill.name ? null : skill);
                              }
                            }}
                          >
                            <div className="face face--top">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                            <div className="face face--left">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                            <div className="face face--right">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill Groups */}
        <div className="skills-grid" aria-label="Skills categories">
          {skillGroups.map((group, gi) => (
            <motion.article
              key={group.label}
              className="skill-group card"
              custom={gi * 0.2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="skill-group__header">
                <span className="skill-group__emoji" aria-hidden="true">{group.emoji}</span>
                <h2 className="skill-group__label">{group.label}</h2>
              </div>
              <div className="skill-group__list">
                {group.skills.map((s, si) => (
                  <div key={s.name} className="skill-item">
                    <div className="skill-item__top">
                      <span className="skill-item__name">{s.name}</span>
                    </div>
                    <p className="skill-item__note">{s.note}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <hr className="sep" />

        {/* Currently Learning */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} aria-labelledby="learning-title">
          <p className="section-label">Currently Learning</p>
          <h2 id="learning-title" className="section-title" style={{ marginBottom: '32px' }}>What's next on my radar</h2>
          <div className="skills-learning">
            {currently.map((item, i) => (
              <motion.article
                key={i}
                className="skills-learning__item card"
                custom={i * 0.1}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -3, borderColor: 'var(--blue)' }}
              >
                <span className="blue mono" style={{ fontSize: '0.75rem' }}>0{i + 1}</span>
                <span>{item}</span>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
