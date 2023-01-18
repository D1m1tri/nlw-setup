import {View, Text, ScrollView } from "react-native";

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import {HabitDay, DAY_SIZE} from "../components/HabitDay";
import {Header} from "../components/Header";

const weekDays = ['D','S','T','Q','Q','S','S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home () {
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
				<View className="flex-row flex-wrap">
					{
						datesFromYearStart.map(date => (
							<HabitDay 
								key={date.toISOString()}
							/>
						))
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
			</ScrollView>
		</View>
	)
}
