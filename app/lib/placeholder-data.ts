const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];


const alltutorials = [
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      slug: 'what-is-electrical-charge',
      title: 'What is electrical force?',
      image_url: '/em/bohr_model.jpg',
      image_url_2: '/em/atomic-theory-atomic-nucleus.jpg',
      date: '20204-07-23',
      content: 'Most objects in our visible and tangible world in electrical neutrality conceals their content of positive and negative "matter," which we call positive and negative charges. Only when this neutrality is disturbed does nature reveal to us the effects of imbalance of positive or negative charge. A body is "charged" it means it has an imbalance of negative and positive charges. Charged bodies exert forces on each other.\n\
                To show this, we will explore an electrical interaction demonstration, so hopefully, you\'ll be ready to roll up your sleeves and dive in!\nYou\'ll see there are two kinds of charge, which we can call positve and negative. The simple \'experiment\' can be explained with: \n Like kinds repel and opposite kinds attract.\nAll matter is a mixture of positve protons and negative electrons which are attracting and repelling with this great force called electrical force. How big is this force compared to gravitation? It is about a few billion times stronger!\n',
      qSlug: 'electrical-charge-tutorial-questions',
    },
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      slug: 'coulomb-law',
      title: 'Coulomb\'s Law and Superposition',
      image_url: '/em/charles_de_coulomb.jpg',
      image_url_2: '/em/coulomb-s-law-force-electricity-electric-charge.jpg',
      date: '2024-07-23',
      content: 'He was born on 14 June 1736 and died on 23 August 1806, was a French officer, engineer, and physicist. He is best known as the eponymous discoverer of what is now called Coulombs Law, the description of the electrostatic force of attraction and repulsion. He also did important work on friction. The SI unit of electric charge, the coulomb, was named in his honor in 1880.',
      qSlug: 'coulomb-law-questions'
    },
    {
      id: '21e31364-044a-4b7c-ba03-9c4cd19ac1ca',
      slug: 'electric-field',
      title: 'Electric Field and the FLux of E!',
      image_url: '/em/e_flux.jpg',
      image_url_2: '/em/electric_field.jpg',
      date: '2024-07-23',
      content: 'Electric field is typically represented in two ways: by vectors or by electric field lines.',
      qSlug: 'electric-field-questions'
    },
    {
      id: '733359cb-7f18-4fc6-93e5-a1438f0acdcc',
      slug: 'gauss-law',
      title: 'Gauss Law',
      image_url: '/em/gauss_law.jpg',
      image_url_2: '/em/gauss_law_2.jpg',
      date: '2024-07-23',
      content: 'Electric flux through a Guassian surface is directly proportional to the net charge enclosed by the surface.',
      qSlug: 'gauss-law-questions'
    },
    {
      id: '898b6bb5-eca8-42d8-bc8b-78919543cb36',
      slug: 'calculus-vector-field',
      title: 'Understanding physics. Differential Calculus of Vector Fields',
      image_url: '/em/heat_flow_vector_field.jpg',
      image_url_2: '/em/fluid_flow_vector.png',
      date: '2024-07-23',
      content: 'There is only one precise way of present the laws, and that is by means of differential equations. They have the advantage of being fundamental and, so far as we know, precise. But the equations are complicated, after all they are only mathemathical equations and if I understand them mathematically inside out, I will understand the physics inside out. Only it does not work that way. People who think that way fail because the actual physical situations in the real world are so complicated that it is necessary to have a much broader understanding of the equations. What it means to understand an equation in more than a strictly mathematical sense - was described by Diract. He said, "I understand what an equation means if I ahve a way of figuring out the characteristics of its solution wihtout actually solving it." So if we have a way of knowing what should happen in given circumstances without actually solving the equations, then we "understand" the equations, as applied to these circumstances. A physical understanding is a completely unmathematical, imprecise, and inexact thing, but absolutely necessary for a physicist.',
      qSlug: 'calculus-vector-field-questions'
    },
    {
      id: 'a28bdf71-a716-4914-9c6b-11959a483183',
      slug: 'application-em-tech',
      title: 'Electromagnetism in science and techonology',
      image_url: '/em/em_in_science_tech.jpg',
      image_url_2: '/em/em_mri.jpg',
      date: '2024-07-23',
      content: 'It is amazing to think and realize that there are many phenomena of chemical interactions and of life itself are to be understood in terms of electromgenetism.',
      qSlug: 'application-em-tech-questions'
    },
  
  ];

 

const questions = [

  {
    id: '0d185f52-ade4-4ee1-a103-f0eae3d94c20',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    type: 'short_answer',
    question: 'Blow up the balloon, and rub it on your hair. Describe the behavior of your hair as you bring the balloon toward it.',
    correctAnswer: 'Your hair is attracted toward the balloon.'
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    type: 'short_answer',
    question: 'It is important that as you perform the experiment above, that you keep your hands and other objects away your hair. Explain why this is necessary',
    correctAnswer: 'Your hands or other object can \'discharge\' the balloon or your hair.',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    type: 'short_answer',
    question: 'Rub the PVC pipe with the Swiffer Duster. Bring the PVC pipe to your hair. Describe your observations',
    correctAnswer: 'The PVC pipe will also attract your hair.',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    type: 'short_answer',
    question: 'How does the distance between the pipe and your hair affect the interaction between them',
    correctAnswer: 'the closer the pipe to your hair, the stronger the attraction!',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    type: 'short_answer',
    question: 'what would happen if you brought the PVC pipe and the balloon near each other? Describe the interaction?',
    correctAnswer: 'They wil repel each other!',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    tutorial_id: alltutorials[1].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    type: 'short_answer',
    question: 'Indicate the direction of the electric force exerted on each charge by the other charge? (note, the two charges are both positive).',
    correctAnswer: 'The arrow are pointing away from each other.',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    tutorial_id: alltutorials[1].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    type: 'multiple_choice',
    question: 'Is the force on the +q charge by the +Q charge greater than, less than, or equal to the force on the +Q by the +q charge.',
    options: ['greater', 'less than', 'equal'],
    correctAnswer: 'equal'
  },

  {
    id: '3839107c-f5af-4ca1-bb85-c1e3779810ba',
    tutorial_id: alltutorials[1].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    type: 'short_answer',
    question: 'Explain your answer above',
    correctAnswer: 'Newton\'s Third law, equal and opposite force.',
  },

]

const answerOptions = [
  {
    tutorial_id: alltutorials[1].id,
    question_id: questions[6].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    question: 'Is the force on the +q charge by the +Q charge greater than, less than, or equal to the force on the +Q by the +q charge.',
    option_text: 'greater',
    is_correct: false 
  },
  {
    tutorial_id: alltutorials[1].id,
    question_id: questions[6].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    question: 'Is the force on the +q charge by the +Q charge greater than, less than, or equal to the force on the +Q by the +q charge.',
    option_text: 'less than',
    is_correct: false,
  },

  {
    tutorial_id: alltutorials[1].id,
    question_id: questions[6].id,
    tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    question: 'Is the force on the +q charge by the +Q charge greater than, less than, or equal to the force on the +Q by the +q charge.',
    option_text: 'equal',
    is_correct: true,
  },

]


const shortAnswers = [

  {
  tutorial_id: alltutorials[0].id,
   question_id: questions[0].id,
   tutorial_slug: 'what-is-electrical-charge',
   qSlug: 'electrical-charge-tutorial-questions',
    question: 'Blow up the balloon, and rub it on your hair. Describe the behavior of your hair as you bring the balloon toward it.',
    correctAnswer: 'Your hair is attracted toward the balloon.'
  },
  {
    tutorial_id: alltutorials[0].id,
    question_id: questions[1].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    question: 'It is important that as you perform the experiment above, that you keep your hands and other objects away your hair. Explain why this is necessary',
    correctAnswer: 'Your hands or other object can \'discharge\' the balloon or your hair.',
  },
  {
   tutorial_id:alltutorials[0].id,
   question_id: questions[2].id,
   tutorial_slug: 'what-is-electrical-charge',
   qSlug: 'electrical-charge-tutorial-questions',
    question: 'Rub the PVC pipe with the Swiffer Duster. Bring the PVC pipe to your hair. Describe your observations',
    correctAnswer: 'The PVC pipe will also attract your hair.',
  },
  {
   tutorial_id: alltutorials[0].id,
   question_id: questions[3].id,
   tutorial_slug: 'what-is-electrical-charge',
   qSlug: 'electrical-charge-tutorial-questions',
    question: 'How does the distance between the pipe and your hair affect the interaction between them',
    correctAnswer: 'the closer the pipe to your hair, the stronger the attraction!',
  },
  {
   tutorial_id: alltutorials[0].id,
   question_id: questions[4].id,
   tutorial_slug: 'what-is-electrical-charge',
   qSlug: 'electrical-charge-tutorial-questions',
    question: 'what would happen if you brought the PVC pipe and the balloon near each other? Describe the interaction?',
    correctAnswer: 'They wil repel each other!',
  },
  {
   tutorial_id: alltutorials[1].id,
   question_id: questions[5].id,
   tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    question: 'Indicate the direction of the electric force exerted on each charge by the other charge? (note, the two charges are both positive).',
    correctAnswer: 'The arrow are pointing away from each other.',
  },

  {
   tutorial_id: alltutorials[1].id,
   question_id: questions[7].id,
   tutorial_slug: 'coulomb-law',
    qSlug: 'coulomb-law-questions',
    question: 'Explain your answer above',
    correctAnswer: 'Newton\'s Third law, equal and opposite force.',
  },

]

const studentAnswers = [
  {
    tutorial_id: alltutorials[0].id,
    question_id: questions[0].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    question: 'Blow up the balloon, and rub it on your hair. Describe the behavior of your hair as you bring the balloon toward it.',
    answer: 'the hair stands up and sticks to the balloon.',
  },

 {
    tutorial_id: alltutorials[0].id,
    question_id: questions[1].id,
    tutorial_slug: 'what-is-electrical-charge',
    qSlug: 'electrical-charge-tutorial-questions',
    question: 'It is important that as you perform the experiment above, that you keep your hands and other objects away your hair. Explain why this is necessary',
    answer: 'this is alo a test',
  }
]

const demoEquipment = [
  {
    id: 'a28bdf71-a716-4914-9c6b-11959z489083',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
     qSlug: 'electrical-charge-tutorial-questions',
    equipment: 'PVC pipe or wooden stick',
  },   
  {
    id: 'a28bdf71-a716-4914-9c6b-11959v423183',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
     qSlug: 'electrical-charge-tutorial-questions',
    equipment: 'Rubber balloon',
  },   
  {
    id: 'a28bdf71-a716-4914-9c6b-11959n445183',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
     qSlug: 'electrical-charge-tutorial-questions',
    equipment: 'Uxcell Polyester Nylon Plastic Rope',
  },
  {
    id: 'a28bdf71-a716-4914-9c6b-11959k467183',
    tutorial_id: alltutorials[0].id,
    tutorial_slug: 'what-is-electrical-charge',
     qSlug: 'electrical-charge-tutorial-questions',
    equipment: 'Swiffer Duster or something made out of nylon or wool',
  },   
]

export {alltutorials, users, questions, answerOptions, shortAnswers, studentAnswers, demoEquipment};