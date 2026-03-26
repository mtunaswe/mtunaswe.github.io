export interface WorkItem {
  title: string;
  summary: string;
  technologies: string[];
  link: string;
}

export const workData: WorkItem[] = [
  {
    title: 'AI-Based Mental Health Text Classification',
    summary:
      'Co-authored a comparative research study benchmarking a hybrid NLP pipeline with KNIME and Python on 51,000 text samples. Achieved 83.6% accuracy by fine-tuning a BERT transformer to detect specific mental health conditions.',
    technologies: ['Python', 'KNIME', 'BERT', 'NLP', 'Research'],
    link: 'https://github.com/mtunaswe/mental-health-text-classification',
  },
  {
    title: 'Pedestrian Action Prediction for Autonomous Driving',
    summary:
      'Co-authored a comparative study on pedestrian crossing intent prediction by designing and benchmarking three modular computer-vision pipelines with detection, tracking, and intention prediction models for autonomous agents.',
    technologies: ['Computer Vision', 'Object Detection', 'Tracking', 'Autonomous Systems'],
    link: 'https://drive.google.com/file/d/1B8PXJQEiGoKYq82fyQQIm3ldQUt-YSFE/view',
  },
  {
    title: '3D Isometric City Builder',
    summary:
      'Engineered a custom isometric camera controller with smooth panning, rotation, and dynamic zoom for strategy gameplay. Applied OOP principles and built autonomous vehicle navigation plus a dynamic UI tooltip system for real-time feedback.',
    technologies: ['Unity', 'C#', 'OOP', 'Game Systems', 'UI'],
    link: 'https://github.com/mtunaswe/Eco-Architect-s-City-Builder',
  },
  {
    title: 'Java Tower Defense Game',
    summary:
      'Led development of a top-ranked tower defense game in a collaborative Agile environment, delivering advanced mechanics and robust software architecture in Java.',
    technologies: ['Java', 'Agile', 'Game Architecture', 'Team Leadership'],
    link: 'https://github.com/mtunaswe/Tower-Defense-Game',
  },
  {
    title: 'UNO Card Game Simulation',
    summary:
      'Engineered a full digital UNO adaptation as a solo project, using advanced Object-Oriented Programming principles for clean gameplay logic and maintainable systems.',
    technologies: ['Java', 'OOP', 'Game Logic', 'Software Design'],
    link: 'https://github.com/mtunaswe/UNO-PROJECT',
  },
  {
    title: '5-Axis 3D Printer Prototype',
    summary:
      'Designed and prototyped a functional 5-axis printer over a two-semester capstone, integrating hardware mechanics with embedded software to execute complex motion paths.',
    technologies: ['Embedded Systems', 'Mechatronics', 'Prototyping', 'Control Systems'],
    link: 'https://github.com/mtunaswe/5axisPrinter',
  },
];
