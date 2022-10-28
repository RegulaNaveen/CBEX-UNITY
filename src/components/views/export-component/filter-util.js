export const applyAnsweredFilter = questions => {
  const filteredQuestions = questions.filter(question => {
    let answers;
    try {
      answers = question.answers;
    } catch (error) {
      answers = [];
    }
    try {
      return (
        answers &&
        answers.length &&
        String(answers[answers.length - 1].answer).trim().length > 0
      );
    } catch (error) {
      return false;
    }
  });
  return filteredQuestions;
};

export const applyUnAnsweredFilter = questions => {
  let filteredQuestions;
  filteredQuestions = questions.filter(question => {
    let answers;
    try {
      answers = question.answers;
    } catch (error) {
      answers = [];
    }
    try {
      return (
        (answers &&
          answers.length &&
          !Boolean(String(answers[answers.length - 1].answer).trim().length)) ||
        !Boolean(answers.length)
      );
    } catch (error) {
      return false;
    }
  });
  return filteredQuestions;
};

export const applyNotApplicableFilter = questions => {
  let filteredQuestions;
  filteredQuestions = questions.filter(question => {
    let na;
    try {
      na = question.notApplicable;
    } catch (error) {}
    try {
      return !na;
    } catch (error) {
      return false;
    }
  });
  return filteredQuestions;
};

export const applyMyUserRoleFilter = questions => {
  const role = localStorage.getItem('userRole') || '';
  let filteredQuestions;
  if (role) {
    filteredQuestions = questions.filter(question => {
      let assignedRoles = '';
      try {
        assignedRoles = question.roleNames || '';
      } catch (error) {}
      return assignedRoles.includes(role);
    });
  }
  return filteredQuestions || questions;
};

export const applyinterestedPartiesFilter = (questions, selectedParty) => {
  const role = selectedParty;
  let filteredQuestions;
  if (role) {
    filteredQuestions = questions.filter(question => {
      let assignedRoles = '';
      try {
        assignedRoles = question.interestedParties || '';
      } catch (error) {}
      return assignedRoles.includes(role);
    });
  }
  return filteredQuestions || questions;
};

export const applyMileStonesFilter = (questions, milestones) => {
  let filteredQuestions;
  let map = {};
  const isNewMileStone = questions.some(
    question =>
      question.milestoneNew &&
      Array.isArray(question.milestoneNew) &&
      question.milestoneNew.length
  );
  milestones.forEach(milestone => {
    map[milestone] = milestone;
  });

  if (milestones) {
    filteredQuestions = questions.filter(question => {
      let { milestoneNew, milestone } = question;
      if (isNewMileStone && milestoneNew) {
        return question.milestoneNew.some(milestoneObject => {
          let { Name } = milestoneObject;
          return Boolean(map[Name]);
        });
      } else if (milestone) {
        return Boolean(map[milestone]);
      }
      return false;
    });
  }
  return filteredQuestions || questions;
};
