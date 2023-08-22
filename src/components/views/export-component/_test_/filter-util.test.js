import { 
  applyAnsweredFilter, 
  applyUnAnsweredFilter, 
  applyMyUserRoleFilter,
  applyMileStonesFilter,
  applyNotApplicableFilter,
  applyinterestedPartiesFilter 
} from "../filter-util";

const questions = [
  {
    question: 'What is your name?',
    answers: [
      { answer: 'John' },
      { answer: 'Doe' },
      { answer: '' },
    ],
    notApplicable: true,
    interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B",
    milestone: "Budget",
    milestoneNew: [
      {
        "Name": "Budget",
        "Color": "#00c221"
      }
    ],
    roleNames: ["Proposal Developer"]
  },
  {
    question: 'What is your favorite color?',
    answers: [
      { answer: 'Blue' },
    ],
    notApplicable: true,
    interestedParties: "",
    milestoneNew: [
      {
        "Name": "Team",
        "Color": "#595959"
      }
    ],
    roleNames: ["Analytics Strategy Lead"]
  },
  {
    question: 'What is your favorite food?',
    answers: [],
    notApplicable: false,
    interestedParties: "",
    milestoneNew: [],
    roleNames: []
  },
  {
    question: 'What is the meaning of life?',
    notApplicable: false,
    interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B,Medical Strategy Lead",
    milestoneNew: [],
    roleNames: []
  },
];

const interestedParties = "Analytics Strategy Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,TSL";
const milestones = [
  {    
      "Name": "Budget",
      "Color": "#00c221"
  },
];

describe('applyAnsweredFilter', () => {
test('filters out unanswered questions', () => {
  const filteredQuestions = applyAnsweredFilter(questions);
  expect(filteredQuestions).toEqual([
      {
          question: 'What is your favorite color?',
          answers: [
            { answer: 'Blue' },
          ],
          notApplicable: true,
          interestedParties: "",
          milestoneNew: [
            {
              "Name": "Team",
              "Color": "#595959"
            }
          ],
          roleNames: ["Analytics Strategy Lead"]
      },
  ]);
});

test('filters out answered questions', () => {
  const filteredQuestions = applyUnAnsweredFilter(questions);
  expect(filteredQuestions).toEqual([
      {
          question: 'What is your name?',
          answers: [
            { answer: 'John' },
            { answer: 'Doe' },
            { answer: '' },
          ],
          notApplicable: true,
          interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B",
          milestone: "Budget",
          milestoneNew: [
            {
              "Name": "Budget",
              "Color": "#00c221"
            }
          ],
          roleNames: ["Proposal Developer"]
      },
      {
          question: 'What is your favorite food?',
          answers: [],
          notApplicable: false,
          interestedParties: "",
          milestoneNew: [],
          roleNames: []
      },
  ]);
});

test("filter not applicable questions", () => {
  const filteredQuestions = applyNotApplicableFilter(questions);
  expect(filteredQuestions).toEqual([
      {
          question: 'What is your favorite food?',
          answers: [],
          notApplicable: false,
          interestedParties: "",
          milestoneNew: [],
          roleNames: []
      },
      {
          question: 'What is the meaning of life?',
          notApplicable: false,
          interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B,Medical Strategy Lead",
          milestoneNew: [],
          roleNames: []
      },
  ]);
});

test("should return all questions if user role is not found in local storage", ()=> {
  localStorage.removeItem('userRole');
  const filteredQuestions = applyMyUserRoleFilter(questions);
  expect(filteredQuestions).toEqual(questions);
});

test("should return only questions assigned to the user\'s role", ()=> {
  localStorage.setItem('userRole', 'Proposal Developer');
  const filteredQuestions = applyMyUserRoleFilter(questions);
  expect(filteredQuestions).toEqual([
    {
      question: 'What is your name?',
      answers: [
        { answer: 'John' },
        { answer: 'Doe' },
        { answer: '' },
      ],
      notApplicable: true,
      interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B",
      milestone: "Budget",
      milestoneNew: [
        {
          "Name": "Budget",
          "Color": "#00c221"
        }
      ],
      roleNames: ["Proposal Developer"]
    },
  ]);
});

test("should return all questions if a question has no assigned roles", ()=> {
  localStorage.setItem('userRole', 'user');
  const filteredQuestions = applyMyUserRoleFilter(questions);
  expect(filteredQuestions).toEqual([]);
});

test("filter interested parties questions", ()=> {
  const filteredQuestions = applyinterestedPartiesFilter(questions, interestedParties);
  expect(filteredQuestions).toEqual([]);
});

test("filter milestones questions", ()=> {
  const filteredQuestions = applyMileStonesFilter(questions, milestones);
  expect(filteredQuestions).toEqual([]);
});

test("should filter only milestone question", ()=> {
  const questions = [
    {
      question: 'What is the meaning of life?',
      notApplicable: false,
      interestedParties: "Analytics Strategy Lead,Business Developer,Clinical DS&B,Medical Strategy Lead",
      milestone: "Budget",
      milestoneNew: [],
      roleNames: []
    },
  ];
  const filteredQuestions = applyMileStonesFilter(questions, milestones);
  expect(filteredQuestions).toEqual([]);
})
});