import type { IconType } from 'react-icons';
import {
  FaPython,
  FaJava,
  FaC,
  FaHashtag,
  FaCalculator,
  FaMicrochip,
  FaBrain,
  FaEye,
  FaRobot,
  FaDatabase,
  FaPlug,
  FaFlask,
  FaCubes,
  FaVial,
  FaSitemap,
  FaCodeBranch,
  FaWaveSquare,
  FaToolbox,
  FaGithub,
  FaImage,
  FaCode,
} from 'react-icons/fa6';
import {
  SiPytorch,
  SiNumpy,
  SiKnime,
  SiArduino,
  SiRaspberrypi,
  SiUnity,
  SiGit,
} from 'react-icons/si';

export interface SkillItem {
  title: string;
  icon: IconType;
  color: string;
}

export interface SkillCategory {
  title: string;
  data: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    data: [
      { title: 'Python', icon: FaPython, color: '#3776ab' },
      { title: 'Java', icon: FaJava, color: '#f89820' },
      { title: 'C', icon: FaC, color: '#a8b9cc' },
      { title: 'C#', icon: FaHashtag, color: '#9333ea' },
      { title: 'MATLAB', icon: FaCalculator, color: '#f59e0b' },
      { title: 'Assembly', icon: FaMicrochip, color: '#94a3b8' },
    ],
  },
  {
    title: 'AI / ML',
    data: [
      { title: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
      { title: 'NumPy', icon: SiNumpy, color: '#4d77cf' },
      { title: 'Deep Learning', icon: FaBrain, color: '#3b82f6' },
      { title: 'Object Detection', icon: FaEye, color: '#22d3ee' },
      { title: 'Agentic AI', icon: FaRobot, color: '#818cf8' },
      { title: 'RAG', icon: FaDatabase, color: '#60a5fa' },
      { title: 'MCP tools', icon: FaPlug, color: '#a78bfa' },
      { title: 'eval', icon: FaFlask, color: '#14b8a6' },
      { title: 'KNIME', icon: SiKnime, color: '#f97316' },
    ],
  },
  {
    title: 'Software Engineering',
    data: [
      { title: 'OOP', icon: FaCubes, color: '#3b82f6' },
      { title: 'Unit Testing', icon: FaVial, color: '#22c55e' },
      { title: 'Design Patterns', icon: FaSitemap, color: '#60a5fa' },
      { title: 'Functional Programming', icon: FaCodeBranch, color: '#e879f9' },
    ],
  },
  {
    title: 'Hardware & Robotics',
    data: [
      { title: 'Altium Designer (PCB Design)', icon: FaMicrochip, color: '#f59e0b' },
      { title: 'Spice Simulation', icon: FaWaveSquare, color: '#38bdf8' },
      { title: 'Arduino', icon: SiArduino, color: '#00979d' },
      { title: 'Raspberry Pi', icon: SiRaspberrypi, color: '#be185d' },
      { title: 'Robotics Prototyping', icon: FaToolbox, color: '#cbd5e1' },
    ],
  },
  {
    title: 'Tools & Creative',
    data: [
      { title: 'Unity', icon: SiUnity, color: '#e2e8f0' },
      { title: 'Git/GitHub', icon: FaGithub, color: '#e2e8f0' },
      { title: 'Git', icon: SiGit, color: '#f05032' },
      { title: 'VS Code', icon: FaCode, color: '#3b82f6' },
      { title: 'Photoshop', icon: FaImage, color: '#31a8ff' },
    ],
  },
];
