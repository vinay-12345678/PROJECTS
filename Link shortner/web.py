import requests
from flask import Flask , render_template , redirect , url_for ,request
app= Flask(__name__)

@app.route("/")
def step1():
    return render_template("create.html")

@app.route("/create" ,methods=['POST'] )
def create():
    user=request.form['user']
    url= request.form['url']
    short= request.form['short']

    try:
        with open ('{}.txt'.format(user),'r') as fil:
            for i in fil:
                list=i.strip().split()
                if(list[0]==short):
                    return "TRY AGAIN"+"\n"+"Short Form Alredy Exist"
                if(list[1]==url):
                    return "TRY AGAIN"+"\n"+"URL Alredy Exist"

    except:
        with open ('{}.txt'.format(user),'a') as fil:
            fil.write(short+" "+url+'\n')

        return "Success"

    with open ('{}.txt'.format(user),'a') as fil:
        fil.write(short+" "+url+'\n')

    return "Success"

@app.route("/find" ,methods=['POST'] )
def find():
    user=request.form['user']
    short= request.form['short']
    try:
        with open ('{}.txt'.format(user),'r') as fil:
            for i in fil:
                list=i.strip().split()
                if(list[0]==short):
                    return redirect("https://"+list[1])

    except:
        return redirect(url_for("notfound"))
    
@app.route("/filenotfound/create")
def notfound():
    return render_template("create.html")

@app.route("/<name>")
def func(name):
    if(name=='find'):
        return render_template("goto.html")
    elif(name=='create'):
        return render_template("create.html")

if __name__ ==  "__main__":
    app.run(debug=True,port=8000)