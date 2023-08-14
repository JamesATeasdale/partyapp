import json

# The folder you want to output to:
with open('./assets/dares.json', 'r+') as truthordare:
    truthordare_loaded = json.load(truthordare)
    #the folder with the questions/dares list:
    with open('./assets/inputtord.txt', 'r') as openfile:
        lines = len(openfile.readlines())
        print('Total Number of lines:', lines)
        for question in openfile:
            question_obj = {'question': question,'likes': 0, 'category': "na"}
            truthordare_loaded.append(question_obj)
    json.dump(truthordare_loaded, truthordare)

