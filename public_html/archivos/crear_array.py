lines = open('palabras.txt', encoding="utf-8").read().splitlines()
f = open("resul.txt", "a", encoding="utf-8")
c = 0

f.write("[")
for line in lines:
    f.write("'" + line + "', ")
    c += 1
    print(c)
f.write("]")
