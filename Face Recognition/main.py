import cv2

import numpy as np
cap=cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
face_data=[]
skip=0
dataset_path="D:/python/PROJECT/Face Recognition/"
file_name=input("Enter name of person:   ")

while True:
	ret,frame=cap.read() #read from webcame
	gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)

	if(ret==False):
		continue

	face_section=0
    

	faces = face_cascade.detectMultiScale(gray, 1.3, 5) #find face
	faces=sorted(faces, key=lambda f:f[2]*f[3]) #find largest face

	for (x,y,w,h) in faces[:-1]:
		cv2.rectangle(frame,(x,y),(x+w,y+h),(255,255,255),2) #make white rectangle

	for (x,y,w,h) in faces[-1:]:
		cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2) #make yellow rectangle on largest

		offset=10
		face_section=gray[y-offset:y+h+offset,x-offset:x+w+offset]
		face_section=cv2.resize(face_section,(100,100))
		if(skip%10==0 and len(face_section)!=0):
			face_data.append(face_section)
			print(len(face_data))

	skip += 1

	cv2.imshow("video frame",frame) #show face with rectangle
	cv2.imshow("face section",face_section)


	#for quitting
	key_pressed=cv2.waitKey(1) & 0xFF
	if key_pressed== ord('q'):
		break
		
# store in numpy array

face_data=np.asarray(face_data)
face_data=face_data.reshape((face_data.shape[0],-1))
print(face_data.shape)

# #save
np.save(dataset_path+file_name+".npy",face_data)
print("face saved")
cap.release()
cv2.destroyAllWindows()