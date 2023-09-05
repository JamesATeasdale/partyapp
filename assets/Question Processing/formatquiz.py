import json
import os
print(os.getcwd())

# The folder you want to output to:
with open('./assets/quiz.json', 'r+') as fastquiz:
    fastquiz_loaded = json.load(fastquiz)
    # Questions and answers
    with open('./assets/Question Processing/inputquizq.txt', 'r') as questionstxt, open('./assets/Question Processing/inputquiza.txt', 'r') as answerstxt:
        questions = questionstxt.readlines()
        answers = answerstxt.readlines()
        print('Total Number of questions:', len(questions))
        print('Total Number of answers:', len(answers))
        for question, answer in zip(questions, answers):
            question_obj = {'question': question,'likes': 0, 'category': "Science", 'answer':answer}
            fastquiz_loaded.append(question_obj)
    json.dump(fastquiz_loaded, fastquiz)

