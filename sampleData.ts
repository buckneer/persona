


export type QuestionType = {
	id: number,
	question: string,
}

export const getQuestions = () => {
	return [
		{
			id: 1,
			question: "Lako reagujem na tuđa osećanja",
		},
		{
			id: 2,
			question: "Uživam u usamljeničkim šetnjama",
		},
		{
			id: 3,
			question: "Ja češće i više razmišljam nego što osećam",
		},
		{
			id: 4,
			question: "Volim da se izolujem od spoljašnje buke",
		}
	]
}
