

import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	Home: undefined;
	Question: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type QuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Question'>;
