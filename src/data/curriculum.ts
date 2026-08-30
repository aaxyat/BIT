export interface TopicItem {
  slug: string;
  title: string;
  lectureNumber: number;
  duration: string;
  description: string;
  path: string;
}

export interface UnitItem {
  id: string;
  number: number;
  title: string;
  topics: TopicItem[];
}

export interface CourseItem {
  code: string;
  title: string;
  semester: string;
  semesterNumber: number;
  slug: string;
  category: string;
  description: string;
  color: 'indigo' | 'cyan' | 'amber' | 'rose';
  units: UnitItem[];
}

export const COURSES: CourseItem[] = [
  {
    code: 'BIT255CO',
    title: 'Programming in Java',
    semester: 'Fourth Semester',
    semesterNumber: 4,
    slug: 'sem4/bit255co',
    category: 'Software Engineering',
    description: 'Object-oriented software development in Java, covering language mechanics, memory models, collections framework, multithreading, and database connectivity.',
    color: 'indigo',
    units: [],
  },
  {
    code: 'BIT305CO',
    title: 'Internet of Things',
    semester: 'Fifth Semester',
    semesterNumber: 5,
    slug: 'sem5/bit305co',
    category: 'Embedded & Networking',
    description: 'Hardware architectures, sensor telemetry, edge computing, wireless networking protocols (MQTT, CoAP), and cloud IoT platforms.',
    color: 'cyan',
    units: [],
  },
  {
    code: 'BIT428CO',
    title: 'Digital Commerce',
    semester: 'Seventh Semester',
    semesterNumber: 7,
    slug: 'sem7/bit428co',
    category: 'Information Systems',
    description: 'E-commerce business models, digital payment systems, web transaction infrastructure, security protocols, and supply chain logistics.',
    color: 'amber',
    units: [],
  },
  {
    code: 'BIT452CO',
    title: 'Distributed and Cloud Computing',
    semester: 'Eighth Semester',
    semesterNumber: 8,
    slug: 'sem8/bit452co',
    category: 'Systems & Cloud',
    description: 'Distributed systems architectures, logical clocks, consistent hashing, consensus algorithms (Paxos, Raft), virtualization, and cloud infrastructure.',
    color: 'rose',
    units: [
      {
        id: 'unit-01',
        number: 1,
        title: 'Introduction to Distributed & Cloud Computing',
        topics: [
          {
            slug: 'intro-distributed-cloud',
            title: 'System Goals, Hardware/Software Models, and Cloud Paradigms',
            lectureNumber: 1,
            duration: '60 min',
            description: 'Distributed systems definition, 8 forms of transparency, multiprocessors vs multicomputers, DOS vs NOS vs Middleware, NIST cloud model, and IaaS/PaaS/SaaS architectures.',
            path: '/sem8/bit452co/unit-01/intro-distributed-cloud',
          },
        ],
      },
    ],
  },
];
