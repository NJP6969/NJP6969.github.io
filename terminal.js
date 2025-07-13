class InteractiveTerminal {
    constructor() {
        this.apiKey = 'AIzaSyA5w2mIJEUTLBA7pGTJ-Sda90uolyV5EY0';
        this.geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isProcessing = false;
        
        // Knowledge base about Narasimha Pai
        this.knowledgeBase = `
You are an AI assistant for Narasimha Pai's portfolio website. You have access to the following information from his CV and website:

PERSONAL INFO:
- Name: Narasimha Pai
- Role: AI Researcher & ML Engineer
- Current Status: Pursuing dual degrees (MS by Research in Computational Natural Science & B.Tech Computer Science) at IIIT Hyderabad
- Research Focus: Sleep analysis, physiological signals, machine learning, AI automation
- Lab: Brain, Cognition and Computation Lab, IIITH

EDUCATION:
- MS by Research in Computational Natural Science, IIIT Hyderabad
- B.Tech Computer Science, IIIT Hyderabad
- UGEE Rank 114 (National Level Achievement)

WORK EXPERIENCE:
- July 2025: Research Intern at NIMHANS, Bangalore (Sleep analysis research, Fitbit/actigraphy/PSG data)
- May-June 2025: AI Agent Automation Intern at MontyCloud, Bangalore (AWS services, MS Teams, Jira APIs)
- Jan-April 2025: Software Developer at CoralComp (Weather prediction for pilots using METAR data)
- Oct 2024-Present: Undergraduate Researcher at Brain, Cognition and Computation Lab, IIITH
- Oct 2024-Present: Problem Setter, Marketing, Logistics at Hacking Club, IIITH

TECHNICAL SKILLS:
Programming: Python (Expert), JavaScript (Advanced), C++ (Advanced), C (Advanced), R, SQL, Java, MATLAB
AI/ML: TensorFlow (Advanced), PyTorch (Advanced), Scikit-learn (Expert), OpenCV, Hugging Face, Agentic AI
Cloud & AWS: AWS (Intermediate), IAM, DynamoDB, S3, EC2, CloudFormation, Serverless, Lambda, API Gateway, CloudFront, SAM
Development Tools: Docker, Git, Jupyter, VS Code, Linux, REST APIs, Teams Workflow, Jira Workflow, Teams Bot, MCP
Databases: MongoDB (Intermediate), PostgreSQL (Intermediate), DynamoDB
Research & Data: Deep Learning, Computer Vision, NLP, Data Science, Signal Processing, Fitbit Data, PSG Analysis, Actigraphy, WebCardio Data Extraction and Analysis

ACHIEVEMENTS:
- Enigma CTF - Top 6 (IIT Hyderabad, Feb 2025)
- Deccan CTF - Top 5 among 500+ participants (Jan 2025)
- HackIIIT Winner - Best MOYA Framework Contribution
- Startup-aid Finalist - E-cell Competition (Apr 2025)
- Bangalore 10K Winner - First Place Under 18

EXTRACURRICULAR ACTIVITIES:
- Oct 2024-Present: Member of Amateur Sports Enthusiast Club, IIITH (Football enthusiast)
- 2019-2021: School Rotary Treasurer (Organized donations of clothes and supplies to old age homes and children homes)

PERSONAL INTERESTS:
- Sports: Football (active player and enthusiast)
- Community Service: Charitable activities and donations

CONTACT:
- Work Email: narasimha.pai@research.iiit.ac.in
- Personal Email: narsi.pai.narsi@gmail.com
- Phone: 960664****
- LinkedIn: https://www.linkedin.com/in/narasimha-pai-6234a2286/
- GitHub: https://github.com/NJP6969
- Research Profile: https://researchweb.iiit.ac.in/~narasimha.pai/
- Codeforces: https://codeforces.com/profile/njp6969

CURRENT RESEARCH:
Working on physiological signals and ML models to detect sleep disorders at the Brain, Cognition and Computation Lab. Authored research papers on sleep analysis and extracted/compared sleep metrics from various devices.

IMPORTANT: Only answer questions based on the information provided above. If asked about personal details not mentioned (like favorite sports, food preferences, etc.), politely explain that this information is not available in the public portfolio/CV. Focus on professional background, skills, education, and research.

Please respond as Narasimha's professional AI assistant. Be helpful and professional, and stick to the factual information provided above.
`;
        
        this.initializeTerminal();
    }

    initializeTerminal() {
        // Find the main terminal in the header
        const headerTerminal = document.querySelector('.terminal-body');
        if (headerTerminal) {
            this.makeTerminalInteractive(headerTerminal);
        }
        
        // Also create interactive terminals in contact section if needed
        const contactTerminal = document.querySelector('.contact-terminal .terminal-body');
        if (contactTerminal) {
            this.makeTerminalInteractive(contactTerminal);
        }
    }

    makeTerminalInteractive(terminalBody) {
        // Clear existing content and make it interactive
        terminalBody.innerHTML = `
            <div class="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="prompt">user@neural-net:~$</span>
                <input type="text" id="terminal-input" name="terminal-input" class="terminal-input" placeholder="Type 'help' for commands or ask me anything..." autocomplete="off">
            </div>
        `;

        const input = terminalBody.querySelector('.terminal-input');
        const output = terminalBody.querySelector('.terminal-output');

        // Add welcome message
        this.addOutput(output, 'Welcome to Neural Terminal! I\'m your AI assistant.');
        this.addOutput(output, 'Type "help" for available commands or ask me anything about Narasimha\'s background.');
        this.addOutput(output, '');

        // Handle input
        input.addEventListener('keydown', (e) => this.handleInput(e, input, output));
        input.addEventListener('focus', () => {
            input.style.outline = 'none';
            input.style.border = 'none';
        });
    }

    handleInput(e, input, output) {
        if (e.key === 'Enter' && !this.isProcessing) {
            const command = input.value.trim();
            if (command) {
                this.addOutput(output, `user@neural-net:~$ ${command}`);
                this.processCommand(command, output);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex] || '';
            } else {
                this.historyIndex = this.commandHistory.length;
                input.value = '';
            }
        }
    }

    async processCommand(command, output) {
        const lowerCommand = command.toLowerCase();
        
        // Built-in commands
        if (lowerCommand === 'help') {
            this.showHelp(output);
        } else if (lowerCommand === 'clear') {
            output.innerHTML = '';
        } else if (lowerCommand === 'whoami') {
            this.addOutput(output, 'Narasimha Pai - AI Researcher & ML Engineer');
        } else if (lowerCommand.startsWith('ls')) {
            this.addOutput(output, 'about.py  experience.py  skills.py  contact.py  research.py');
        } else if (lowerCommand === 'pwd') {
            this.addOutput(output, '/home/narasimha/portfolio');
        } else if (lowerCommand.includes('cat about')) {
            this.showAbout(output);
        } else if (lowerCommand.includes('cat contact')) {
            this.showContact(output);
        } else if (lowerCommand.includes('cat skills')) {
            this.showSkills(output);
        } else if (lowerCommand === 'date') {
            this.addOutput(output, new Date().toString());
        } else if (lowerCommand === 'uptime') {
            this.addOutput(output, 'System online since portfolio launch - All neural networks operational');
        } else if (lowerCommand === 'test-ai' || lowerCommand === 'ping') {
            this.addOutput(output, 'Testing AI connection...');
            await this.testAIConnection(output);
        } else {
            // Send to Gemini API for AI response
            await this.queryGemini(command, output);
        }
    }

    showHelp(output) {
        this.addOutput(output, 'Available commands:');
        this.addOutput(output, '  help          - Show this help message');
        this.addOutput(output, '  clear         - Clear the terminal');
        this.addOutput(output, '  whoami        - Display current user info');
        this.addOutput(output, '  ls            - List available files');
        this.addOutput(output, '  cat about     - Show about information');
        this.addOutput(output, '  cat contact   - Show contact information');
        this.addOutput(output, '  cat skills    - Show technical skills');
        this.addOutput(output, '  date          - Show current date');
        this.addOutput(output, '  uptime        - Show system uptime');
        this.addOutput(output, '  test-ai       - Test AI connection');
        this.addOutput(output, '');
        this.addOutput(output, 'You can also ask me anything about Narasimha\'s background,');
        this.addOutput(output, 'research, skills, or general AI/ML questions!');
        this.addOutput(output, '');
    }

    showAbout(output) {
        this.addOutput(output, 'AI Researcher and ML Engineer pursuing dual degrees at IIIT Hyderabad.');
        this.addOutput(output, 'Currently conducting research at the Brain, Cognition and Computation Lab,');
        this.addOutput(output, 'specializing in sleep analysis, physiological signal processing, and AI automation.');
        this.addOutput(output, 'Passionate about developing intelligent systems that bridge neuroscience and technology.');
        this.addOutput(output, 'Football enthusiast and member of Amateur Sports Enthusiast Club at IIITH.');
        this.addOutput(output, 'Previously served as School Rotary Treasurer organizing charitable donations.');
    }

    showContact(output) {
        this.addOutput(output, 'Contact Information:');
        this.addOutput(output, '  Work Email: narasimha.pai@research.iiit.ac.in');
        this.addOutput(output, '  Personal Email: narsi.pai.narsi@gmail.com');
        this.addOutput(output, '  GitHub: https://github.com/NJP6969');
        this.addOutput(output, '  LinkedIn: https://www.linkedin.com/in/narasimha-pai-6234a2286/');
        this.addOutput(output, '  Research Profile: https://researchweb.iiit.ac.in/~narasimha.pai/');
    }

    showSkills(output) {
        this.addOutput(output, 'Technical Skills:');
        this.addOutput(output, '  Programming: Python, JavaScript, C++, C, R, SQL, Java, MATLAB');
        this.addOutput(output, '  AI/ML: TensorFlow, PyTorch, Scikit-learn, OpenCV, Hugging Face, Agentic AI');
        this.addOutput(output, '  Cloud & AWS: IAM, DynamoDB, S3, EC2, CloudFormation, Serverless, Lambda');
        this.addOutput(output, '  APIs & Integration: API Gateway, REST APIs, Teams Bot, Jira Workflow, MCP');
        this.addOutput(output, '  Development: Docker, Git, Jupyter, VS Code, Linux, SAM, CloudFront');
        this.addOutput(output, '  Databases: MongoDB, PostgreSQL, DynamoDB');
        this.addOutput(output, '  Health Data: Fitbit, PSG Analysis, Actigraphy, WebCardio Data Extraction');
        this.addOutput(output, '  Research: Deep Learning, Computer Vision, NLP, Signal Processing');
    }

    async queryGemini(question, output) {
        this.isProcessing = true;
        this.addOutput(output, 'AI Assistant is thinking...');
        
        const loadingElement = output.lastElementChild;
        let dots = 0;
        const loadingInterval = setInterval(() => {
            if (loadingElement && loadingElement.parentNode === output) {
                dots = (dots + 1) % 4;
                loadingElement.textContent = 'AI Assistant is thinking' + '.'.repeat(dots);
            }
        }, 300);

        try {
            const response = await fetch(`${this.geminiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.knowledgeBase}\n\nUser question: ${question}`
                        }]
                    }]
                })
            });

            clearInterval(loadingInterval);
            // Safely remove loading element
            try {
                if (loadingElement && loadingElement.parentNode === output) {
                    output.removeChild(loadingElement);
                }
            } catch (e) {
                // Ignore removal errors
            }

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                
                // Format and display the response
                this.addOutput(output, '🤖 AI Assistant:', 'ai-response');
                const lines = aiResponse.split('\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        this.addOutput(output, line, 'ai-response');
                    } else {
                        this.addOutput(output, '');
                    }
                });
            } else {
                throw new Error('Invalid response format from API');
            }

        } catch (error) {
            clearInterval(loadingInterval);
            // Safely remove loading element
            try {
                if (loadingElement && loadingElement.parentNode === output) {
                    output.removeChild(loadingElement);
                }
            } catch (e) {
                // Ignore removal errors
            }
            
            // More detailed error handling
            if (error.message.includes('404')) {
                this.addOutput(output, '❌ API Error: Service temporarily unavailable', 'error');
                this.addOutput(output, 'The AI service is currently offline. Please try built-in commands like "help", "whoami", or "cat about".', 'error');
            } else if (error.message.includes('403')) {
                this.addOutput(output, '❌ API Error: Access denied', 'error');
                this.addOutput(output, 'API key issue. Please try built-in commands instead.', 'error');
            } else {
                this.addOutput(output, `❌ Error: ${error.message}`, 'error');
                this.addOutput(output, 'Please try again or use built-in commands like "help", "whoami", "cat about".', 'error');
            }
        }

        this.addOutput(output, '');
        this.isProcessing = false;
    }

    async testAIConnection(output) {
        try {
            const testResponse = await fetch(`${this.geminiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: 'Hello, please respond with "AI connection successful"'
                        }]
                    }]
                })
            });

            if (testResponse.ok) {
                this.addOutput(output, '✅ AI connection successful! You can now ask questions.', 'ai-response');
            } else {
                this.addOutput(output, `❌ AI connection failed: ${testResponse.status}`, 'error');
                this.addOutput(output, 'Built-in commands are still available.', 'error');
            }
        } catch (error) {
            this.addOutput(output, `❌ AI connection failed: ${error.message}`, 'error');
            this.addOutput(output, 'Built-in commands are still available.', 'error');
        }
    }

    addOutput(output, text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveTerminal();
});
