const TILE_GRADIENTS = [
    { from: "#ff6b6b", to: "#ee5a6f", border: "rgba(255, 107, 107, 0.4)", glow: "rgba(255, 107, 107, 0.3)" },
    { from: "#4ecdc4", to: "#44a3a0", border: "rgba(78, 205, 196, 0.4)", glow: "rgba(78, 205, 196, 0.3)" },
    { from: "#a78bfa", to: "#8b5cf6", border: "rgba(167, 139, 250, 0.4)", glow: "rgba(167, 139, 250, 0.3)" },
    { from: "#34d399", to: "#10b981", border: "rgba(52, 211, 153, 0.4)", glow: "rgba(52, 211, 153, 0.3)" },
    { from: "#fbbf24", to: "#f59e0b", border: "rgba(251, 191, 36, 0.4)", glow: "rgba(251, 191, 36, 0.3)" },
    { from: "#ec4899", to: "#db2777", border: "rgba(236, 72, 153, 0.4)", glow: "rgba(236, 72, 153, 0.3)" },
    { from: "#60a5fa", to: "#3b82f6", border: "rgba(96, 165, 250, 0.4)", glow: "rgba(96, 165, 250, 0.3)" },
    { from: "#f472b6", to: "#ec4899", border: "rgba(244, 114, 182, 0.4)", glow: "rgba(244, 114, 182, 0.3)" },
    { from: "#2dd4bf", to: "#14b8a6", border: "rgba(45, 212, 191, 0.4)", glow: "rgba(45, 212, 191, 0.3)" },
    { from: "#fb923c", to: "#f97316", border: "rgba(251, 146, 60, 0.4)", glow: "rgba(251, 146, 60, 0.3)" },
  ];

  const MOCK_RESPONSES = [
    { id: "r1", answer: "Bodies Left Behind in the Code", name: "Priya Sharma", occupation: "AI Ethics Researcher, India" , image: 'priya_sharma.jpeg',
       story: `
       In a small clinic outside Bhopal, a faint heartbeat flickers on a screen. An expectant mother watches an AI-powered prenatal app translate data into reassurance, it reads in her language: Hindi.
Across India, women from Gurgaon to rural Haryana use digital tools to track pregnancies, detect illness, and consult doctors remotely. 

“This digital leap is improving outcomes for women who once had almost no access to timely care,” says Shivangi, a health worker. Yet she knows progress must be fair. “Bias still lingers in the code, where cardiology algorithms misread women’s hearts,” she explains. “Progress means nothing if the data forgets who we are.”

Healthcare AI needs training data that includes diverse populations of women and minorities whose bodies have been medical afterthoughts for too long. We need algorithms that recognise hormonal cycles, pain patterns, and maternal health needs. That stops dismissing symptoms as "probably stress."
Her dream is simple yet radical: a world where her daughter’s body and voice are design priorities, not afterthoughts.
  `},
    { id: "r2", answer: `Global Reflections Redefining Progress`, name: "Anjali Mehta", occupation: "Data Scientist, Bangladesh" , 'image': 'priya_sharma2.jpeg',
       'story':`
      "I believe women can build a better world through technology," says Angelica, her voice steady with conviction. "But don't design for us. Design with us."
In Malawi, where only 10-16% of women access the internet, and in rural Philippines, healthcare apps promise miracles but rarely reach the villages, digital divides limit who benefits.
Thousands of miles away in Navi Mumbai, Aakanksha codes through the night. A Google Women Engineers Scholar, she's built SatyaScan to fight misinformation and EduNavigator to mentor girls like her younger self. "Bias isn't a bug you patch later," she says, eyes fixed on her screen. "It's a foundational flaw."
Across the ocean in Portland, Ann Marie uses AI for art and storytelling, but her patience is wearing thin. "Stop building AI we never asked for," she says. "Actually, ask what our needs are."
From Manila to Mumbai, from coding labs to rural clinics, women aren't waiting for permission anymore.
Because inclusion isn't a feature to be added later. It's the foundational code that everything else is built on. And we're rewriting it whether you're ready or not.
  `},
    { id: "r3", answer: `"When AI Finally Learns What Women's Bodies Have Been Saying All Along"`, name: "Fatima Khan", occupation: "Machine Learning Engineer, Pakistan", 'image': 'fatima_khan.jpg', 
      'story': `
      For decades, conditions like endometriosis and uterine fibroids were medical afterthoughts. Mental health and reproductive care? Even further behind. Women's pain was dismissed, their cycles ignored, and their maternal needs sidelined.
But technology is beginning to listen.
Across India and Pakistan, AI-powered healthcare apps now offer virtual checkups, pregnancy guidance, and early disease detection, bridging gaps that geography and bias created. In rural villages, a woman's body speaks a language healthcare has never learned to hear.
"Most women in rural Pakistan don't have internet access," says Neel, a 32-year-old student. "Period trackers, location sharing, telehealth—these aren't luxuries. They're safety nets we've never had."
Natasha and Angelica, health advocates, dream bigger: AI that recognises hormonal cycles, understands maternal health patterns, and stops dismissing symptoms as "probably stress." Healthcare designed by women, for women—not as an afterthought, but as the foundation.
The WHO calls it digital health equity. Women call it long overdue.
The question isn't whether AI can transform women's healthcare. It's whether we'll finally let women design the algorithms that understand their bodies—or keep building systems that were never meant to see them clearly.
` },
    { id: "r4", answer: `AI that brought a smile also became the reason for a girl to end her life.`, name: "Lakshmi Reddy", occupation: "Tech Policy Advisor, Sri Lanka", 'image': 'lakshmi_reddy.jpg', 
      'story': `"My father passed away when I was just 3 years old. I used AI to create photos of myself with my father, and it made me very happy."
Said Jouti, a college student from Haryana. “But on one end, as it became a source of happiness to me, it had also been the reason for a young girl in my town to commit suicide. Some time ago, her face was used to create nude images, and everyone believed those nudes were real. It's hampering everyone's privacy." A strong weapon with no guardrail can do more harm than good.

"I'm not very hopeful about AI as a woman,” a girl from Patna shared, reflecting on her witnessed experience of how rural women are especially targeted towards the misuse of AI, particularly with image generation, creating sexual content and blackmailing women. It is widely used to make negative content around women, and from the viewers' side, this is getting more reac,h too.

Just like Instagram AI trend reels go viral, awareness-related videos should also be popularly available so they reach everyone. From farmers to illiterate women and men in rural villages of India who don't have much digital knowledge often tend to become victims. They are not aware of security and privacy, so having proper educational content to raise awareness will help boost confidence, and they, too, will move forward with AI.
It’s high time the government runs programs to raise awareness about security concerns related to AI. Global AI policy guidelines shall be determined, with every country setting laws of punishment (fine or imprisonment) for committing crimes related to the misuse of AI. Special international laws are needed to put a check on how the data collected from the masses is actually used by these AI companies, and if the users have given consent to use their private information for training the Machine Learning Models. 

The same AI that can bring a smile amidst loss and grief can also be the reason for someone to end their life. The final call to use it is always in the hands of humans, not machines. So while making these systems, we shall be thinking like humans, not machines. `},
    { id: "r5", answer: `AI's Impact on Employment: A Journalist's Outlook`, name: "Nisha Patel", occupation: "Social Impact Technologist, India" , 'image': 'nisha_patel.jpg', 
      'story': `"People think AI is taking you one step forward when in reality it is taking you two steps backwards.”

"I always wanted to create my identity through my own name. I didn't want anyone to call me 'so-and-so's daughter' or 'so-and-so's sister' or 'so-and-so's wife.' From the beginning, I wanted to be known by my own name, and today, I've reached a point where people now know my family members by my name. I've endured bravery, self-dependence, and struggle, and today I've emerged as a fearless journalist. I'm originally from UP, living in Bihar alone for 3 years.” Shares Suman, a young Journalist from India. 

From her experience lately, she also shares how AI is rapidly killing journalism because it has replaced scriptwriters. With just a few words, you get scripts written and thumbnails ready, but the responses are very fabricated. This is ending realistic human output, especially in journalism.
AI creating images from news boardrooms has even led to the decline of field reporting and field reporter roles. This has ended humans' potential to think critically. People just pick up their phones and start scrolling. They don't make an effort anymore, don't try to go where incidents are happening. Everything is available sitting at home.
This has eliminated employment opportunities for so many people, or their minds have just shrunk. People can't think deeply anymore.
"People think AI is taking you one step forward when in reality it is taking you two steps backwards.”
Recently, the Bureau of Labor Statistics of America reported that 7.2 - 7.3 million people are unemployed due to AI and robots. From doctors performing surgeries to labourers in factories- AI is replacing humans. People find machines more reliable nowadays. But this has made people unemployed, which is very saddening. This online boost is breaking human relations.
`},
    { id: "r6", answer:`Grandma who became the Streaming Queen`, name: "Amara Singh", occupation: "Fairness Research Lead, Nepal" ,   'image': 'amara_singh.jpg', 
      'story': `
      One young woman summarised it perfectly: “Women in my family think 'AI' means robots or magic. But I’ve seen the pattern: first fear, then curiosity, then confidence.” - Meron, Ethiopia 

Every story has a beginning, and here, it often starts with fear of the mysterious buttons. Women in homes across India and neighbours across the region treated smartphones like ticking bombs. Shivangi, a girl from India shared: “My grandmother believed if she pressed the wrong button, the 'machine' would call Modi directly. So, she kept her distance…”


For weeks, the phone sat on the table like a museum piece. It was cleaned, admired, charged, but never touched. And then came the magic moment, the moment technology stopped being foreign and became personal. Someone casually mentioned, “You know, YouTube can show bhajans whenever you want.” Instant transformation. Fear evaporated. Curiosity took over. Within days, the same grandmother became, Shivangi  proudly said, “The streaming queen.”


She started subscribing to channels and adjusting video quality. The woman who once hid from the phone was now teaching others how to use it. 


It turns out, new technology isn’t intimidating when it speaks the language of daily life. When it helps with recipes, bills, devotion, children’s homework, or simply staying connected, mothers learn tech faster than anyone expects.

One young woman summarised it perfectly: “Women in my family think 'AI' means robots or magic. But I’ve seen the pattern: first fear, then curiosity, then confidence.” - Meron, Ethiopia 


And honestly, there’s something beautiful and hilarious about it. The same grandmother who once refused to swipe the screen now knows how to search recipes, listen to devotional songs, and send voice notes to relatives.
Not slow. Not hesitant. Just… streaming queen.
      `},
    { id: "r7", answer: `Education beyond Geography`, name: "Zara Ahmed", occupation: "Community Tech Organizer, Pakistan",    'image': 'zara_ahmed.jpg',
       'story': `
       In post-conflict Kurdistan, Iraq, technology became something unexpectedو and a rebuilding tool that opened doors faster than physical infrastructure could. A 26-year-old youth activist there watched digital education do what traditional systems couldn't: give women immediate access to skills, markets, and voices beyond borders.

“AI could help women access training in digital skills, entrepreneurship, and remote work, especially in areas where opportunities are limited.” - Resa, Kurdistan

In Kurdistan, women didn't wait for perfect conditions. They used what was available, smartphones, online platforms, to create pathways that geography and recent history tried to limit.
This pattern echoes across communities rebuilding in different ways. In Ethiopia, women navigate similar transitions. In rural India and Pakistan, different barriers create a similar hunger for access.

But something shifts when a girl in Punjab can learn the same coding course as someone in Silicon Valley. When an Ethiopian woman accesses the same business training as her urban counterpart. When a Pakistani teenager finds the same resources, regardless of the men around her controlling physical access. When a woman in Kurdistan can mentor or learn from someone continent.


Digital platforms don't erase inequality; infrastructure gaps persist. But they create possibilities that weren't there before. For women in communities rebuilding or breaking through traditional limitations, technology is transformational.
Geography used to be destiny. Now it's just a starting point.
` },
    { id: "r8", answer: "The Teacher Who Made Computers Human", name: "Riya Gupta", occupation: "Digital Anthropologist, India" ,   'image': 'riya_gupta.jpg', 
      'story': `
      For Ann Marie, the spark didn’t come from a gadget or an app, but from a person. Her earliest memory of technology is of a woman at the front of a classroom - teaching computers with confidence and warmth. “We assumed she was an expert simply because she was a woman teaching computers,” Ann Marie laughs. But that assumption planted something deep in her: the idea that visibility matters.
Years later, Ann Marie works in AI design and ethics. She builds tools meant to empower, not exploit. “AI can do amazing things,” she says, “but if empathy isn’t part of the process, we end up with innovation that excludes the very people it should serve.” She often thinks of that teacher - standing before a room of unsure students, turning hesitation into hope. It reminds her that technology doesn’t just need intelligence; it needs heart. The woman who once taught her to press “save” taught her something far greater - that progress must never come at the cost of compassion.
` },
    { id: "r9", answer: `
Safety First, or Learning Stops
`, name: "Maya Perera", occupation: "Data Justice Advocate, Sri Lanka",  'image': 'maya_perera.jpg', 
'story': `
“We attended a Safe Sisters program for cybersecurity… how to stop cyber bullying on the internet.” - Student teacher, Lusaka, Zambia
The promise of online classrooms collapses if being online feels like walking alone at night. An Indian student asks for tools to “proactively detect and block harassment or deepfakes.” A software engineer in Oregon flags “AI-generated female influencers… hyper sexualized,” a signal that the same models used for learning are also used for harm.
Data echoes these stories: in the Asia-Pacific region, 60% of women MPs report online hate/disinformation attacks, and harassment doesn’t spare even the most visible women. Inter-Parliamentary Union+1 UN Women tracks rising online violence, with country studies showing alarming prevalence of image-based abuse. UN Women Asia and the Pacific. The World Bank calls for coordinated responses: safety-by-design, redress routes, and literacy. World Bank Blogs
Safety isn’t a feature request; it is the precondition. When women feel protected, they stay, learn, 

` },
    { id: "r10", answer: `The Classroom of Tomorrow`, name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg',
       'story': `Every morning in a small school in Tamil Nadu, Meera chalks out lesson plans on the blackboard. But her classroom buzzes with anticipation right after she opens her laptop, and her ten students gather around. Their new helper is an AI assistant: it translates instructions, suggests personalised quizzes, and nudges shy pupils to engage. “At first, I was sceptical,” Meera recalls. “Would this machine know my students better than I do?”
Weeks pass, and change emerges. Group discussion grows, students show confidence answering questions, and they eagerly try the new digital reading exercises. Little Ananya, once silent at the back, now answers aloud, sometimes even correcting Meera’s Tamil translations. “Technology didn’t replace me,” Meera smiles, “it made me more attentive to what matters.”
The local Ministry reports hybrid classrooms with teacher-led AI tools raised comprehension by almost 40%. Peer teachers in the research group describe similar outcomes where rural girls who struggled with spelling suddenly mastered vocabulary; shy children excelled at quizzes generated just for them.
Still, Meera warns, “AI doesn’t see everything- a teacher knows when a child’s silence means more than a missed answer.” Community chats reveal hopes: that training continues, that local languages are supported, and that new tools honour empathy, not just automation.`},
{ id: "r11", answer: `“Invisible Smoke: The Environmental Cost of Ungoverned AI”`, name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg',
  'story': `“If AI can predict climate change, then AI companies should also be accountable for worsening it.”
In a small town near Hyderabad, the power flickers again. My dad, a local internet café owner, laughs softly.. “Maybe the data centres are eating all our electricity.” It’s meant as a joke, but he’s not far off. On the city’s outskirts, new server farms hum night and day, cooling thousands of GPUs running AI models that most of the town’s residents will never use. While the machines learn, the river runs a little warmer, cooling water is discharged from unregulated facilities, and electricity bills rise for everyone else.“We thought technology was light,” our neighbour says. “But it’s heavy: on our air, our water, our power.” https://www.businessinsider.com/ai-runs-dirty-power-and-the-public-pays-the-price-2025-6
I can see a growing unease: AI promises efficiency, but hides its footprint. Training large models demands massive energy and water resources, often in regions already facing power shortages or drought. Yet there is no clear governance for measuring or mitigating these impacts.
Energy strain & emissions: A single advanced AI model can emit up to 300-500 tons of CO₂ during training, comparable to five cars running over their lifetime. (University of Massachusetts Amherst, 2023)


Water usage: Cooling systems for data centres consume millions of litres daily. Microsoft disclosed that its global water use rose 34% in one year, largely due to AI infrastructure growth (Reuters, 2024).
From India to Zambia, participants demand transparency and accountability from the AI industry and its enablers: Mandatory Environmental Impact Assessments (EIA) for AI data centres and cloud facilities, Carbon labelling for major AI products and models, like nutritional labels for emissions, Community inclusion in decision-making before large data facilities are established near towns or ecologically sensitive areas. `},
{ id: "r12", answer: `“Governance by Algorithm: Loss of responsible & answerable bodies”`, name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg',
  'story': `“Actually ask what our needs are, listen to our voices, and stop giving us AI we never asked for”, Ann Marie Mossman, 48, a mother & software engineer from Portland. I am Natasha. I come from  a village of Uttar Pradesh, the Ration Distribution Officer of our locality, Ravi says, “We’ve started using the AI tool to rank beneficiaries of the pension scheme.” He scrolls through a dashboard that flashes red alerts next to thousands of names flagged as ineligible. 
A mother of two, our house help & a regular beneficiary of the scheme, Lakshmi, receives nothing this month. She visits the welfare office, shows her Aadhaar, and her family ration card, but the screen says “Rejected”. The clerk shrugs: “You can file a grievance, but the algorithm flagged you.” As a result, Lakshmi finds herself dreading managing ration supply & school fees now. 
As these algorithmic systems shape life-changing resources (old-age pensions, scholarships, housing), In parallel, studies show that algorithmic governance without proper design may replicate and amplify inequalities. The chief justice of India warned that the use of AI in policing may disproportionately target marginalised communities. In India, technology experts warn that the rapid rollout of AI in welfare and justice may reinforce caste, class, and gender discrimination. 

From the district offices to village panchayats, there is an emerging demand among citizens for consent, transparency and bias removal while designing these systems.`},
{ id: "r13", answer: `“Do you also have an AI-generated Ghibli profile picture? Study on Data Theft and Reverse-Engineered Identity”`, name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg',
  'story': `“ The conversion of human culture into machine capital: Loss of control over identity and creative work”, Nisha from Pune, a Fashion design student
I am Nisha, a 19-year-old & a design college student in Pune. I uploaded my digital art portfolio online, portraits I drew to showcase my style to potential clients. Later, I discovered AI-generated artwork on the web mimicking my brushstrokes, signed by a machine(via watermark).
My mother sees a photo of me being used in a foreign language advertisement for a beauty brand I have never heard of. I did try to convince my mom that I never shared the picture, but then how did it respawn there? Perhaps I participated in the Instagram trend of enhancing your pictures with a prompt. My techie brother explains well, “Your output images can be very well reverse engineered, especially when there is  a dire need for real raw data in this era of training-data scarcity!”
While AI promises creativity and convenience, its hunger for data has turned the internet into an unregulated training ground- absorbing faces, bodies, art, voices, and personal photos. Reverse-engineering technologies now allow reconstruction of identifiable faces from low-resolution images and even from blurred or pixelated datasets.. a process documented in recent studies by Stanford (2024) and MIT CSAIL (2023). These tools, meant for restoration or security, are increasingly weaponised for stalking, doxxing, and impersonation.`},
{ id: "r13", answer: `“Do you also have an AI-generated Ghibli profile picture? Study on Data Theft and Reverse-Engineered Identity”`, name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg',
  'story': `“ The conversion of human culture into machine capital: Loss of control over identity and creative work”, Nisha from Pune, a Fashion design student
I am Nisha, a 19-year-old & a design college student in Pune. I uploaded my digital art portfolio online, portraits I drew to showcase my style to potential clients. Later, I discovered AI-generated artwork on the web mimicking my brushstrokes, signed by a machine(via watermark).
My mother sees a photo of me being used in a foreign language advertisement for a beauty brand I have never heard of. I did try to convince my mom that I never shared the picture, but then how did it respawn there? Perhaps I participated in the Instagram trend of enhancing your pictures with a prompt. My techie brother explains well, “Your output images can be very well reverse engineered, especially when there is  a dire need for real raw data in this era of training-data scarcity!”
While AI promises creativity and convenience, its hunger for data has turned the internet into an unregulated training ground- absorbing faces, bodies, art, voices, and personal photos. Reverse-engineering technologies now allow reconstruction of identifiable faces from low-resolution images and even from blurred or pixelated datasets.. a process documented in recent studies by Stanford (2024) and MIT CSAIL (2023). These tools, meant for restoration or security, are increasingly weaponised for stalking, doxxing, and impersonation.`},
  ];

  (function(){
      const cardsContainer = document.getElementById('cardsContainer');
      const slots = Array.from(document.querySelectorAll('.slot'));
      const collectionCountEl = document.getElementById('collectionCount');
      const body = document.body;
      const MAX = slots.length;
      let collected = [];

       function viewCollection(collected){
         
          localStorage.setItem('selected_collection', JSON.stringify(collected));
         
          window.location.href = 'scene3.html';
      }

      function updateUI(){
        if (collected.length === 4) {
            const div = document.createElement('div');
            div.className = "fixed bottom-8 left-1/2 -translate-x-1/2 p-6 rounded-2xl backdrop-blur-lg border border-[var(--accent-glow)]/50 bg-gradient-to-r from-[var(--accent-glow)]/20 to-[var(--deep-lilac)]/20 shadow-2xl max-w-md text-center";
            div.style.opacity = "1";
            div.style.transform = "none";
            div.innerHTML = `
                <div style="box-shadow: rgba(199, 184, 255, 0.573) 0px 0px 47.2243px;">
                    <p class="text-[var(--soft-light)] mb-2">Collection Complete! ✨</p>
                    <p class="text-sm text-[var(--water-silver)] opacity-80 mb-4">You've collected 4 resonant reflections</p>
                    <button class="view-collection w-full px-6 py-3 rounded-xl backdrop-blur-lg border border-[var(--accent-glow)]/60 bg-[var(--accent-glow)]/20 text-[var(--soft-light)] hover:bg-[var(--accent-glow)]/30 hover:border-[var(--accent-glow)]/80 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-glow)]/30" tabindex="0" style="transform: none;" >View Your Collection</button>
                </div>
            `;
            body.appendChild(div);
        }
        const viewCollectionBtn = document.querySelector('.view-collection');
          if(viewCollectionBtn)
          {
            viewCollectionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewCollection(collected);
          });
          }
          collectionCountEl.textContent = `${collected.length}/${MAX}`;
          slots.forEach((s, i) => {
              if (collected[i]) {
                  s.classList.add('filled');
                  s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-5 h-5 text-[var(--accent-glow)]" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>';
              } else {
                  s.classList.remove('filled');
                  s.textContent = '';
              }
          });
          
      }
      
     
      
      function createCard(response, index){
        const g = TILE_GRADIENTS[index % TILE_GRADIENTS.length];
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-author', response.name);
        card.id = `${response.id}`;
        card.tabIndex = 0;
    
        const frontStyle = ` background: linear-gradient(135deg, ${g.from}15, ${g.to}08); box-shadow: 0 10px 40px ${g.glow}, 0 0 20px ${g.glow}; border-color: ${g.border},`;
        const backStyle = `background: linear-gradient(135deg, ${g.from}25, ${g.to}15); border-color:  ${g.border}; box-shadow: 0 10px 40px ${g.glow}, 0 0 30px ${g.glow};`;
    
        card.innerHTML = `
            <div class="card-inner flex">

  <!-- FRONT FACE -->
  <div class="face front" style="
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      ${frontStyle}
  ">
    <!-- Background image and overlay (only for front) -->
    <div style="
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: url('${response.image}') center/cover no-repeat;
        z-index: 0;
    "></div>

    <div style="
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
    "></div>

    <!-- Front content -->
    <div style=" height:100%; position: relative; z-index: 2; padding: 1rem; display:flex; flex-direction:column; align-content:space-between; ">
      <div class="flex-1 flex items-center" style="margin:0; font-size:1rem; line-height:1.3; color:var(--soft-light); justify-self:center;">
        ${response.answer}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="tap-hint">Tap to reveal</span>
        <span class="is-collected" style="color:var(--water-silver); font-size:.9rem;"></span>
      </div>
    </div>
  </div>

  <!-- BACK FACE -->
<div class="face back" style="${backStyle}" id="back-face-${response.id}">
  <div style="text-align:center;">
    <h3 style="margin:0 0 .25rem; color:var(--soft-light);">${response.name}</h3>
    <p style="margin:0 0 1rem; color:var(--water-silver); font-size:.9rem;">${response.occupation}</p>
    
    <!-- Story text (short preview + View More button) -->
    <p class="story-text" style="color:var(--water-silver); font-size:.9rem;">
      ${response.story.length > 120 ? response.story.substring(0, 120) + "..." : response.story}
      ${response.story.length > 120 ? `<br><a href="#" class="view-more" style="color: var(--accent-glow); font-size: .85rem; text-decoration: underline;">View More</a>` : ""}
    </p>
  </div>

  <button class="collect-btn w-full py-3 rounded-xl border transition-all duration-300" tabindex="0" style="color: rgb(230, 240, 255); cursor: pointer;">
    <span class="flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4" aria-hidden="true">
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0-1.594-1.594z"></path>
        <path d="M20 2v4"></path>
        <path d="M22 4h-4"></path>
        <circle cx="4" cy="20" r="2"></circle>
      </svg>
      Collect This Response
    </span>
  </button>
</div>

        `;
        return card;
    }

      
      MOCK_RESPONSES.forEach((r, i) => {
          const c = createCard(r, i);
          cardsContainer.appendChild(c);
      });

      
      const cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach(card => {
        console.log(card);
          const btn = card.querySelector('.collect-btn');

          
          const setButtonState = () => {
              if (!btn) return;
              // already collected
              if (card.classList.contains('collected')) {
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Collected</span>';
                  return;
              }

             
              if (collected.length >= MAX) {
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2">Collection Limit Reached</span>';
                  return;
              }

              
              btn.disabled = false;
              btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>Collect This Response</span>';
          };

          card.addEventListener('click', (e) => {
              if (btn && (e.target === btn || btn.contains(e.target))) return;
              const willFlipToBack = !card.classList.contains('is-flipped');
              card.classList.toggle('is-flipped');
              
              if (willFlipToBack) setButtonState();
          });

          card.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const willFlipToBack = !card.classList.contains('is-flipped');
                  card.classList.toggle('is-flipped');
                  if (willFlipToBack) setButtonState();
              }
          });

          if (btn) {
              btn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (card.classList.contains('collected')) {
                      alert('Already collected');
                      return;
                  }
                  if (collected.length >= MAX) {
                      alert('Collection is full');
                      return;
                  }
                  response = MOCK_RESPONSES.find(r => r.id === card.id);
                  collected.push(response);
                  card.classList.add('collected');
                  card.getElementsByClassName('is-collected')[0].textContent = '✓ Collected';
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Collected</span>';
                  card.classList.add('is-flipped');
                  // Store collection in localStorage whenever it changes
                  localStorage.setItem('girlswhoml_collection', JSON.stringify(collected));
                  updateUI();
                  console.log('Collected:', collected);
              });
          }
      });

      
     
      updateUI();
  })();