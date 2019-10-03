Question.create(content: 'Where was Lizzo born?')
Question.create(content: "What is Lizzo's given name?")
Question.create(content: "What musical instrument did Lizzo study in college?")
Question.create(content: "What was the name of Lizzo's first studio album?")
Question.create(content: "In what movie did Lizzo appear as an actress?")
Question.create(content: "In what part of Houston did Lizzo grow up?")
Question.create(content: "What is Lizzo's zodiac sign?")
Question.create(content: "What college did Lizzo attend?")
Question.create(content: "What is Lizzo's group of backup dancers called?")
Question.create(content: "What television show featured Lizzo's music?")
Question.create(content: "At what awards show was Lizzo nominated for 'Best Female Hip-Hop Artist?")
Question.create(content: "How tall is Lizzo?")
Question.create(content: "What famous musician did Lizzo collaborate with before their death?")
Question.create(content: "On what reality TV show was Lizzo a judge?")
Question.create(content: "With what other famous female hip-hop artist did Lizzo collaborate in 2019?")
Question.create(content: "What was Lizzo's first number one single?")
Question.create(content: "When Lizzo took a DNA test, she found out she was 100% what?")
Question.create(content: "What NPR dimunative concert series did Lizzo participate in?")

answers = [
    ['Detroit, MI', 'Houston, TX', 'Minneapolis, MN', 'New York, NY'],
    ['Melissa Jefferson', 'Olivia Cockburn', 'Alicia Cook', 'Robyn Fenty'],
    ['Flute', 'Piano', 'Drums', 'Guitar'],
    ['Lizzobangers', 'Big Grrrl Small World', 'Cuz I Love You', 'Coconut Oil'],
    ['Hustlers', 'Toy Story 4', 'Lion King', 'Aladdin'],
    ['Alief', 'CyFair', 'Sugarland', 'Montrose'],
    ['Tarus', 'Ares', 'Libra', 'Pisces'],
    ['University of Houston', 'University of Texas', 'University of Minnesota', 'None'],
    ['Big Grrls', '4Thirty-Two', 'emFATic Dance', 'Pretty Big Movement'],
    ['Insecure', 'Empire', 'The Proud Family', 'Power'],
    ['BET Awards', 'Grammy Awards', 'Video Music Awards', "People's Choice Awards"],
    ["5'10", "6'0", "5'6", "5'2"],
    ['Prince', 'Michael Jackson', 'Aretha Franklin', 'Nipsey Hussle'],
    ["RuPaul's Drag Race", 'The Voice', 'The Masked Singer', 'American Idol'],
    ['Missy Elliot', 'Nicki Minaj', 'Cardi B', 'Rihanna'],
    ['Truth Hurts', 'Juice', 'Good As Hell', 'Tempo'],
    ['That Bitch', 'Perfect', 'Beautiful', 'Badass'],
    ['Tiny Desk Concert', 'Small Studio Presentation', 'Little Big Performance', 'Miniature Stage Show'],
    
    ]
    def addAnswers(answer)
        question_id = 1
        answer.each do |group| 
            answer_index = 0
            group.each do |answer|
                is_correct = false
                if answer_index == 0
                    is_correct = true
                end
                Answer.create(content: answer, question_id: question_id, is_correct: is_correct)
                answer_index += 1
            end
            question_id += 1
        end
    end
    
    addAnswers(answers)

    song1 = Question.create(content: 'What is the title of this song? (Make sure your volume is on!)', media: 'https://lizzbians.s3-us-west-2.amazonaws.com/Lizzo+-+Good+As+Hell+(Official+Video).mp3')
    Answer.create(question_id: song1.id, content: "Good as Hell", is_correct: true)
    Answer.create(question_id: song1.id, content: "Juice", is_correct: false)
    Answer.create(question_id: song1.id, content: "Tempo", is_correct: false)
    Answer.create(question_id: song1.id, content: "Truth Hurts", is_correct: false)

    song2 = Question.create(content: 'What is the title of this song? (Make sure your volume is on!)', media: 'https://lizzbians.s3-us-west-2.amazonaws.com/Lizzo+-+Truth+Hurts+(Official+Video).mp3')
    Answer.create(question_id: song2.id, content: "Good as Hell", is_correct: false)
    Answer.create(question_id: song2.id, content: "Juice", is_correct: false)
    Answer.create(question_id: song2.id, content: "Tempo", is_correct: false)
    Answer.create(question_id: song2.id, content: "Truth Hurts", is_correct: true)