from os import listdir
from os.path import isfile, join
import json

onlyfiles = [f for f in listdir('./assets/') if isfile(join('./assets/', f))]
print(onlyfiles)

for item in onlyfiles:
    categories = {}
    if '.json' in item:
        print('\n'+item)
        with open('./assets/' + item, 'r') as openfile:
            openfile_loaded = json.load(openfile)
            for question in openfile_loaded:
                if question.get('category') not in list(categories.keys()):
                    categories.update({question.get('category'):1})
                else:
                    categories[question.get('category')] +=1
        for cat in categories.keys():
            print(cat,': ',categories[cat])

