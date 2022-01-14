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

        path = 'SYMBOLS/BOTH/'+year+'/'
        if(not os.path.exists(path)):
            os.makedirs(path)

        data_t = [float(item.replace(',','.')) for item in line[1:len(line)-1:3]]
        data_m = [float(item.replace(',','.')) for item in line[2:len(line)-1:3]] #male
        data_f = [float(item.replace(',','.')) for item in line[3::3]] #female

        y_t = np.array(data_t)
        y_m = np.array(data_m)
        y_f = np.array(data_f)

        #Max for the BOTH symbol
        if(np.max(y_m)>max):
            max = np.max(y_m)
        elif(np.max(y_f)>max):
            max = np.max(y_f)
     
            
        fig_1, axes_1 = plt.subplots(figsize=(7,3), nrows=1, ncols=2)
        
        ages = ['16 to 19', '20 to 24', '25 to 54', '55 to 65']
        ind = [x for x, _ in enumerate(ages)]

        axes_1[0].set_xlim([0,max+10])
        axes_1[1].set_xlim([0,max+10])

        colorsm = [(0.75,0.75,1.0), (0.5,0.5,1.0), (0.25,0.25,1.0), (0.0,0.0,1.0)]

        axes_1[0].barh(ind, y_m, color = colorsm)
        axes_1[0].set_yticks(ind, labels=ages)

        axes_1[0].invert_xaxis()
        #axes_1[0].invert_yaxis()

        colorsf = [(1.0,0.75,0.75), (1.0,0.5,0.5), (1.0,0.25,0.25), (1.0,0.0,0.0)]

        axes_1[1].barh(ind, y_f, color=colorsf)
        axes_1[1].set_yticks(ind, labels=ages)

        #axes_1[1].invert_yaxis()
        
        for a in axes_1:
            a.set_xticklabels([])
            a.set_yticklabels([])
            a.spines['top'].set_visible(False)
            a.spines['right'].set_visible(False)
            a.spines['bottom'].set_visible(False)
            a.spines['left'].set_visible(False)
            a.get_xaxis().set_ticks([])
            a.get_yaxis().set_ticks([])
        
        axes_1[0].spines['right'].set_visible(True)
        axes_1[1].spines['left'].set_visible(True)
        axes_1[0].get_yaxis().set_ticks([])
        plt.subplots_adjust(wspace=0, hspace=0)
        
        #plt.savefig('./SYMBOLS/BOTH/'+year+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.savefig('./SYMBOLS/legends/RelativeBoth.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.clf()
        break
    break
print('DONE!')