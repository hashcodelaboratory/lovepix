import json

with open("frontend/public/locales/sk/common.json",encoding="utf-8") as sk, open("frontend/public/locales/en/common.json",encoding="utf-8") as en:
    skdir = json.loads(sk.read())
    endir = json.loads(en.read())
    
    ind = -1
    print("MISSING FROM EN")
    for x, i in enumerate(skdir.keys()):
        if(i not in endir.keys()):
            print(str(x+2) + ": " + i)
            if(ind != x-1 and ind != -1): print("")
            ind = x
    
    print("")
    print("MISSING FROM SK")
    for x, i in enumerate(endir.keys()):
        if(i not in skdir.keys()):
            print(str(x+2) + ": " + i)
            if(ind != x-1 and ind != -1): print("")
            ind = x
            
    print("")
    print("WRONG ORDER")
    for x, i in enumerate(skdir.keys()):
        if(i != list(endir.keys())[x]): print(i + ": " + str((list(endir.keys()).index(i) or -3)) + " -> " + str(x+2))