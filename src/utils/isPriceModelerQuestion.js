// @flow
const isPriceModelerQuestion = (
  questionId: string,
  questions: any
): boolean => {
  const PRICE_MODELER_SF_FIELDS = [
    'Therapy_Area__c',
    'Number_of_Sites__c',
    'Phase_P__c',
    'Patients_Enrolled__c',
    'Potential_Regions__c'
  ];
  if (Array.isArray(questions) && questions.length > 0) {
    const question = questions.find(item => item.questionId === questionId);
    return PRICE_MODELER_SF_FIELDS.includes(question.sfField);
  }
  return false;
};

export default isPriceModelerQuestion;
