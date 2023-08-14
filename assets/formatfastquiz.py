import json
import os
print(os.getcwd())

# The folder you want to output to:
with open('./assets/fastquizquestions.json', 'r+') as fastquiz:
    fastquiz_loaded = json.load(fastquiz)
    #the folder with the questions/dares list:
    with open('./assets/inputfastquizq.txt', 'r') as questions, open('./assets/inputfastquiza.txt', 'r') as answers:
        lines = len(questions.readlines())
        print('Total Number of lines:', lines)
        for question, answer in zip(questions, answers):
            question_obj = {'question': question,'likes': 0, 'category': "na", 'answer':answer}
            fastquiz_loaded.append(question_obj)
    json.dump(fastquiz_loaded, fastquiz)

