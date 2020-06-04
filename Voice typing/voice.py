import speech_recognition as sr
r=sr.Recognizer()

while True:

    with sr.Microphone() as source:
        print("SPEAK :  ")
        audio=r.listen(source)

        try:
            text=r.recognize_google(audio)
            print("I HEARD : ",text)
            print("DO YOU WANT TO SAVE IT?","YES=Y","NO=N","QUIT=Q",sep="\n")
            a=input()
            if(a=='Y'):
                with open ("audio.txt",'a') as fil:
                    fil.write(text+'\n')
            elif(a=='Q'):
                break
            else:
                continue
        except:
            print("Can't recognize, Plese try again!!")

    
