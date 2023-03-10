import { useState, useCallback } from "react";
import {View, Text, ScrollView, Alert } from "react-native";
import { api } from "../lib/axios";
import dayjs from "dayjs";

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import {HabitDay, DAY_SIZE} from "../components/HabitDay";
import {Header} from "../components/Header";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import { Loading } from "../components/loading";

const weekDays = ['D','S','T','Q','Q','S','S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type SummaryProps = Array<{
	id: string;
	date: string;
	amount: number;
	completed: number;
}>

export function Home () {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<SummaryProps | null>(null);

	const { navigate } = useNavigation();

	async function fetchData(){
		try {
			setLoading(true);
			const response = await api.get('summary');
			console.log(response.data);
			setSummary(response.data)
		} catch (error) {
			Alert.alert('Ops!','Não foi possível carregar o sumário de hábitos... Seu computador está ligado?');
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	
	useFocusEffect(useCallback(() => {
		fetchData();
	},[]));

	if(loading){
		return(
			<Loading />
		)
	}

	return (
		<View className="flex-1 px-8 pt-16 bg-background">
			<Header />
			<View className="flex-row mt-6 mb-2">
				{
					weekDays.map((weekDay, i) => (
						<Text 
							key={`${weekDay}-${i}`} 
							className="mx-1 text-xl font-bold text-center text-zinc-400"
							style={{width: DAY_SIZE}}
						>
							{weekDay}
						</Text>
					))
				}
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{
					summary &&
				<View className="flex-row flex-wrap">
					{
						datesFromYearStart.map(date => {
							const dayWithHabits = summary.find(day => {
								return dayjs(date).isSame(day.date, 'day')
							})
							
							return(
								<HabitDay 
									key={date.toISOString()}
									date={date}
									amountOfHabits={dayWithHabits?.amount}
									amountCompleted={dayWithHabits?.completed}
									onPress={() => navigate('habit', { date: date.toISOString() })}
								/>
						)})
					}
				
					{
						amountOfDaysToFill > 0 && Array.from({length:amountOfDaysToFill}).map((_, index)=> (
							<View 
								key={index}
								className="m-1 border-2 rounded-lg bg-zinc-900 border-zinc-800 opacity-40"
								style={{width: DAY_SIZE, height: DAY_SIZE}}
							/>
						))
					}
				</View>
				}
			</ScrollView>
		</View>
	)
}
