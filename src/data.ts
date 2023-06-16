export interface Mean {
  ipa: string;
  defs: Word[];
}

export interface Word {
  type: number;
  en: string[];
  vi: string[];
}

export const words2: Mean = {
  ipa: 'asdasda',
  defs: [
    {
      type: 1,
      vi: [
        'sự thử nghiệm; cuộc thử nghiệm',
        '(khẩu ngữ) như test match',
        'Sự thử thách',
        'Sự sát hạch, sự kiểm tra, sự trắc nghiệm; bài kiểm tra, bài trắc nghiệm',
      ],
      en: [
        'A challenge, trial.',
        'A cupel or cupelling hearth in which precious metals are melted for trial and refinement.',
        'A contest between two or more parties, often with an uncertain outcome.',
        "A difficult situation that tests a person's endurance or forbearance.",
        'A set of questions or exercises evaluating skill or knowledge.',
        'A set of questions or exercises evaluating skill or knowledge.',
        'A set of questions or exercises evaluating skill or knowledge.',
      ],
    },
    {
      type: 2,
      vi: [
        'thử nghiệm',
        'kiểm tra',
        'thử thách',
        'sát hạch, khảo sát (hiểu biết, năng lực của ai về một lĩnh vực nhất định)',
      ],
      en: [
        'To challenge.',
        'To refine (gold, silver, etc.) in a test or cupel; to subject to cupellation.',
        'To administer a test, or a standardized series of tests.',
        'To place a product or piece of equipment under everyday and/or extreme conditions, and examine it for defects or durability.',
      ],
    },
    {
      type: 3,
      vi: [
        'thử nghiệm',
        'kiểm tra',
        'thử thách',
        'sát hạch, khảo sát (hiểu biết, năng lực của ai về một lĩnh vực nhất định)',
      ],
      en: [
        'To challenge.',
        'To refine (gold, silver, etc.) in a test or cupel; to subject to cupellation.',
        'To administer a test, or a standardized series of tests.',
        'To place a product or piece of equipment under everyday and/or extreme conditions, and examine it for defects or durability.',
      ],
    },
    {
      type: 4,
      vi: [
        'sự thử nghiệm; cuộc thử nghiệm',
        '(khẩu ngữ) như test match',
        'Sự thử thách',
        'Sự sát hạch, sự kiểm tra, sự trắc nghiệm; bài kiểm tra, bài trắc nghiệm',
      ],
      en: [
        'A challenge, trial.',
        'A cupel or cupelling hearth in which precious metals are melted for trial and refinement.',
        'A contest between two or more parties, often with an uncertain outcome.',
        "A difficult situation that tests a person's endurance or forbearance.",
        'A set of questions or exercises evaluating skill or knowledge.',
        'A set of questions or exercises evaluating skill or knowledge.',
        'A set of questions or exercises evaluating skill or knowledge.',
      ],
    },
  ],
};

export const examples = [
  {
    en: 'Hello, how are you today?',
    vi: 'Xin chào, bạn khỏe không?',
  },
  {
    en: 'I am fine, thank you.',
    vi: 'Tôi khỏe, cảm ơn bạn.',
  },
  {
    en: 'What is your name?',
    vi: 'Bạn tên là gì?',
  },
  {
    en: 'My name is John.',
    vi: 'Tôi tên là John.',
  },
  {
    en: 'Hello, how are you today?',
    vi: 'Xin chào, bạn khỏe không?',
  },
  {
    en: 'I am fine, thank you.',
    vi: 'Tôi khỏe, cảm ơn bạn.',
  },
  {
    en: 'What is your name?',
    vi: 'Bạn tên là gì?',
  },
  {
    en: 'My name is John.',
    vi: 'Tôi tên là John.',
  },
  {
    en: 'My name is John.',
    vi: 'Tôi tên là John.',
  },
  {
    en: 'My name is John.',
    vi: 'Tôi tên là John.',
  },
];

export const synonyms = [
  'test',
  'match',
  'trial',
  'examination',
  'experiment',
  'assessment',
  'evaluation',
  'investigation',
  'inspection',
  'check',
  'testing',
  'trial',
  'experiment',
  'examination',
  'evaluation',
  'assessment',
  'appraisal',
  'investigation',
  'inspection',
  'analysis',
  'study',
];

export const word_family = [
  'test (n) Bài kiểm tra',
  'test (v) Kiểm tra',
  'tester (n) Người kiểm tra',
  'testable (adj) Có thể kiểm tra được',
  'testability (n) Khả năng kiểm tra',
  'test case (n) Trường hợp kiểm tra',
  'test drive (n) Cuộc thử xe',
  'test drive (v) Thử xe',
  'testee (n) Người được kiểm tra',
  'test match (n) Trận đấu thử',
];
