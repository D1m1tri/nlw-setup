import {useState} from "react";
import {Text, ScrollView, TextInput, View, TouchableOpacity} from "react-native";
import {BackButton} from "../components/BackButton";
import {Checkbox} from "../components/Checkbox";
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors";

const availableWeekdays = [
	'Domingo', 
	'Segunda-feira', 
	'Terça-feira', 
	'Quarta-feira', 
	'Quinta-feira', 
	'Sexta-feira', 
	'Sábado'
]

export function New(){
	const [weekDays, setWeekDays] = useState<number[]>([]);

	function handleToggleWeekDay(weekDayIndex: number){
		if(weekDays.includes(weekDayIndex)){
			setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
		}
		else {
			setWeekDays(prevState => [...prevState, weekDayIndex]);
		}
	}

	return (
		<View className="flex-1 px-8 pt-16 bg-background">
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:100 }}>
				<BackButton />

				<Text className="mt-6 text-3xl font-extrabold text-white">
					Criar hábito
				</Text>
				<Text className="mt-6 text-base font-bold text-white">
					Qual seu comprometimento?
				</Text>
				<TextInput 
					className="h-12 pl-4 mt-3 text-white border-2 rounded-lg bg-zinc-900 border-zinc-800 focus:border-green-600" 
					placeholder="Ex.: Exercícios, Dormir bem, etc."
					placeholderTextColor={colors.zinc[400]}
				/>
				
				<Text className="mt-4 mb-3 text-base font-semibold text-white">
					Qual a recorrência?
				</Text>

				{
					availableWeekdays.map((weekday, index) =>(
						<Checkbox 
							key={weekday} 
							title={weekday} 
							checked={weekDays.includes(index)}
							onPress={() => handleToggleWeekDay(index)}
						/>
					))
				}

				<TouchableOpacity 
					activeOpacity={0.7} 
					className="flex-row items-center justify-center w-full mt-6 bg-green-600 h-14 rounded-md"
				>
					<Feather name="check" color={colors.white} size={20}/>
					<Text className="ml-2 text-base font-semibold text-white">
						Confirmar
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}