import requests

poke=input("enter name of pokemon:     ")
num=int(input("enter number of images:    "))

url="https://api.pokemontcg.io/v1/cards?name="+poke

response=requests.get(url)
data=response.json()

j=1

for i in data["cards"]:
    img_url=(i["imageUrl"])

    with open ("{}-{}.png".format(poke,j),'wb') as fil:
        resp=requests.get(img_url)
        fil.write(resp.content)
        j+=1
        if(j>num):
            print("{} images of {} saved".format(num,poke))
            break
