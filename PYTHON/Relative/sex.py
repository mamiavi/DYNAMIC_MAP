import os
import numpy as np
import matplotlib.pyplot as plt

file = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/DATA_SEX.csv', 'r', encoding="utf-8")


data = file.readlines()

max = 0

for i in range(8,len(data)-6,16): #Each region loop

    name_region = ' '.join(data[i].strip().split(' ')[1:]).split(';')[0]
    
    for j in range(1,15): #Each year loop (Here I have to make my symbol)
        
        line = data[i+j].split(';')

        year = line[0].strip()

        path = 'SYMBOLS/Relative/SEX/'+year+'/'
        if(not os.path.exists(path)):
            os.makedirs(path)

        data_m = float(line[1].strip())
        data_f = float(line[2].strip())

        fig_1, axes_1 = plt.subplots()
        
        axes_1.pie([data_m, data_f], autopct='%1.0f%%',textprops={'fontsize':30} ,startangle=90, colors=[(0.0,0.0,1.0),(1.0,0.0,0.0)],wedgeprops={"edgecolor":"0","linewidth":2})
        axes_1.axis('equal')
        #plt.legend(['male','female'], prop = {'size':30}, loc="upper center", bbox_to_anchor=(0.5,0))
        
        #plt.savefig('./SYMBOLS/Relative/SEX/'+year+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.savefig('./SYMBOLS/legends/RSex.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.clf()

        break
    break

print('DONE!')