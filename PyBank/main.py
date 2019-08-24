import os
import csv
#create trackers
totalMonths = 0
totalRev = 0
pastRev = 0
highestIncRev = 0
lowestDecRev = 99999999999
#create lists to store revenue change
revChange = []
#create path
budget_csvpath = os.path.join('.', 'Resources', 'budget_data.csv')
#print(budget_csvpath)
#read csv file
with open(budget_csvpath, newline='', encoding='utf-8') as csvfile:
    budget_csvreader = csv.reader(csvfile, delimiter=',')
    #print(budget_csvreader)
    next(budget_csvreader, None)
    for row in budget_csvreader:
        #count total months in csv file
        totalMonths = totalMonths + 1
        #print(type(row[1])) <--used to figure out if working with str or int
        #count total revenue in csv file
        totalRev = totalRev + (int(row[1]))
        #create a variable that will count the revenue change
        monthlyRevChange = int(row[1]) - pastRev
        pastRev = int(row[1])
        #add changes in new list
        revChange.append(monthlyRevChange)
        #calculate the average change in revenue
        avgRevChange = round(sum(revChange)/totalMonths)
        #print(avgRevChange)
        #find the greatest increase in revenue
        if (monthlyRevChange > highestIncRev):
            highestIncMonth = row[0]
            highestIncRev = monthlyRevChange 
        #find the greatest decrease in revenue
        if (monthlyRevChange < lowestDecRev):
            lowestDecMonth = row[0]
            lowestDecRev = monthlyRevChange

#create varible to hold finanical analysis results and use f-strings for formatting
Results = (
f"Financial Analysis \n"
f"---------------------------- \n"
f"Total Months: {totalMonths} \n"
f"Total Revenue: ${totalRev} \n"
f"Average Revenue Change: ${avgRevChange} \n"
f"Greatest Increase in Revenue: {highestIncMonth} (${highestIncRev}) \n"
f"Greatest Decrease in Revenue: {lowestDecMonth} (${lowestDecRev}) \n")
print(Results)

#write a text file in order to export results to text file
outputtxt = os.path.join('Resources/budget_analysis.txt')
with open(outputtxt, 'w') as txtfile:
    txtwriter = txtfile.write(Results)