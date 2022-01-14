import os
import random
import numpy as np
import matplotlib.pyplot as plt

file = open('/home/manuelm/Documents/UNIVERSIDAD/MASTER/KARLSRUHE/SPACE-TIME VISUALIZATION OF STATISTICAL DATA/DYNAMIC_MAP/DATA/RAW_ABSOLUTE.csv', 'r', encoding="utf-8")


data = file.readlines()

max = 0

for i in range(8,len(data)-8,61): #Each region loop

    name_region = ' '.join(data[i].strip().split(' ')[1:]).split(';')[0]

    for j in range(1,60,4): #Each year loop (Here I have to make my symbol)

        year = data[i+j].split('T')[0]

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
        
        # #AGES
        # path = 'SYMBOLS/Absolute/AGE/'+year.strip()+'/'
        # if(not os.path.exists(path)):
        #     os.makedirs(path)

        # data_t = final_data[0:len(final_data)-1:3]

        # y_t = np.array(data_t)

        # #Max for the AGES symbol
        # if(np.max(y_t)>max):
        #     max = np.max(y_t)

        # fig_1, axes_1 = plt.subplots()
        
        # ages = ['16 to 19', '20 to 24', '25 to 54', '55 to 65']

        # axes_1.set_ylim([0,max])

        # colorsm = [(0.75,0.75,1.0), (0.5,0.5,1.0), (0.25,0.25,1.0), (0.0,0.0,1.0)]

        # axes_1.bar(ages, y_t, color=colorsm)
        

        # axes_1.set_xticklabels([])
        # axes_1.set_yticklabels([])
        # axes_1.spines['top'].set_visible(False)
        # axes_1.spines['right'].set_visible(False)
        # axes_1.spines['bottom'].set_visible(False)
        # axes_1.spines['left'].set_visible(False)
        # axes_1.get_xaxis().set_ticks([])
        # axes_1.get_yaxis().set_ticks([])
        
        # axes_1.spines['right'].set_visible(False)
        # axes_1.spines['left'].set_visible(False)
        # axes_1.get_yaxis().set_ticks([])

        # plt.subplots_adjust(wspace=0, hspace=0)
        
        # plt.savefig('./SYMBOLS/Absolute/AGE/'+year.strip()+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        # plt.clf()


        # #BOTH

        # path = 'SYMBOLS/Absolute/BOTH/'+year.strip()+'/'
        # if(not os.path.exists(path)):
        #     os.makedirs(path)

        # data_t = final_data[0:len(line)-1:3]
        # data_m = final_data[1:len(line)-1:3] #male
        # data_f = final_data[2::3] #female

        # y_t = np.array(data_t)
        # y_m = np.array(data_m)
        # y_f = np.array(data_f)

        # #Max for the BOTH symbol
        # if(np.max(y_m)>max):
        #     max = np.max(y_m)
        # elif(np.max(y_f)>max):
        #     max = np.max(y_f)
     
            
        # fig_1, axes_1 = plt.subplots(figsize=(7,3), nrows=1, ncols=2)
        
        # ages = ['16 to 19', '20 to 24', '25 to 54', '55 to 65']
        # ind = [x for x, _ in enumerate(ages)]

        # axes_1[0].set_xlim([0,max+10])
        # axes_1[1].set_xlim([0,max+10])

        # colorsm = [(0.75,0.75,1.0), (0.5,0.5,1.0), (0.25,0.25,1.0), (0.0,0.0,1.0)]

        # axes_1[0].barh(ind, y_m, color = colorsm)
        # axes_1[0].set_yticks(ind, labels=ages)

        # axes_1[0].invert_xaxis()
        # #axes_1[0].invert_yaxis()

        # colorsf = [(1.0,0.75,0.75), (1.0,0.5,0.5), (1.0,0.25,0.25), (1.0,0.0,0.0)]

        # axes_1[1].barh(ind, y_f, color=colorsf)
        # axes_1[1].set_yticks(ind, labels=ages)

        # #axes_1[1].invert_yaxis()
        
        # for a in axes_1:
        #     a.set_xticklabels([])
        #     a.set_yticklabels([])
        #     a.spines['top'].set_visible(False)
        #     a.spines['right'].set_visible(False)
        #     a.spines['bottom'].set_visible(False)
        #     a.spines['left'].set_visible(False)
        #     a.get_xaxis().set_ticks([])
        #     a.get_yaxis().set_ticks([])
        
        # axes_1[0].spines['right'].set_visible(True)
        # axes_1[1].spines['left'].set_visible(True)
        # axes_1[0].get_yaxis().set_ticks([])
        # plt.subplots_adjust(wspace=0, hspace=0)
        
        # plt.savefig('./SYMBOLS/Absolute/BOTH/'+year.strip()+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        # plt.clf()

        #SEX

        path = 'SYMBOLS/Absolute/SEX/'+year.strip()+'/'
        if(not os.path.exists(path)):
            os.makedirs(path)

        data_m =  sum(final_data[1::3])
        data_f = sum(final_data[2::3])

        fig_1, axes_1 = plt.subplots()
        
        axes_1.pie([data_m, data_f], startangle=90, colors=[(0.0,0.0,1.0),(1.0,0.0,0.0)], radius=data_f+data_m, wedgeprops={"edgecolor":"0","linewidth":1})
        axes_1.axis('equal')
        fig = plt.gcf()
        fig.set_size_inches((data_m+data_f)/100000,(data_f+data_m)/100000)
        plt.savefig('./SYMBOLS/Absolute/SEX/'+year.strip()+'/'+name_region+'.svg', format="svg", dpi=300, bbox_inches='tight', transparent=True)
        plt.clf()


print('DONE!')