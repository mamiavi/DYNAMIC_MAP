import os
import numpy as np
import matplotlib.pyplot as plt

file = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/DATA.csv', 'r', encoding="utf-8")


data = file.readlines()

max = 0

for i in range(6,len(data)-6,16): #Each region loop

    name_region = ' '.join(data[i].strip().split(' ')[1:]).split(';')[0]

    for j in range(1,15): #Each year loop (Here I have to make my symbol)
        
        line = data[i+j].split(';')

        year = line[0].strip()

        path = 'SYMBOLS/AGE/'+year+'/'
        if(not os.path.exists(path)):
            os.makedirs(path)

        data_t = [float(item.replace(',','.')) for item in line[1:len(line)-1:3]]

        y_t = np.array(data_t)

        #Max for the AGES symbol
        if(np.max(y_t)>max):
            max = np.max(y_t)

            
        fig_1, axes_1 = plt.subplots()
        
        ages = ['16 to 19', '20 to 24', '25 to 54', '55 to 65']

        axes_1.set_ylim([0,max])

        colorsm = [(0.75,0.75,1.0), (0.5,0.5,1.0), (0.25,0.25,1.0), (0.0,0.0,1.0)]

        axes_1.bar(ages, y_t, color=colorsm)
        

        axes_1.set_xticklabels([])
        axes_1.set_yticklabels([])
        axes_1.spines['top'].set_visible(False)
        axes_1.spines['right'].set_visible(False)
        axes_1.spines['bottom'].set_visible(False)
        axes_1.spines['left'].set_visible(False)
        axes_1.get_xaxis().set_ticks([])
        axes_1.get_yaxis().set_ticks([])
        
        axes_1.spines['right'].set_visible(False)
        axes_1.spines['left'].set_visible(False)
        axes_1.get_yaxis().set_ticks([])

        plt.subplots_adjust(wspace=0, hspace=0)
        
        plt.savefig('./SYMBOLS/AGE/'+year+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.clf()

print('DONE!')