import json
import os
print(os.getcwd())

# The folder you want to output to:
with open('./assets/fastquizquestions.json', 'r+') as fastquiz:
    fastquiz_loaded = json.load(fastquiz)
    #the folder with the questions/dares list:
    with open('./assets/inputfastquizq.json', 'r') as questions, open('./assets/inputfastquiza.json', 'r') as answers:
        json_q = json.load(questions)
        json_a = json.load(answers)
        print(len(json_q)) 
        print(len(json_a)) 
        for question, answer in zip(json_q, json_a):
            question_obj = {'question': question,'likes': 0, 'category': "na", 'answer':answer}
            fastquiz_loaded.append(question_obj)
    json.dump(fastquiz_loaded, fastquiz)

