import speech_recognition as sr
import winsound
import pyttsx3

def speak(words):
    engine.say(words)
    engine.runAndWait()

def goto(linenum):
    global line
    line=linenum

engine=pyttsx3.init("sapi5")
voices=engine.getProperty("voices")
# print(voices)
engine.setProperty("voice",voices[1].id)


r=sr.Recognizer()

while True:

    with sr.Microphone() as source:
        frequency=5000
        duration=1000
        winsound.Beep(frequency,duration)

        speak("speak")
        print()
        print("LISTENING....   ")
        audio=r.listen(source)

        try:
            text=r.recognize_google(audio)

            speak("i heard you saying")

            print("YOU :",text)

            speak("Do you want to save it.")
            speak("Say, Yes,no,or quit")

            # print("YES=Y","NO=N","QUIT=Q",sep="\n")
            print("LISTENING...   ")
            audio=r.listen(source)
            
            line=1
            try:
                a=r.recognize_google(audio)
                if(a=='yes' or a=='yes yes'):
                    with open ("audio.txt",'a') as fil:
                        fil.write(text+'\n')
                    speak("saved successfully")
                    break
                elif(a=='no' or a=='no no'):
                    continue
                else:
                    break

            except:
                speak("Can't recognize, Please try again!!")
                break

        except:
            speak("Can't recognize, Please try again!!")
