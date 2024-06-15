export default async function handler(req: Request): Promise<Response> {
                const resumeJSON = {
  "basics": {
    "name": "James Thomas Seeley",
    "email": "hello@tseeley.com",
    "url": "tseeley.com",
    "location": {
      "city": "",
      "countryCode": "",
      "region": ""
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "",
        "url": ""
      },
      {
        "network": "LinkedIn",
        "username": "",
        "url": ""
      }
    ]
  },
  "work": [
    {
      "name": "Wando",
      "position": "Web Developer",
      "startDate": "2022",
      "endDate": "present",
      "summary": "Crafted an event management platform, created an interactive public website, developed a responsive and accessibility-focused website for a law firm."
    },
    {
      "name": "Mindpool",
      "position": "Business Strategy Intern",
      "startDate": "2022",
      "endDate": "2022",
      "summary": "Built a category defining, business to business growth strategy focused on ESG."
    }
  ],
  "volunteer": [],
  "education": [
    {
      "institution": "Tickle College of Engineering - University of Tennessee, Knoxville",
      "area": "Computer Science",
      "studyType": "Master",
      "startDate": "",
      "endDate": "2025"
    },
    {
      "institution": "Haslam College of Business - University of Tennessee, Knoxville",
      "area": "Business Administration",
      "studyType": "Bachelor",
      "startDate": "",
      "endDate": "2023"
    },
    {
      "institution": "Danish Institute for Study Abroad",
      "area": "Innovation and Entrepreneurship in Europe",
      "studyType": "",
      "startDate": "",
      "endDate": "2022"
    }
  ],
  "awards": [],
  "certificates": [
    {
      "name": "BootDev, JavaScript, Python, Algorithms",
      "date": "2023",
      "issuer": "",
      "url": ""
    },
    {
      "name": "SuperHi, Foundation, HTML, CSS + Javascript",
      "date": "2022",
      "issuer": "",
      "url": ""
    }
  ],
  "publications": [],
  "skills": [
    {
      "name": "Web Development",
      "level": "",
      "keywords": [
        "HTML5",
        "CSS",
        "Tailwind CSS",
        "React",
        "Next.js",
        "Vite"
      ]
    },
    {
      "name": "Programming",
      "level": "",
      "keywords": [
        "JavaScript",
        "TypeScript",
        "Python",
        "Go"
      ]
    },
    {
      "name": "Tools & Software",
      "level": "",
      "keywords": [
        "Git",
        "Docker",
        "Figma",
        "Adobe Suite",
        "Excel"
      ]
    }
  ],
  "languages": [],
  "interests": [],
  "references": [],
  "projects": [
    {
      "name": "wando-ui",
      "startDate": "",
      "endDate": "",
      "description": "Component collection and CLI application written in TypeScript",
      "highlights": [],
      "url": "https://github.com/iamseeley/wando-ui"
    },
    {
      "name": "go-forth",
      "startDate": "",
      "endDate": "",
      "description": "Static site generator written in Go",
      "highlights": [],
      "url": "https://github.com/iamseeley/go-forth2.0"
    },
    {
      "name": "Food Truck",
      "startDate": "",
      "endDate": "",
      "description": "Event management platform with secure authentication and full CRUD capabilities.",
      "highlights": [],
      "url": ""
    },
    {
      "name": "Law Firm",
      "startDate": "",
      "endDate": "",
      "description": "Responsive and accessibility-focused website for a law firm.",
      "highlights": [],
      "url": ""
    }
  ]
};
                const resume = JSON.stringify(resumeJSON);
                return new Response(resume, { headers: { "Content-Type": "application/json" } });
            }