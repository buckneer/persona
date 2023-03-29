import {Alert, Animated, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import questionImage from "../assets/questionSvg.svg";
import QuestionSvg from "../assets/QuestionSvg";
import { FontAwesome }  from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import Slider from "@react-native-community/slider";
import {useEffect, useState} from "react";
import {QuestionScreenNavigationProp} from "../RootStackParamList";
import {getQuestions, QuestionType} from "../sampleData";
import AnimatedView from "react-native-reanimated/lib/types/lib/reanimated2/component/View";
import {findAll} from "../firebase/services";
import Spinner from 'react-native-loading-spinner-overlay';


type Props = {
	navigation: QuestionScreenNavigationProp
}

export default function Question({navigation} : Props) {


	const [answer, setAnswer] = useState(3);
	const [questions, setQuestions] = useState<QuestionType[]>(getQuestions());
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [loading, setLoading] = useState(false);


	// Animations
	const { height } = Dimensions.get('window');
	const [newQuestionAnim] = useState(new Animated.Value(height));
	const [currentQuestionAnim] = useState(new Animated.Value(0));

	const fetchData = async () => {

		setLoading(true);
		const res = await findAll();

		res.sort(function(a, b) {
			return a.id - b.id;
		});

		setLoading(false);
		setQuestions(res);
	}



	useEffect(() => {
		fetchData();
	}, [])


	useEffect(() => {
		setCurrentQuestion(questions[currentQuestionIndex]);
	}, [currentQuestionIndex]);



	const convertToText = (ans: Number) => {
		switch (ans) {
			case 1:
				return "Potpuno netačno"
			case 2:
				return "Uglavnom netačno"
			case 3:
				return "Ne mogu da se odlučim"
			case 4:
				return "Uglavnom tačno"
			case 5:
				return "Potpuno tačno"
		}
	}


	const handleYes = () => {
		navigation.navigate("Home");
	}

	const handleNo = () => {

	}

	const handleNext = () => {
		if (currentQuestionIndex == questions.length - 1) {
			handleYes();
		} else {
			setCurrentQuestionIndex(prevState => prevState + 1);

			Animated.timing(currentQuestionAnim, {
				toValue: -height,
				useNativeDriver: true,
				duration: 1000,
			}).start(() => {
				// reset the position of the current question
				currentQuestionAnim.setValue(0);
			});

			Animated.timing(newQuestionAnim, {
				toValue: 500,
				useNativeDriver: true,
				duration: 1000,
			}).start();

			setAnswer(3);
		}


	}

	const createAlert = () => {
		Alert.alert(
			"Da li ste sigurni?",
				"Ako izađete, moraćete da radite test iz početka",
			[
				{text: "Izađi", onPress: () => handleYes()},
				{text: "Ostani", onPress: () => handleNo(), style: "cancel"}
				]
			)

	}

	return (
		<LinearGradient
			colors={["#3194f4", "#5472ee"]}
			style={styles.wrapper}
		>
			{loading && (
				<View style={styles.loadingContainer}>
					<Spinner
						//visibility of Overlay Loading Spinner
						visible={loading}
						//Text with the Spinner
						textContent={'Loading...'}
						//Text style of the Spinner Text
						textStyle={styles.spinnerTextStyle}
					/>
				</View>
			)}
			{!loading && (
				<SafeAreaView style={{justifyContent: "space-between"}}>
					<View style={styles.navigation}>
						<TouchableOpacity onPress={createAlert} style={styles.iconContainer}>
							<FontAwesome style={styles.closeIcon} size={32} name={"close"} />
						</TouchableOpacity>
					</View>

					<View style={styles.questionImageContainer}>
						<QuestionSvg style={styles.questionImage} />
					</View>


					<View style={styles.questionContainer}>
						<View style={styles.questionNumberContainer}>
							<Text style={styles.questionNumber}>
								pitanje {currentQuestion?.id} od {questions[questions.length - 1].id}
							</Text>
						</View>
						<Text style={styles.questionText}>
							{currentQuestion?.question}
						</Text>
						<View style={styles.sliderContainer}>
							<Slider
								minimumValue={1}
								maximumValue={5}
								step={1}
								// minimumTrackTintColor={"#fec201"}
								minimumTrackTintColor={"#f47120"}
								maximumTrackTintColor={"#FFF"}
								onValueChange={value => {setAnswer(value)}}
								value={answer}
							/>
							<View style={styles.answerTextContainer}>
								<Text style={styles.questionText}>{convertToText(answer)}</Text>
							</View>

							<TouchableOpacity onPress={() => handleNext()} style={styles.nextQuestionContainer}>
								<FontAwesome style={styles.iconStyle} name={"chevron-right"} size={50} />
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			)}





		</LinearGradient>
	)
}


const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		paddingTop: 30,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},

	spinnerTextStyle: {
		color: '#FFF',
	},

	wrapper: {
		height: "100%"
	},
	navigation: {
		margin: 10,

	},
	progressContainer: {},
	iconContainer: {
		borderRadius: 1000,
		borderWidth: 1,
		borderColor: "#FFF",
		width: 42,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		opacity: .7,
	},
	closeIcon: {
		color: "#FFF",
		padding: 5,
	},
	questionImageContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50
	},
	questionImage: {

	},

	questionContainer: {
		marginTop: 50,
		marginHorizontal: 10
	},

	questionNumberContainer: {
		padding: 10
	},

	questionNumber: {
		color: "#c6e6fb",
	},

	questionText: {
		color: "#FFF",
		fontSize: 25,
		fontWeight: "bold",
		padding: 10
	},

	sliderContainer: {

	},

	answerTextContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},

	answerText: {
		color: "#FFF",
		fontSize: 25,
		fontWeight: "bold",
		padding: 10
	},

	nextQuestionContainer: {
		opacity: .5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 50
	},

	iconStyle: {
		color: "#FFF"
	}
});
