
export function createPdf(content) {
    let {data : {proposalQuestions, proposal : {proposalDetails}}, notes, filterState, image } = content;

    console.log(filterState);
    
    const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);
}