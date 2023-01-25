import {useState} from "react";
import {Text, ScrollView, TextInput, View, TouchableOpacity, Alert} from "react-native";
import {BackButton} from "../components/BackButton";
import {Checkbox} from "../components/Checkbox";
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import {api} from "../lib/axios";

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
	const [title, setTitle] = useState('');
	const [weekDays, setWeekDays] = useState<number[]>([]);

	function handleToggleWeekDay(weekDayIndex: number){
		if(weekDays.includes(weekDayIndex)){
			setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
		}
		else {
			setWeekDays(prevState => [...prevState, weekDayIndex]);
		}
	}

	async function handleCreateNewHabit() {
		try {
			if(!title.trim() || weekDays.length === 0 ){return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade.')}
			await api.post('habits', { title, weekDays });
		}catch (error){
			console.log(error);
			Alert.alert('Ops!', 'Não foi possível criar o novo hábito');
		}
		setTitle('');
		setWeekDays([]);
		Alert.alert("Novo hábito", "Novo hábito criado com sucesso!")
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
					onChangeText={setTitle}
					value = {title}
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
					onPress={handleCreateNewHabit}
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
