export interface ExperienceItem {
  role: string;
  year: string;
  company: string;
  description: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    role: 'Team Member & Avionics Consultant',
    year: 'Aug 2024 - Present',
    company: 'Koc University Association of Space and Rocketry (KUASAR) - Istanbul, Sariyer',
    description: [
      'Contributed to two custom PCBs for the rocket flight computer for Teknofest and IREC.',
      'Supported development of the ground station UI for real-time telemetry and mission visualization.',
      'Continuing in KUASAR through avionics consulting support for system design and integration decisions.',
    ],
    technologies: ['PCB Design', 'Altium Designer', 'Telemetry UI', 'Avionics'],
  },
  {
    role: 'Intern',
    year: 'June 2024 - July 2024',
    company: 'Roketsan Hardware Design Department - Ankara, Lalahan',
    description: [
      'Researched laser distance sensing technologies and tested OPT3101 evaluation hardware.',
      'Reverse engineered OPT3101 module behavior and designed a constrained custom PCB in Altium.',
    ],
    technologies: ['OPT3101', 'Altium Designer', 'Hardware Research', 'PCB Prototyping'],
  },
  {
    role: 'Teknofest Efficiency Challenge Team Member',
    year: 'Dec 2023 - July 2024',
    company: 'Koc University Renewable Energy Community (KUREC) - Istanbul, Sariyer',
    description: [
      'Worked in a multidisciplinary team on Hydromobile systems for Teknofest Efficiency Challenge.',
      'Designed motor driver, telemetry, and VCU components while advancing PCB design workflow.',
    ],
    technologies: ['Motor Driver', 'VCU', 'Telemetry', 'Altium Designer'],
  },
  {
    role: 'Undergraduate Researcher',
    year: 'Oct 2023 - Jan 2024',
    company: 'Koc University Optical Microsystems Laboratory (OML) - Istanbul, Sariyer',
    description: [
      'Applied MATLAB Lidar Toolbox for preprocessing, visualization, and analysis of lidar data.',
      'Developed and tested 2D and 3D SLAM pipelines with focus on object detection in point clouds.',
    ],
    technologies: ['MATLAB', 'Lidar Toolbox', '2D/3D SLAM', 'Point Cloud Detection'],
  },
  {
    role: 'Koc University Activities',
    year: 'Oct 2023 - Aug 2025',
    company: 'Koc University - Istanbul, Sariyer',
    description: [
      'Served as mentor, tutor, and section leader across physics and engineering support programs as a work & study student.',
      'Joined KUDANS as a dancer for swing dance performances while maintaining academic excellence.',
      'Rowing, Sailing, Music.'
    ],
    technologies: ['Mentorship', 'Tutoring', 'Academic Support', 'Swing Dance'],
  },
];
