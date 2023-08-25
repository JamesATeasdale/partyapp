import json
import os
print(os.getcwd())

# The folder you want to output to:
with open('./assets/quiz.json', 'r+') as fastquiz:
    fastquiz_loaded = json.load(fastquiz)
    #the folder with the questions/dares list:
    with open('./assets/inputfastquizq.txt', 'r') as questionstxt, open('./assets/inputfastquiza.txt', 'r') as answerstxt:
        questions = questionstxt.readlines()
        answers = answerstxt.readlines()
        print('Total Number of questions:', len(questions))
        print('Total Number of answers:', len(answers))
        for question, answer in zip(questions, answers):
            question_obj = {'question': question,'likes': 0, 'category': "geography", 'answer':answer}
            fastquiz_loaded.append(question_obj)
    json.dump(fastquiz_loaded, fastquiz)

