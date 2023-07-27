import json

# The folder you want to output to:
with open('dares.json', 'r+') as truthordare:
    truthordare_loaded = json.load(truthordare)
    #the folder with the questions/dares list:
    with open('input.json', 'r') as openfile:
        json_obj = json.load(openfile)
        print(len(json_obj))
        for question in json_obj:
            question_obj = {'question': question,'likes': 0, 'category': "na"}
            truthordare_loaded.append(question_obj)
    json.dump(truthordare_loaded, truthordare)

