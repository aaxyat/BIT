export interface TopicItem {
  slug: string;
  title: string;
  lectureNumber: number;
  duration: string;
  description: string;
  published: boolean;
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
    units: [
      {
        id: 'unit-01',
        number: 1,
        title: 'Java Basics & OOP Foundations',
        topics: [
          {
            slug: 'oop-foundations',
            title: 'JVM Architecture, Class Loading & OOP Principles',
            lectureNumber: 1,
            duration: '60 min',
            description: 'Bytecode execution, memory management in JVM, class declarations, and object instantiation.',
            published: false,
          },
          {
            slug: 'constructors-and-static',
            title: 'Constructors, Method Overloading & Static Bindings',
            lectureNumber: 2,
            duration: '60 min',
            description: 'Constructor chaining, this keyword, static fields, and class-level memory allocation.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-02',
        number: 2,
        title: 'Inheritance, Polymorphism & Interfaces',
        topics: [
          {
            slug: 'inheritance-and-interfaces',
            title: 'Dynamic Method Dispatch & Interface Contracts',
            lectureNumber: 3,
            duration: '60 min',
            description: 'Method overriding, super references, abstract classes, and multiple interface inheritance.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-03',
        number: 3,
        title: 'Exception Handling & I/O Streams',
        topics: [
          {
            slug: 'exceptions-and-streams',
            title: 'Exception Call Stacks & Byte/Character I/O Streams',
            lectureNumber: 4,
            duration: '60 min',
            description: 'Try-catch-finally control flow, custom exceptions, file input/output streams, and serialization.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-04',
        number: 4,
        title: 'Collections Framework & Generics',
        topics: [
          {
            slug: 'collections-framework',
            title: 'Java Collections: Lists, Sets, Maps & Generic Types',
            lectureNumber: 5,
            duration: '60 min',
            description: 'ArrayList vs LinkedList, HashMap internals, hashing contracts, and type-safe generics.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-05',
        number: 5,
        title: 'Multithreading & Concurrency',
        topics: [
          {
            slug: 'multithreading-concurrency',
            title: 'Thread Lifecycle, Synchronization & Thread Pools',
            lectureNumber: 6,
            duration: '60 min',
            description: 'Thread states, synchronized blocks, wait/notify monitor locks, and ExecutorService pools.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-06',
        number: 6,
        title: 'Database Connectivity (JDBC)',
        topics: [
          {
            slug: 'jdbc-database-access',
            title: 'JDBC Architecture, PreparedStatements & Transactions',
            lectureNumber: 7,
            duration: '60 min',
            description: 'Connection management, SQL injection prevention with PreparedStatement, and ACID transaction commits.',
            published: false,
          },
        ],
      },
    ],
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
    units: [
      {
        id: 'unit-01',
        number: 1,
        title: 'IoT Fundamentals & System Architecture',
        topics: [
          {
            slug: 'iot-architecture',
            title: 'Physical Design, Logical Design & Sensing Layers',
            lectureNumber: 1,
            duration: '60 min',
            description: 'Edge nodes, gateway tiers, communication models, and telemetry data flow architectures.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-02',
        number: 2,
        title: 'Hardware Platforms & Sensors',
        topics: [
          {
            slug: 'hardware-and-actuators',
            title: 'Microcontrollers (ESP32/RPi), ADC & Actuator Control',
            lectureNumber: 2,
            duration: '60 min',
            description: 'GPIO pinout, analog-to-digital conversion, sensor calibration, and relay switching.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-03',
        number: 3,
        title: 'IoT Communication Protocols',
        topics: [
          {
            slug: 'mqtt-coap-protocols',
            title: 'MQTT Broker Architecture, QoS Levels & CoAP REST Model',
            lectureNumber: 3,
            duration: '60 min',
            description: 'Publish-subscribe topologies, packet headers, QoS 0/1/2 guarantees, and UDP constrained REST.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-04',
        number: 4,
        title: 'Wireless Connectivity & Sensor Networks',
        topics: [
          {
            slug: 'wireless-sensor-networks',
            title: 'LoRaWAN, 6LoWPAN, BLE Mesh & Zigbee Topologies',
            lectureNumber: 4,
            duration: '60 min',
            description: 'Low-power wide-area networking, IPv6 header compression, and star/mesh topologies.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-05',
        number: 5,
        title: 'Edge Computing & Cloud IoT',
        topics: [
          {
            slug: 'edge-computing-cloud',
            title: 'Edge Data Filtering, Time-Series Ingestion & Analytics',
            lectureNumber: 5,
            duration: '60 min',
            description: 'Local stream processing, cloud IoT gateways, time-series storage, and automated alerting.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-06',
        number: 6,
        title: 'IoT Security & Privacy',
        topics: [
          {
            slug: 'iot-security-mechanisms',
            title: 'Device Authentication, TLS for Constrained Devices & Over-the-Air (OTA)',
            lectureNumber: 6,
            duration: '60 min',
            description: 'Hardware root of trust, encrypted firmware updates, and botnet mitigation.',
            published: false,
          },
        ],
      },
    ],
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
    units: [
      {
        id: 'unit-01',
        number: 1,
        title: 'Digital Commerce Business Models',
        topics: [
          {
            slug: 'ecommerce-business-models',
            title: 'E-Commerce Taxonomies (B2B, B2C, Marketplace, D2C)',
            lectureNumber: 1,
            duration: '60 min',
            description: 'Value proposition, revenue models, market structure, and platform network effects.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-02',
        number: 2,
        title: 'E-Commerce Infrastructure & Web Architecture',
        topics: [
          {
            slug: 'ecommerce-web-architecture',
            title: 'Catalog Management, Shopping Cart State & Headless Commerce',
            lectureNumber: 2,
            duration: '60 min',
            description: 'Session state management, inventory synchronization, API-first architecture, and caching strategies.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-03',
        number: 3,
        title: 'Electronic Payment Systems',
        topics: [
          {
            slug: 'payment-systems-gateways',
            title: 'Payment Gateway Integration, Tokenization & Settlement',
            lectureNumber: 3,
            duration: '60 min',
            description: 'Credit card transaction lifecycle, merchant accounts, PCI-DSS compliance, and digital wallets.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-04',
        number: 4,
        title: 'E-Commerce Security & Fraud Prevention',
        topics: [
          {
            slug: 'ecommerce-security-fraud',
            title: 'TLS Certificates, 3D Secure Verification & Fraud Scoring',
            lectureNumber: 4,
            duration: '60 min',
            description: 'Encryption in transit, chargeback mitigation, behavioral risk scoring, and customer data protection.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-05',
        number: 5,
        title: 'Digital Marketing & Conversion Optimization',
        topics: [
          {
            slug: 'digital-marketing-analytics',
            title: 'Customer Acquisition Funnel, SEO & Cart Abandonment Recovery',
            lectureNumber: 5,
            duration: '60 min',
            description: 'Search engine optimization, attribution modeling, retargeting mechanisms, and checkout optimization.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-06',
        number: 6,
        title: 'Supply Chain & Order Fulfillment',
        topics: [
          {
            slug: 'supply-chain-logistics',
            title: 'Order Management Systems (OMS), Warehouse Routing & Last-Mile Logistics',
            lectureNumber: 6,
            duration: '60 min',
            description: 'Inventory tracking, third-party logistics (3PL) integration, and reverse logistics returns.',
            published: false,
          },
        ],
      },
    ],
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
        title: 'Distributed Systems & Communication',
        topics: [
          {
            slug: 'distributed-architectures-rpc',
            title: 'System Models, Remote Procedure Calls (gRPC) & Message Brokers',
            lectureNumber: 1,
            duration: '60 min',
            description: 'Client-server vs peer-to-peer topologies, interface definition languages, and binary wire protocols.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-02',
        number: 2,
        title: 'Time Synchronization & Logical Clocks',
        topics: [
          {
            slug: 'logical-clocks-ordering',
            title: 'Lamport Timestamps, Vector Clocks & Total Order Broadcast',
            lectureNumber: 2,
            duration: '60 min',
            description: 'Causality violation prevention, happened-before relations, and physical NTP clock drift bounds.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-03',
        number: 3,
        title: 'State Partitioning & Consistent Hashing',
        topics: [
          {
            slug: 'consistent-hashing-partitioning',
            title: 'Hash Ring Topology, Virtual Nodes & Successor Routing',
            lectureNumber: 3,
            duration: '60 min',
            description: 'Modulo hashing failure modes, ring key distribution, virtual node allocations, and Cassandra/Dynamo state routing.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-04',
        number: 4,
        title: 'Distributed Consensus & Fault Tolerance',
        topics: [
          {
            slug: 'consensus-raft-paxos',
            title: 'The Raft Consensus Algorithm & Leader Election Lifecycle',
            lectureNumber: 4,
            duration: '60 min',
            description: 'Log replication invariants, term increments, split-vote mitigation, and quorum state machines.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-05',
        number: 5,
        title: 'Cloud Service Models & Virtualization',
        topics: [
          {
            slug: 'cloud-models-virtualization',
            title: 'IaaS vs PaaS vs Serverless, Hypervisors & Container Namespaces',
            lectureNumber: 5,
            duration: '60 min',
            description: 'Type-1 vs Type-2 hypervisors, Linux cgroups/namespaces, container orchestration, and multi-tenancy.',
            published: false,
          },
        ],
      },
      {
        id: 'unit-06',
        number: 6,
        title: 'Distributed Storage & Cloud Native Systems',
        topics: [
          {
            slug: 'cloud-storage-nosql',
            title: 'Object Stores (S3), Distributed File Systems & NoSQL Data Models',
            lectureNumber: 6,
            duration: '60 min',
            description: 'GFS/HDFS master-chunk architecture, write-ahead logs, SSTables/LSM-trees, and eventual consistency.',
            published: false,
          },
        ],
      },
    ],
  },
];
