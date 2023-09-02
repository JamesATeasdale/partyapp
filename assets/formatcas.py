import json

# The folder you want to output to:
with open('./assets/icebreakers.json', 'r+') as whatif:
    whatif_loaded = json.load(whatif)
    #the folder with the questions/dares list:
    with open('./assets/inputcas.txt', 'r') as openfile:
        lines = openfile.readlines()
        print('Total Number of lines:', len(lines))
        for question in lines:
            question_obj = {'question': question.lower(),'likes': 0, 'category': "na"}
            whatif_loaded.append(question_obj)
    json.dump(whatif_loaded, whatif)
