import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import image from "../assets/3584908_66066.png";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeScreenNavigationProp, RootStackParamList} from "../RootStackParamList";

type Props = {
	navigation: HomeScreenNavigationProp
}

export default function Home({navigation} : Props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.appTitleContainer}>
				<Text style={styles.appTitle}>Persona</Text>
				<Text style={styles.subtitle}>Upoznajte sebe!</Text>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate("Question")}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.currentTest}
					colors={["#ed6f9e", "#ec8b6a"]}>

					<Text style={styles.currentTestText}>Zapocni test</Text>



				</LinearGradient>
				<View style={styles.imageContainer}>
					<Image style={styles.currentTestImage} source={image} />
				</View>

			</TouchableOpacity>

		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20
	},
	appTitleContainer: {
		marginVertical: 20,

	},
	appTitle: {
		color: "#f65e7f",
		fontFamily: "Inter_900Black",
		fontSize: 40
	},
	subtitle: {
		color: "#777",
		fontSize: 15
	},
	currentTest: {
		padding: 20,
		borderRadius: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: 150,
		marginTop: 80,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,

	},
	currentTestText: {
		color: "#FFF",
		fontFamily: "Inter_700Bold",
		fontSize: 25,
	},
	currentTestImage: {
		width: 140,
		height: 140,
	},
	imageContainer: {
		position: "absolute",
		end: 15
	}

})
