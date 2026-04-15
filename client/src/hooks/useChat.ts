/**
 * useChat Hook - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Manages chat state and message history
 * - Implements keyword-matching knowledge base
 * - Simulates typing delay with isTyping state
 * - Provides quick action suggestions
 */

import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

export interface QuickAction {
  label: string;
  query: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Tell me about Sembcorp', query: 'sembcorp' },
  { label: 'View Projects', query: 'projects' },
  { label: 'Tech Skills', query: 'skills' },
  { label: 'Background', query: 'background' },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  // Sembcorp / Internship
  sembcorp:
    'I worked as a Digitization Analyst Intern at Sembcorp Solar Singapore (Oct 2020 - Jun 2021). My key achievements include leading a company-wide CRM rollout, managing stakeholder training sessions (10+ participants per session), and performing comprehensive QA for the SolarNova 3 platform. This role taught me how to bridge physical operations with digital systems.',

  internship:
    'My internship at Sembcorp Solar Singapore was instrumental in shaping my career. I led the CRM implementation, trained stakeholders, and optimized digital workflows for the solar operations team. It reinforced my passion for building software that solves real-world problems.',

  // Projects
  projects:
    'I have three major projects: SilverLink SG (React, Docker, gRPC, Tailwind, PostgreSQL) - a cloud-native microservices platform for seniors and volunteers; Singapore Cancer Society App (React, TypeScript, NodeJS) - an interactive storytelling platform with localized themes; and GreenLoopFarms (2023) - which won a SGD $10,000 NYP JumpStart Grant.',

  silverlink:
    'SilverLink SG is a production-ready cloud-native microservices platform designed for seniors and volunteers. Built with React, Docker, gRPC, Tailwind, and PostgreSQL, it enables seamless coordination and resource management with modern web technologies.',

  'cancer society':
    'The Singapore Cancer Society App is an interactive storytelling platform featuring localized Singaporean themes and pixel art elements. Built with React, TypeScript, and NodeJS, it provides engaging educational content with cultural relevance.',

  greenloop:
    'GreenLoopFarms is a sustainable agricultural initiative where I co-developed the business strategy and financial planning. The project secured a SGD $10,000 NYP JumpStart Grant in 2023, demonstrating the viability of our approach to sustainable operations.',

  // Skills
  skills:
    'My technical stack includes: Languages (Java, Python, C++, TypeScript), Frontend (ReactJS, NextJS, Tailwind CSS), Backend & DevOps (NodeJS, Docker, Kubernetes, AWS), and Databases (PostgreSQL, SQL, MongoDB).',

  languages: 'I code in Java, Python, C++, and TypeScript. Each language serves different purposes in my development workflow.',

  frontend: 'For frontend development, I specialize in ReactJS, NextJS, and Tailwind CSS. I focus on building responsive, performant interfaces.',

  backend: 'On the backend, I work with NodeJS, Docker, Kubernetes, and AWS. I have experience building scalable microservices and managing cloud infrastructure.',

  databases: 'I work with PostgreSQL, SQL, and MongoDB. I understand both relational and document-based database paradigms.',

  // Education & Background
  background:
    'I am a Computing Science student with a foundational background in Electrical Engineering. This unique combination allows me to bridge physical operations with digital systems. My journey started with hands-on technical deployments, like managing logistics for 40MWp+ solar PV systems.',

  education:
    'I am currently pursuing Computing Science. My background in Electrical Engineering gives me a unique perspective on hardware-software integration.',

  electrical:
    'My Electrical Engineering background started with hands-on technical deployments, including managing logistics for 40MWp+ solar PV systems. This physical-first perspective drives my passion for software engineering.',

  // General
  hello: 'Hello! I am the digital construct of John Aaron Mendoza Branzuela. Feel free to ask me about my experience, projects, or skills!',

  hi: 'Hello! I am the digital construct of John Aaron Mendoza Branzuela. Feel free to ask me about my experience, projects, or skills!',

  help: 'I can tell you about my experience at Sembcorp, my projects (SilverLink, Cancer Society App, GreenLoopFarms), my technical skills, or my background in Computing Science and Electrical Engineering. What would you like to know?',
};

const FALLBACK_RESPONSE =
  'Command not recognized. I\'m still compiling that data. You can ask me about my [Projects], [Experience], [Skills], or [Background] instead!';

function matchKeywords(userInput: string): string {
  const lowerInput = userInput.toLowerCase().trim();

  // Direct keyword match
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }

  // Fallback response
  return FALLBACK_RESPONSE;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "System initialized. I'm the digital construct of John Aaron Mendoza Branzuela—a Computing Science student bridging physical operations with digital systems. Ask me about my experience, projects, or skills!",
      sender: 'system',
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback(
    (text: string, sender: 'user' | 'system') => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    []
  );

  const sendMessage = useCallback(
    (userInput: string) => {
      if (!userInput.trim()) return;

      // Add user message
      addMessage(userInput, 'user');

      // Simulate typing delay
      setIsTyping(true);
      setTimeout(() => {
        const botResponse = matchKeywords(userInput);
        addMessage(botResponse, 'system');
        setIsTyping(false);
      }, 1500); // 1.5 second delay to show thinking state
    },
    [addMessage]
  );

  return {
    messages,
    isTyping,
    sendMessage,
    quickActions: QUICK_ACTIONS,
  };
}
