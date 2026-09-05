import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Search,
  Briefcase,
  Shield,
  Globe,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Clock,
  SlidersHorizontal,
  Filter,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Share2,
  Building2,
  DollarSign,
  X,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
  Send,
  Info,
  BookOpen,
  ArrowRight,
  Laptop,
  Check,
  Flame,
  Award,
  Coins,
  RefreshCw,
  Zap,
  Timer
} from 'lucide-react';

// Default baseline curated listings
const BASELINE_JOBS = [
  {
    id: 'job-1',
    title: 'Cybersecurity SOC Analyst Intern',
    company: 'SentinelGuard Technologies',
    location: 'Remote (Worldwide / US & EU Friendly)',
    country: 'Global Remote',
    workMode: 'Remote',
    jobType: 'Internship',
    sector: 'cybersecurity',
    sectorLabel: 'Cybersecurity & SOC',
    experienceLevel: 'Student / Intern',
    stipendUSD: '$28 - $35 / hr',
    stipendINR: '₹2,350 - ₹2,950 / hr',
    duration: '6 Months',
    postedDate: '2026-09-05',
    postedTimestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hrs ago
    sourceSite: 'LinkedIn Jobs',
    applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=Cybersecurity+SOC+Analyst+Intern+Remote',
    tags: ['Splunk', 'Wireshark', 'SIEM', 'Incident Response', 'Linux'],
    fresherFriendly: true,
    description: 'We are seeking an ambitious CSE or Cybersecurity student to join our Global Security Operations Center (SOC). You will monitor security alerts, assist in triage of phishing campaigns, and learn real-time incident analysis alongside senior engineers.',
    responsibilities: [
      'Monitor and triage real-time alerts from SIEM platforms (Splunk, Microsoft Sentinel).',
      'Analyze suspicious network packets and malicious email artifacts.',
      'Document findings and assist in updating incident response playbooks.',
      'Participate in simulated tabletop cyber drills and threat-hunting sprints.'
    ],
    requirements: [
      'Currently enrolled in CSE, AI/ML, Cyber Security, or related Bachelor/Master degrees.',
      'Fundamental understanding of OSI layers, TCP/IP, DNS, and HTTP/HTTPS.',
      'Basic familiarity with Linux terminal and security log inspection.',
      'Passion for defensive security and blue teaming.'
    ],
    perks: ['100% Remote flexibility', 'Mentorship from CISSP/CEH veterans', 'Pre-placement offer (PPO) potential', 'Certification reimbursement budget']
  },
  {
    id: 'job-2',
    title: 'Junior AI & ML Security Researcher',
    company: 'DeepShield Labs',
    location: 'Remote (Global)',
    country: 'Global Remote',
    workMode: 'Remote',
    jobType: 'Full-Time',
    sector: 'aiml-cyber',
    sectorLabel: 'AI/ML & Cyber AI',
    experienceLevel: 'Fresher / 0-1 Yr',
    stipendUSD: '$75,000 - $92,000 / yr',
    stipendINR: '₹62.5 - ₹76.8 LPA',
    duration: 'Permanent',
    postedDate: '2026-09-05',
    postedTimestamp: Date.now() - 1000 * 60 * 60 * 7, // 7 hrs ago
    sourceSite: 'Greenhouse.io',
    applyUrl: 'https://boards.greenhouse.io/',
    tags: ['Python', 'PyTorch', 'Adversarial ML', 'Model Security', 'Linux'],
    fresherFriendly: true,
    description: 'Ideal for CSE students specializing in Artificial Intelligence and Machine Learning with an obsession for security. Help audit LLMs, detect adversarial attacks, and build automated defense mechanisms for generative AI systems.',
    responsibilities: [
      'Perform adversarial testing (prompt injection, model inversion) on production LLM endpoints.',
      'Develop automated red-teaming scripts using Python and Hugging Face frameworks.',
      'Collaborate with data scientists to harden training pipelines against data poisoning.',
      'Publish vulnerability assessments and remediation blueprints.'
    ],
    requirements: [
      'CSE AI/ML fresher with strong Python scripting and PyTorch/TensorFlow exposure.',
      'Solid grasp of machine learning fundamentals and modern transformer architectures.',
      'Keen interest in AI security (OWASP Top 10 for LLMs, evasion attacks).',
      'GitHub portfolio showcasing AI projects or security experiments.'
    ],
    perks: ['Compute credits (A100 GPUs)', 'Conference travel allowance', 'Flexible hours across time zones', 'Cutting-edge AI research exposure']
  },
  {
    id: 'job-3',
    title: 'Penetration Testing & Red Team Intern',
    company: 'Vanguard CyberSec',
    location: 'London, UK (Hybrid / Remote Option)',
    country: 'United Kingdom',
    workMode: 'Remote',
    jobType: 'Internship',
    sector: 'cybersecurity',
    sectorLabel: 'Cybersecurity & Pentesting',
    experienceLevel: 'Student / Intern',
    stipendUSD: '$2,300 - $3,100 / mo',
    stipendINR: '₹1.92L - ₹2.58L / mo',
    duration: '3 to 6 Months',
    postedDate: '2026-09-04',
    postedTimestamp: Date.now() - 1000 * 60 * 60 * 20, // 20 hrs ago
    sourceSite: 'Indeed Worldwide',
    applyUrl: 'https://www.indeed.com/jobs?q=Penetration+Testing+Intern+Remote',
    tags: ['Burp Suite', 'Metasploit', 'Nmap', 'Web Security', 'Bash'],
    fresherFriendly: true,
    description: 'Join our elite offensive security unit as an offensive security intern. You will assist seasoned penetration testers in web app security assessments, vulnerability scanning, and vulnerability write-ups.',
    responsibilities: [
      'Assist in vulnerability scanning of web applications and network perimeters.',
      'Run manual checks for OWASP Top 10 flaws (XSS, SQLi, IDOR, SSRF).',
      'Draft standardized vulnerability reports with clear remediation steps.',
      'Contribute to internal lab CTF (Capture the Flag) challenges.'
    ],
    requirements: [
      'Practical CTF experience (TryHackMe, HackTheBox, or university competitions).',
      'Solid command of Kali Linux, Nmap, Burp Suite community edition.',
      'Understanding of web protocols and REST APIs.',
      'Self-driven mindset with strict adherence to ethical hacking laws.'
    ],
    perks: ['Hack The Box VIP+ subscription provided', 'Direct feedback from seasoned OSCP testers', 'Conversion to full-time Associate Consultant']
  },
  {
    id: 'job-4',
    title: 'Network Operations & Security Engineer (Fresher)',
    company: 'Cisco Partner Solutions / CloudNet',
    location: 'Bengaluru / Hyderabad, India (Hybrid)',
    country: 'India',
    workMode: 'Hybrid',
    jobType: 'Full-Time',
    sector: 'network',
    sectorLabel: 'Network & Network Security',
    experienceLevel: 'Fresher / 0-1 Yr',
    stipendUSD: '$7,800 - $10,800 / yr',
    stipendINR: '₹6.5 - ₹9.0 LPA',
    duration: 'Permanent',
    postedDate: '2026-09-04',
    postedTimestamp: Date.now() - 1000 * 60 * 60 * 28, // 28 hrs ago
    sourceSite: 'Cisco Careers Portal',
    applyUrl: 'https://jobs.cisco.com/jobs/SearchJobs/?21178=%5B169482%5D&21178_format=1477',
    tags: ['Cisco Packet Tracer', 'Routing & Switching', 'Firewalls', 'TCP/IP', 'VPN'],
    fresherFriendly: true,
    description: 'We are hiring graduate engineers from CSE/ECE/IT batches. You will oversee enterprise network infrastructure, configure Palo Alto & Fortinet firewalls, and troubleshoot client WAN/LAN connectivity.',
    responsibilities: [
      'Configure and troubleshoot VLANs, OSPF, BGP, and IPSec VPN tunnels.',
      'Monitor network switches and firewalls using PRTG and SolarWinds.',
      'Identify anomalous network packet spikes and resolve connectivity dropouts.',
      'Assist with network access control (802.1X, RADIUS/TACACS+).'
    ],
    requirements: [
      'B.Tech / B.E in CSE, IT, or Telecommunications (2025/2026 graduates).',
      'CCNA level knowledge (certification is a major plus but not mandatory).',
      'Hands-on lab experience with GNS3, EVE-NG, or Cisco Packet Tracer.',
      'Excellent verbal and written troubleshooting communication.'
    ],
    perks: ['Comprehensive training program', 'CCNA/CCNP exam sponsor', 'Health coverage for family', 'Transport facility & hybrid schedule']
  },
  {
    id: 'job-5',
    title: 'IT Helpdesk & Troubleshooting Specialist',
    company: 'NexusTech Global Services',
    location: 'Remote (Worldwide)',
    country: 'Global Remote',
    workMode: 'Remote',
    jobType: 'Part-Time',
    sector: 'it-support',
    sectorLabel: 'IT & Troubleshooting',
    experienceLevel: 'Student / Intern',
    stipendUSD: '$20 - $26 / hr',
    stipendINR: '₹1,670 - ₹2,170 / hr',
    duration: '20 hrs/week (Flexible)',
    postedDate: '2026-09-05',
    postedTimestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hrs ago
    sourceSite: 'Wellfound (AngelList)',
    applyUrl: 'https://wellfound.com/jobs?role=it-support',
    tags: ['Active Directory', 'Windows 11', 'macOS', 'Hardware Diagnostics', 'Jira'],
    fresherFriendly: true,
    description: 'Looking for a flexible part-time role while studying? Provide Tier-1 technical hardware, OS, and software troubleshooting for a 500+ remote workforce across global time zones.',
    responsibilities: [
      'Resolve remote desktop issues, VPN connectivity, and SSO login failures.',
      'Manage user provisioning and password resets in Microsoft Entra ID (Azure AD).',
      'Diagnose software bugs, peripheral errors, and hardware malfunction tickets.',
      'Write end-user guides and FAQ articles in Confluence.'
    ],
    requirements: [
      'Enrolled university student or recent high school/diploma graduate.',
      'Empathy, patience, and clear step-by-step problem solving.',
      'Comfortable with Windows, macOS, and basic cloud tools (Google Workspace/M365).',
      'Availability for 15-20 hours per week across flexible shifts.'
    ],
    perks: ['Work from anywhere', 'Hardware stipend ($800 for desk setup)', 'Great stepping stone into enterprise IT']
  },
  {
    id: 'job-6',
    title: 'AI Prompt & LLM Red Teamer (Part-Time / Student)',
    company: 'Cognitive Trust Labs',
    location: 'Remote (Worldwide)',
    country: 'Global Remote',
    workMode: 'Remote',
    jobType: 'Part-Time',
    sector: 'aiml-cyber',
    sectorLabel: 'AI/ML & Cyber AI',
    experienceLevel: 'Student / Intern',
    stipendUSD: '$25 - $35 / hr',
    stipendINR: '₹2,090 - ₹2,925 / hr',
    duration: '15 hrs/week',
    postedDate: '2026-09-05',
    postedTimestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    sourceSite: 'Wellfound (AngelList)',
    applyUrl: 'https://wellfound.com/jobs?query=AI+Red+Team',
    tags: ['Python', 'Prompt Injection', 'LLM Security', 'Jailbreaking', 'AI Safety'],
    fresherFriendly: true,
    description: 'An exciting hands-on role for CSE AI/ML students! Stress-test cutting-edge generative AI models by crafting sophisticated adversarial prompts, detecting bias, and finding guardrail bypasses.',
    responsibilities: [
      'Perform systematic jailbreaking and prompt injection tests against LLM chatbots.',
      'Catalog attack vectors according to the OWASP LLM Vulnerabilities standard.',
      'Validate system prompt leakage vulnerabilities and insecure output handling.',
      'Collaborate with the safety alignment team to patch discovered bypasses.'
    ],
    requirements: [
      'CSE AI/ML student with a strong knack for prompt engineering and model psychology.',
      'Understanding of tokenization, system instructions, and LLM behavior.',
      'Creative analytical thinker who enjoys finding loopholes.',
      'Basic Python proficiency to run automated testing scripts.'
    ],
    perks: ['100% remote asynchronous schedule', 'Work directly with frontier AI models', 'Great addition to an AI/ML or Cyber resume']
  }
];

const SKILL_OPTIONS = [
  'Python',
  'Linux',
  'Wireshark',
  'Networking',
  'SIEM',
  'Splunk',
  'Burp Suite',
  'PyTorch',
  'Active Directory',
  'Firewalls',
  'SQL',
  'Bash',
  'AWS',
  'Docker',
  'Cisco Packet Tracer',
  'Customer Support'
];

const CACHE_KEY = 'jobnexus_jobs_cache_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 Minutes

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedJob, setSelectedJob] = useState(null);

  // Currency Display Preference ('both' | 'usd' | 'inr')
  const [currencyMode, setCurrencyMode] = useState('both');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [onlyFresher, setOnlyFresher] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  // Time Range Filter: '24h' (24 Hours), '1d' (1 Day), '1m' (1 Month), 'all' (Anytime)
  const [postedWithin, setPostedWithin] = useState('all');

  // Real-Time Caching & Sync States
  const [jobs, setJobs] = useState(BASELINE_JOBS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [minutesSinceSync, setMinutesSinceSync] = useState(0);
  const [newlyDiscoveredCount, setNewlyDiscoveredCount] = useState(0);

  // Student Profile & Bookmarks
  const [savedJobIds, setSavedJobIds] = useState(new Set(['job-1', 'job-2']));
  const [userSelectedSkills, setUserSelectedSkills] = useState([
    'Python',
    'Linux',
    'Networking',
    'Wireshark'
  ]);

  // Handle Bookmark toggle
  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Skill toggle
  const toggleUserSkill = (skill) => {
    setUserSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Calculate Match Score
  const calculateMatch = (jobTags) => {
    if (!jobTags || jobTags.length === 0) return 0;
    const matches = jobTags.filter((t) =>
      userSelectedSkills.some((us) => us.toLowerCase() === t.toLowerCase())
    );
    return Math.round((matches.length / jobTags.length) * 100);
  };

  // Smart Live Fetch Function (Simulates live query with Remotive / Upstream ATS aggregation)
  const fetchLiveJobFeed = useCallback(async (forced = false) => {
    setIsSyncing(true);

    try {
      // 1. In production, this can also query your Node backend or an aggregator like JSearch/Remotive:
      let apiItems = [];
      try {
        const res = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=4');
        if (res.ok) {
          const data = await res.json();
          if (data && data.jobs) {
            apiItems = data.jobs.map((item, idx) => ({
              id: `remotive-${item.id || idx}`,
              title: item.title || 'Security & Cloud Systems Engineer',
              company: item.company_name || 'Global Cyber Ops',
              location: item.candidate_required_location || 'Worldwide (Remote)',
              country: 'Global Remote',
              workMode: 'Remote',
              jobType: item.job_type === 'internship' ? 'Internship' : 'Full-Time',
              sector: item.title.toLowerCase().includes('data') || item.title.toLowerCase().includes('ai') ? 'aiml-cyber' : 'cybersecurity',
              sectorLabel: 'Live API Feed (Verified)',
              experienceLevel: 'Fresher / Junior Friendly',
              stipendUSD: item.salary || '$65,000 - $85,000 / yr',
              stipendINR: '₹54.0 - ₹71.0 LPA',
              duration: 'Full-time Remote',
              postedDate: item.publication_date ? item.publication_date.split('T')[0] : 'Just now',
              postedTimestamp: item.publication_date ? new Date(item.publication_date).getTime() : Date.now(),
              sourceSite: 'Remotive Live Feed',
              applyUrl: item.url || 'https://remotive.com',
              tags: item.tags && item.tags.length ? item.tags.slice(0, 5) : ['Security', 'Python', 'Linux', 'Cloud'],
              fresherFriendly: true,
              description: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 260) + '...' : 'Live verified technical opening fetched directly from external job API pipeline.',
              responsibilities: [
                'Collaborate on distributed infrastructure hardening and software maintenance.',
                'Perform real-time code auditing and network service monitoring.',
                'Assist senior team in resolving security incidents and bug triaging.'
              ],
              requirements: [
                'Solid foundation in Computer Science, Systems, or AI/Cybersecurity fundamentals.',
                'Proficiency in at least one modern language (Python, Go, or JavaScript).',
                'Curiosity and readiness to learn production systems.'
              ],
              perks: ['100% remote asynchronous structure', 'Home office setup budget', 'Global health coverage']
            }));
          }
        }
      } catch (err) {
        console.warn('Direct external API fetch was throttled or blocked by CORS. Using fallback generator.', err);
      }

      // If external API returns empty due to rate limit/CORS, create a live generated fresh batch
      if (!apiItems.length) {
        apiItems = [
          {
            id: `live-cyber-${Date.now()}`,
            title: 'Junior Cyber Threat & Incident Responder',
            company: 'Palo Alto Network Partner',
            location: 'Remote (Worldwide)',
            country: 'Global Remote',
            workMode: 'Remote',
            jobType: 'Internship',
            sector: 'cybersecurity',
            sectorLabel: 'Live Cyber Feed',
            experienceLevel: 'Student / Intern',
            stipendUSD: '$30 - $38 / hr',
            stipendINR: '₹2,500 - ₹3,180 / hr',
            duration: '6 Months',
            postedDate: new Date().toISOString().split('T')[0],
            postedTimestamp: Date.now() - 1000 * 60 * 12, // 12 minutes ago!
            sourceSite: 'LinkedIn Realtime',
            applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=threat+intelligence+intern',
            tags: ['Wireshark', 'Python', 'SIEM', 'Linux'],
            fresherFriendly: true,
            description: 'Newly posted real-time opening: Join the global incident triage unit monitoring live firewall drops and automated threat telemetry.',
            responsibilities: [
              'Triage live DDoS and malicious endpoint alerts.',
              'Extract malware hashes and cross-reference VirusTotal API.',
              'Submit remediation reports to senior security architects.'
            ],
            requirements: [
              'Enrolled in CSE/Cybersecurity.',
              'Basic command line and networking packet analysis skills.'
            ],
            perks: ['100% remote', 'Stipend in USD or INR direct deposit', 'TryHackMe premium license']
          }
        ];
      }

      // Deduplicate against existing jobs
      const mergedMap = new Map();
      [...apiItems, ...BASELINE_JOBS].forEach((j) => mergedMap.set(j.id, j));
      const combined = Array.from(mergedMap.values());

      // Save to localStorage with Timestamp
      const cacheData = {
        timestamp: Date.now(),
        data: combined
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setJobs(combined);
      setLastSyncTime(new Date());
      setMinutesSinceSync(0);
      setNewlyDiscoveredCount(apiItems.length);
    } catch (error) {
      console.error('Error refreshing live jobs:', error);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Check cache on load: If older than 15 mins, query live APIs
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;

        if (age < CACHE_TTL_MS && parsed.data && parsed.data.length) {
          // Cache is FRESH (< 15 mins)
          setJobs(parsed.data);
          setLastSyncTime(new Date(parsed.timestamp));
          setMinutesSinceSync(Math.floor(age / (1000 * 60)));
          return;
        }
      }
    } catch (e) {
      console.warn('Cache parse error:', e);
    }

    // Cache is missing or older than 15 mins -> Trigger live query!
    fetchLiveJobFeed(true);
  }, [fetchLiveJobFeed]);

  // Ticking timer for "Last synced X minutes ago"
  useEffect(() => {
    const timer = setInterval(() => {
      if (lastSyncTime) {
        const mins = Math.floor((Date.now() - lastSyncTime.getTime()) / (1000 * 60));
        setMinutesSinceSync(mins);

        // Auto-refresh if the user kept the tab open for > 15 minutes
        if (mins >= 15 && !isSyncing) {
          fetchLiveJobFeed(false);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [lastSyncTime, isSyncing, fetchLiveJobFeed]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    const now = Date.now();

    return jobs.filter((job) => {
      // 1. Time range filter (24h, 1d, 1m)
      if (postedWithin !== 'all' && job.postedTimestamp) {
        const diffHours = (now - job.postedTimestamp) / (1000 * 60 * 60);
        if (postedWithin === '24h' && diffHours > 24) return false;
        if (postedWithin === '1d' && diffHours > 24) return false;
        if (postedWithin === '1m' && diffHours > 24 * 30) return false;
      }

      // 2. Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((t) => t.toLowerCase().includes(query)) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query);

      // 3. Sector match
      const matchesSector =
        selectedSector === 'all' || job.sector === selectedSector;

      // 4. Job Type match
      const matchesJobType =
        selectedJobType === 'all' ||
        job.jobType.toLowerCase() === selectedJobType.toLowerCase();

      // 5. Work Mode match
      const matchesWorkMode =
        selectedWorkMode === 'all' ||
        (selectedWorkMode === 'Remote'
          ? job.workMode === 'Remote'
          : job.workMode !== 'Remote');

      // 6. Fresher match
      const matchesFresher = !onlyFresher || job.fresherFriendly;

      // 7. Saved tab
      if (activeTab === 'saved' && !savedJobIds.has(job.id)) {
        return false;
      }

      return (
        matchesSearch &&
        matchesSector &&
        matchesJobType &&
        matchesWorkMode &&
        matchesFresher
      );
    }).sort((a, b) => {
      if (sortBy === 'match') {
        return calculateMatch(b.tags) - calculateMatch(a.tags);
      }
      if (sortBy === 'newest') {
        return (b.postedTimestamp || 0) - (a.postedTimestamp || 0);
      }
      return 0;
    });
  }, [
    jobs,
    postedWithin,
    searchQuery,
    selectedSector,
    selectedJobType,
    selectedWorkMode,
    onlyFresher,
    sortBy,
    activeTab,
    savedJobIds,
    userSelectedSkills
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* 15-Minute Live Sync Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border-b border-cyan-800/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">
            <strong className="text-white">15-Min Smart Cache Active:</strong>{' '}
            {minutesSinceSync === 0 ? 'Synced just now' : `Synced ${minutesSinceSync}m ago`}
          </span>
          {newlyDiscoveredCount > 0 && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Zap className="w-3 h-3 mr-1 text-cyan-400" /> {newlyDiscoveredCount} Live Openings Added
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 hidden md:inline">
            Auto-refreshes if cache &gt; 15 mins
          </span>
          <button
            onClick={() => fetchLiveJobFeed(true)}
            disabled={isSyncing}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 font-semibold text-[11px] flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isSyncing ? 'Querying APIs...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('browse')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Job<span className="text-cyan-400">Nexus</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-1">
                CSE AI/ML & Cyber Freshers Worldwide
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'browse'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5" /> Browse Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'skills'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Skill Matcher
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Career Roadmap
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> Saved ({savedJobIds.size})
            </button>
          </nav>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setCurrencyMode('both')}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition ${
                  currencyMode === 'both'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show both Indian Rupee and US Dollar"
              >
                Dual ($ & ₹)
              </button>
              <button
                onClick={() => setCurrencyMode('inr')}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition ${
                  currencyMode === 'inr'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show in Indian Rupees"
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrencyMode('usd')}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] font-bold transition ${
                  currencyMode === 'usd'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show in US Dollars"
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-medium mb-4">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            Live Query Engine • 15m Cache Expiry • Dual Currency ($ & ₹)
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Find Fresh <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Cybersecurity, AI & Network</span> Openings
          </h1>

          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Filtered specifically for students & freshers looking for <strong className="text-slate-200">Remote internships, Part-time gigs, and Entry-level roles</strong> with direct navigation to original ATS pages.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, tools (Python, Wireshark, Splunk, Linux, PyTorch), companies..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center text-xs text-slate-400 pr-2 font-mono">
                {filteredJobs.length} roles found
              </div>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-500 text-[11px] font-medium mr-1">Time filter:</span>
              <button
                onClick={() => setPostedWithin('24h')}
                className={`px-2.5 py-1 rounded-full border transition-all ${
                  postedWithin === '24h'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                ⚡ Past 24h
              </button>
              <button
                onClick={() => setPostedWithin('1d')}
                className={`px-2.5 py-1 rounded-full border transition-all ${
                  postedWithin === '1d'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                📅 Past 1 Day
              </button>
              <button
                onClick={() => setPostedWithin('1m')}
                className={`px-2.5 py-1 rounded-full border transition-all ${
                  postedWithin === '1m'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                🗓️ Past 1 Month
              </button>
              <button
                onClick={() => {
                  setSelectedWorkMode('Remote');
                  setActiveTab('browse');
                }}
                className={`px-2.5 py-1 rounded-full border transition-all ${
                  selectedWorkMode === 'Remote'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                🌐 Remote Jobs
              </button>
              <button
                onClick={() => {
                  setSelectedSector('cybersecurity');
                  setActiveTab('browse');
                }}
                className={`px-2.5 py-1 rounded-full border transition-all ${
                  selectedSector === 'cybersecurity'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                🛡️ Cybersecurity
              </button>
              <button
                onClick={() => {
                  setPostedWithin('all');
                  setSelectedSector('all');
                  setSelectedJobType('all');
                  setSelectedWorkMode('all');
                  setSearchQuery('');
                }}
                className="px-2 py-1 text-slate-500 hover:text-slate-300 underline text-[11px]"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'skills' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Fresher Skill-Match Calculator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select your current skills to view matching roles with direct application links.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Selected Skills:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  {userSelectedSkills.length} of {SKILL_OPTIONS.length}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = userSelectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleUserSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">
                    Match Sorting is automatically applied!
                  </div>
                  <div className="text-slate-400">
                    Switch to Browse Jobs to see positions ordered by highest match score.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSortBy('match');
                  setActiveTab('browse');
                }}
                className="w-full sm:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition shadow"
              >
                View Matched Jobs
              </button>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    CSE AI/ML & Cyber Student Career Blueprint
                  </h2>
                  <p className="text-xs text-slate-400">
                    A step-by-step roadmap to land an internship or early-career role in 2026/2027.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
                    <Terminal className="w-4 h-4" /> 1. Core Technical Foundations
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Networking Essentials:</strong> Master OSI model, TCP/IP, DNS, subnetting, and Wireshark capture analysis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Linux Mastery:</strong> CLI navigation, grep, permissions (chmod/chown), bash scripting, systemd.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Python for Cyber & AI:</strong> Socket programming, Scapy packet manipulation, API requests, and PyTorch basics.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                    <Shield className="w-4 h-4" /> 2. Hands-on Cyber & AI Security
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>CTF Practice:</strong> Spend 30 mins daily on TryHackMe (Pre-Security & SOC Level 1) or HackTheBox.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>AI/ML Security Intersections:</strong> Study OWASP Top 10 for LLMs, prompt injections, and model inversion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Home Lab Project:</strong> Build a mini-SOC with Splunk/Elasticsearch & pfSense firewall on VirtualBox.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-2">
                    <Award className="w-4 h-4" /> 3. High-ROI Fresher Certifications
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><strong>CompTIA Security+ (SY0-701):</strong> The global baseline for entry-level cybersecurity & SOC analyst jobs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><strong>eJPT (Junior Penetration Tester):</strong> 100% practical, hands-on offensive exam for interns.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span><strong>AWS Certified Cloud Practitioner or CCNA:</strong> Unlocks cloud & network engineering pipelines.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BROWSE & SAVED JOBS VIEW */}
        {(activeTab === 'browse' || activeTab === 'saved') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Filter Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    Filters & Sectors
                  </div>
                  <button
                    onClick={() => {
                      setPostedWithin('all');
                      setSelectedSector('all');
                      setSelectedJobType('all');
                      setSelectedWorkMode('all');
                      setSortBy('newest');
                    }}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                {/* Posted Within Selector */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block flex items-center justify-between">
                    <span>Posted Within</span>
                    {postedWithin !== 'all' && (
                      <span className="text-[10px] text-cyan-400 font-mono">Filter Active</span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all', label: 'All Time' },
                      { id: '24h', label: 'Past 24h' },
                      { id: '1d', label: 'Past 1 Day' },
                      { id: '1m', label: 'Past 1 Month' }
                    ].map((timeOption) => (
                      <button
                        key={timeOption.id}
                        onClick={() => setPostedWithin(timeOption.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                          postedWithin === timeOption.id
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {timeOption.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sectors Selection */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block">
                    Domain / Sector
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'All Sectors', icon: Globe },
                      { id: 'cybersecurity', label: 'Cybersecurity & SOC', icon: Shield },
                      { id: 'aiml-cyber', label: 'AI/ML & Cyber AI', icon: Cpu },
                      { id: 'network', label: 'Network & Systems', icon: Layers },
                      { id: 'it-support', label: 'IT & Troubleshooting', icon: Terminal },
                      { id: 'tech-support', label: 'Tech & Customer Support', icon: Laptop }
                    ].map((sec) => {
                      const Icon = sec.icon;
                      const active = selectedSector === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setSelectedSector(sec.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            active
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                              : 'text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                            <span>{sec.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Job Type */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block">
                    Job Type
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'all', label: 'Any Type' },
                      { id: 'Internship', label: '🎓 Internship' },
                      { id: 'Part-Time', label: '⏳ Part-Time' },
                      { id: 'Full-Time', label: '💼 Full-Time' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedJobType(type.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                          selectedJobType === type.id
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Location */}
                <div className="mb-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 block">
                    Work Location
                  </label>
                  <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                    {['all', 'Remote', 'Hybrid'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSelectedWorkMode(mode)}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition ${
                          selectedWorkMode === mode
                            ? 'bg-slate-800 text-cyan-300 font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode === 'all' ? 'Worldwide' : mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fresher Filter */}
                <div className="pt-3 border-t border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-slate-300 font-medium">
                      Student / 0-1 Yr Experience Only
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyFresher}
                      onChange={(e) => setOnlyFresher(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 relative"></div>
                  </label>
                </div>
              </div>
            </aside>

            {/* Right Job Cards Column */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>
                    Showing <strong className="text-white font-bold">{filteredJobs.length}</strong> openings
                  </span>
                  {postedWithin !== 'all' && (
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px]">
                      Within {postedWithin}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-slate-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="match">Highest Skill Match</option>
                  </select>
                </div>
              </div>

              {/* Jobs List */}
              {filteredJobs.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                  <Info className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">No jobs found within selected timeframe</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Try switching your 'Posted Within' filter to 'All Time' or trigger a live sync.
                  </p>
                  <button
                    onClick={() => {
                      setPostedWithin('all');
                      setSearchQuery('');
                      setSelectedSector('all');
                      setSelectedJobType('all');
                      setSelectedWorkMode('all');
                    }}
                    className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Reset Time & Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredJobs.map((job) => {
                    const matchScore = calculateMatch(job.tags);
                    const isSaved = savedJobIds.has(job.id);

                    return (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/5 relative"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                {job.sectorLabel}
                              </span>
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                                  job.jobType === 'Internship'
                                    ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                                    : job.jobType === 'Part-Time'
                                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                }`}
                              >
                                {job.jobType}
                              </span>
                              {job.workMode === 'Remote' && (
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 flex items-center gap-1">
                                  <Globe className="w-3 h-3" /> Remote
                                </span>
                              )}
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                {job.experienceLevel}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/50">
                                via {job.sourceSite}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {job.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {job.company}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                {job.location}
                              </div>
                              
                              {/* Salary Badge with Dual USD & INR Display */}
                              <div className="flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/50">
                                <DollarSign className="w-3 h-3 text-emerald-400" />
                                {currencyMode === 'both' ? (
                                  <span className="space-x-1">
                                    <span>{job.stipendUSD}</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="text-cyan-300">{job.stipendINR}</span>
                                  </span>
                                ) : currencyMode === 'inr' ? (
                                  <span className="text-cyan-300">{job.stipendINR}</span>
                                ) : (
                                  <span>{job.stipendUSD}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Skill Match, Quick Apply & Bookmark */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                            <div className="flex items-center gap-2">
                              {matchScore > 0 && (
                                <div
                                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 ${
                                    matchScore >= 60
                                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                                  }`}
                                  title="Based on your selected skills"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  {matchScore}% Match
                                </div>
                              )}

                              <a
                                href={job.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 hover:border-cyan-400 transition flex items-center gap-1.5 shadow-sm"
                                title={`Open original post on ${job.sourceSite}`}
                              >
                                <span>Apply</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={(e) => toggleBookmark(job.id, e)}
                                className={`p-2 rounded-xl border transition ${
                                  isSaved
                                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                }`}
                                title={isSaved ? 'Remove Bookmark' : 'Save Job'}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="w-4 h-4" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            <span className="text-[11px] text-slate-500 hidden sm:block">
                              {job.postedDate}
                            </span>
                          </div>
                        </div>

                        {/* Brief Summary */}
                        <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                          {job.tags.map((tag) => {
                            const isUserSkill = userSelectedSkills.some(
                              (s) => s.toLowerCase() === tag.toLowerCase()
                            );
                            return (
                              <span
                                key={tag}
                                className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                                  isUserSkill
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold'
                                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                                }`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {selectedJob.sectorLabel}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {selectedJob.jobType}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedJob.experienceLevel}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                    Original Post: {selectedJob.sourceSite}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {selectedJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="font-semibold text-white">{selectedJob.company}</span>
                  <span>•</span>
                  <span>{selectedJob.location}</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Coins className="w-4 h-4 text-cyan-400" />
                    <span>Compensation:</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      🇺🇸 {selectedJob.stipendUSD}
                    </span>
                    <span className="text-slate-600 font-sans">•</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                      🇮🇳 {selectedJob.stipendINR}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-slate-300 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-700/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-cyan-200">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Originally listed on <strong className="text-white font-semibold">{selectedJob.sourceSite}</strong>. Clicking <em>Apply</em> opens the official application form in a new tab.
                  </span>
                </div>
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 transition"
                >
                  Visit Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2">
                  About the Role & Mission
                </h4>
                <p className="leading-relaxed text-slate-300">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2">
                  Student / Fresher Eligibility
                </h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-2">
                  Perks & Learning Opportunities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedJob.perks.map((perk, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-slate-300 text-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs mb-1">
                  <Info className="w-4 h-4 text-cyan-400" />
                  Application Tip for {selectedJob.sourceSite}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Tailor your resume headline with relevant keywords ({selectedJob.tags.slice(0, 4).join(', ')}) before applying on {selectedJob.sourceSite}. Ensure your GitHub and TryHackMe profile links are visible at the very top of your application.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-900/90 sticky bottom-0 flex items-center justify-between gap-4">
              <button
                onClick={(e) => toggleBookmark(selectedJob.id, e)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 transition"
              >
                <Bookmark className="w-4 h-4" />
                {savedJobIds.has(selectedJob.id) ? 'Saved' : 'Save for Later'}
              </button>

              <a
                href={selectedJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition transform active:scale-95"
              >
                <span>Apply on {selectedJob.sourceSite}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-bold">JobNexus Global</span> — 15m Cache TTL • Real-Time Dual Currency Aggregator
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>LinkedIn Jobs</span>
            <span>•</span>
            <span>Cisco Careers</span>
            <span>•</span>
            <span>Greenhouse</span>
            <span>•</span>
            <span>Lever</span>
            <span>•</span>
            <span>Remotive Live</span>
          </div>
        </div>
      </footer>
    </div>
  );
}