import json
import numpy as np
from statistics import mean

#Goal -> create a json with the stats of each year

dicc = {}
dicc['mer'], dicc['ler'] = {}, {}
dicc['rmu'], dicc['rlu'] = {}, {}
dicc['rmu']['Relative'], dicc['rlu']['Relative'] = {}, {}
dicc['rmu']['Absolute'], dicc['rlu']['Absolute'] = {}, {}
dicc['rmyu'], dicc['rlyu'] = {}, {}
dicc['rmyu']['Relative'], dicc['rlyu']['Relative'] = {}, {}
dicc['rmyu']['Absolute'], dicc['rlyu']['Absolute'] = {}, {}

#The most equal region -> region with lowest difference between male and female unemployment
#The less equal region -> region with highest difference between male and female unemployment
file = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/DATA.csv', 'r', encoding="utf-8")

data = file.readlines()

# The most equal region and less equal region has to be calculated with the file DATA_SEX

file_sex = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/DATA_SEX.csv', 'r', encoding='utf-8')

data_sex = file_sex.readlines()

for i in range(8,len(data_sex)-6, 16):
    
    name_region = ' '.join(data_sex[i].strip().split(' ')[1:]).split(';')[0]

    for j in range(1,15):
        
        line = data_sex[i+j].split(';')
        
        year = line[0].strip()

        man = float(line[1])
        woman = float(line[2].strip())

        equality = abs(man - woman)

        if(year in dicc['mer'].keys()):
            if(dicc['mer'][year]['value']>equality):
                dicc['mer'][year] = {'region':name_region, 'value':equality}
        else:
            dicc['mer'][year] = {'region':name_region, 'value':equality}
        

        if(year in dicc['ler'].keys()):
            if(dicc['ler'][year]['value']<equality):
                dicc['ler'][year] = {'region':name_region, 'value':equality}
        else:
            dicc['ler'][year] = {'region':name_region, 'value':equality}



for i in range(6,len(data)-6,16): #Each region loop

    name_region = ' '.join(data[i].strip().split(' ')[1:]).split(';')[0]

    for j in range(1,15): #Each year loop (Here I have to make my symbol)
        
        line = data[i+j].split(';')

        year = line[0].strip()

        data_t = [float(item.replace(',','.')) for item in line[1:len(line)-1:3]]
        data_m = [float(item.replace(',','.')) for item in line[2:len(line)-1:3]] #male
        data_f = [float(item.replace(',','.')) for item in line[3::3]] #female

        # equality = mean(list(set(data_m) - set(data_f)))
        
        # if(year in dicc['mer'].keys()):
        #     if(dicc['mer'][year]['value']>equality):
        #         dicc['mer'][year] = {'region':name_region, 'value':equality}
        # else:
        #     dicc['mer'][year] = {'region':name_region, 'value':equality}
        

        # if(year in dicc['ler'].keys()):
        #     if(dicc['ler'][year]['value']<equality):
        #         dicc['ler'][year] = {'region':name_region, 'value':equality}
        # else:
        #     dicc['ler'][year] = {'region':name_region, 'value':equality}

#Region with higher unemployment -> (Relative mode) just the region with more %
#  of all ages and sexs

        t_unemployment = sum(data_t)

        if(year in dicc['rmu']['Relative'].keys()):
            if(dicc['rmu']['Relative'][year]['value']<t_unemployment):
                dicc['rmu']['Relative'][year] = {'region':name_region, 'value':t_unemployment}
        else:
            dicc['rmu']['Relative'][year] = {'region':name_region, 'value':t_unemployment}
        
        if(year in dicc['rlu']['Relative'].keys()):
            if(dicc['rlu']['Relative'][year]['value']>t_unemployment):
                dicc['rlu']['Relative'][year] = {'region':name_region, 'value':t_unemployment}
        else:
            dicc['rlu']['Relative'][year] = {'region':name_region, 'value':t_unemployment}

#Region with highest unemployment among youth -> (Relative mode) the region 
# with more % of all sex but 16 to 19 and 20 to 25 years old

        y_unemployment = sum(data_t[0:2])
        
        if(year in dicc['rmyu']['Relative'].keys()):
            if(dicc['rmyu']['Relative'][year]['value']<y_unemployment):
                dicc['rmyu']['Relative'][year] = {'region':name_region, 'value':y_unemployment}
        else:
            dicc['rmyu']['Relative'][year] = {'region':name_region, 'value':y_unemployment}
        
        if(year in dicc['rlyu']['Relative'].keys()):
            if(dicc['rlyu']['Relative'][year]['value']>y_unemployment):
                dicc['rlyu']['Relative'][year] = {'region':name_region, 'value':y_unemployment}
        else:
            dicc['rlyu']['Relative'][year] = {'region':name_region, 'value':y_unemployment}


#Absolute

file = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/RAW_ABSOLUTE.csv', 'r', encoding="utf-8")


data = file.readlines()


for i in range(8,len(data)-8,61): #Each region loop

    name_region = ' '.join(data[i].strip().split(' ')[1:]).split(';')[0]

    for j in range(1,60,4): #Each year loop (Here I have to make my symbol)

        year = data[i+j].split('T')[0].strip()

        matrix = []

        for k in range(0,4): #Each season of a year
        
            l = data[i+j+k].split(';')
            line = [float(element) for element in l[1:]]

            array = np.array(line)

            matrix.append(line)
            
        mean_values = np.mean(matrix, axis=0)

        final_data = [round(element*1000) for element in mean_values[0:6]]

        cosa = np.array([round(element*1000) for element in mean_values[6:15]])

        media1 = round(np.sum([element for element in cosa[0::3]]))
        media2 = round(np.sum([element for element in cosa[1::3]]))
        media3 = round(np.sum([element for element in cosa[2::3]]))

        final_data.extend([media1, media2, media3])

        final_data.extend([round(element*1000) for element in mean_values[15:]])

        data_t = final_data[0:len(line)-1:3]
        data_m = final_data[1:len(line)-1:3] #male
        data_f = final_data[2::3] #female

#Region with higher unemployment -> (Absolute mode) just the region with more unemployed people
#  of all ages and sexs

        t_unemployment = sum(data_t)

        if(year in dicc['rmu']['Absolute'].keys()):
            if(dicc['rmu']['Absolute'][year]['value']<t_unemployment):
                dicc['rmu']['Absolute'][year] = {'region':name_region, 'value':t_unemployment}
        else:
            dicc['rmu']['Absolute'][year] = {'region':name_region, 'value':t_unemployment}
        
        if(year in dicc['rlu']['Absolute'].keys()):
            if(dicc['rlu']['Absolute'][year]['value']>t_unemployment):
                dicc['rlu']['Absolute'][year] = {'region':name_region, 'value':t_unemployment}
        else:
            dicc['rlu']['Absolute'][year] = {'region':name_region, 'value':t_unemployment}


#Region with highest unemployment among youth -> (Absolute mode) the region 
# with more unemployed people of all sex but 16 to 19 and 20 to 25 years old

        y_unemployment = sum(data_t[0:2])
        
        if(year in dicc['rmyu']['Absolute'].keys()):
            if(dicc['rmyu']['Absolute'][year]['value']<y_unemployment):
                dicc['rmyu']['Absolute'][year] = {'region':name_region, 'value':y_unemployment}
        else:
            dicc['rmyu']['Absolute'][year] = {'region':name_region, 'value':y_unemployment}
        
        if(year in dicc['rlyu']['Absolute'].keys()):
            if(dicc['rlyu']['Absolute'][year]['value']>y_unemployment):
                dicc['rlyu']['Absolute'][year] = {'region':name_region, 'value':y_unemployment}
        else:
            dicc['rlyu']['Absolute'][year] = {'region':name_region, 'value':y_unemployment}


#Save the json
with open('DATA/stats.json', 'w') as outfile:
    json.dump(dicc, outfile)
