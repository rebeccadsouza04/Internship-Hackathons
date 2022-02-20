import string
import numpy as np
import itertools
import sys

def createKey(keyString):
    keyString = "".join(keyString.split())                       
    tempKeyList = [i for i in keyString]                         
    keyList = []                                                  
    [keyList.append(x) for x in tempKeyList if x not in keyList] 
    alphabetList = list(string.ascii_lowercase)                  
    tempList = [i for i in alphabetList if i not in keyList]     
    keyList.extend(tempList)                                     
    keyList.remove('j')                                          
    keyList = [keyList[i:i+5] for i in range(0, len(keyList), 5)]
    return keyList                                               
      
def inList(item,keyList):
    for i in keyList:                                            
        if item in i:                                            
            return keyList.index(i), i.index(item)               
    return -1                                                    

def ceaserEncrypt():
    str = input("Enter a string: ")                              
    str = str.lower()                                                  
    strList = list(str.strip(" "))                               
    k = int(input("Enter a key: "))                              
    alphabetList = list(string.ascii_lowercase)                       
    for i in range(len(strList)):                                
        if(strList[i] == ' '):                                   
            continue
        letter = strList[i]                                      
        indx = (alphabetList.index(letter) + k) % 26             
        strList[i] = alphabetList[indx]                          
    print("\nEncrypted string is: ",end = "")                     
    print("".join(strList))                                      
    
def ceaserDecrypt():
    str = input("Enter a string: ")                              
    strList = list(str.strip(" "))                              
    k = int(input("Enter a key: "))                              
    alphabetList = list(string.ascii_lowercase)                  
    for i in range(len(strList)):                                
        if(strList[i] == ' '):                                   
            continue
        letter = strList[i]                                      
        indx = (alphabetList.index(letter) - k) % 26             
        strList[i] = alphabetList[indx]                          
    print("\nDecrypted string is: ",end = "")                     
    print("".join(strList))                                      
    
def playfairEncrypt():
    str = input("Enter a string: ")                              
    key = input("Enter the key: ")                               
    key_lst = createKey(key)                                     
    str = str.replace('j','i')                                   
    strList = "".join(str.split())                                
    strList = [i for i in strList]                               
    for i in range(1, len(strList)):                             
        if(strList[i] == strList[i - 1]):                        
            strList.insert(i, 'x')                                

    if(len(strList) % 2 != 0):                                   
        strList.append('x')                                      

    i = 0                                                        

    while(i < len(strList)):                                      
        strList[i] += strList[i+1]                               
        strList.pop(i+1)                                         
        i += 1                                                   
        
    
    for i in range(len(strList)):                                
        r1, c1 = inList(strList[i][0],key_lst)                   
        r2, c2 = inList(strList[i][1],key_lst)                    
        if(r1 == r2):                                                                                   
            strList[i] = key_lst[r1][(c1+1)%len(key_lst[r1])] + key_lst[r2][(c2+1)%len(key_lst[r1])]     
        elif(c1 == c2):                                                                                 
            columnList = [key_lst[i][c1] for i in range(len(key_lst[0]))]                               
            strList[i] = key_lst[(r1+1)%len(columnList)][c1] + key_lst[(r2+1)%len(columnList)][c2]         
        else:                                                                                           
            strList[i] = key_lst[r1][c2] + key_lst[r2][c1]
    print("\nEncrypted string is: ",end="")                                                              
    print(''.join(strList))                                                     
    
def playfairDecrypt():
    str = input("Enter a string: ")                              
    key = input("Enter the key: ")                               
    key_lst = createKey(key)                                     
    str = str.replace('j','i')                                   
    strList = "".join(str.split())                               
    strList = [i for i in strList]                               
    
    i = 0                                                        

    while(i < len(strList)):                                     
        strList[i] += strList[i+1]                               
        strList.pop(i+1)                                         
        i += 1                                                   

    for i in range(len(strList)):                                
        r1, c1 = inList(strList[i][0],key_lst)                   
        r2, c2 = inList(strList[i][1],key_lst)                   
        if(r1 == r2):                                                                                   
            strList[i] = key_lst[r1][(c1-1)%len(key_lst[r1])] + key_lst[r2][(c2-1)%len(key_lst[r1])]   
        elif(c1 == c2):                                                                                
            columnList = [key_lst[i][c1] for i in range(len(key_lst[0]))]                              
            strList[i] = key_lst[(r1-1)%len(columnList)][c1] + key_lst[(r2-1)%len(columnList)][c2]     
        else:                                                                                          
            strList[i] = key_lst[r1][c2] + key_lst[r2][c1]
    print("\nDecrypted string is: ",end="")                                                                     
    print(''.join(strList))                                                                            

def railfenceEncrypt():
    plainText = input("Enter a string: ")
    key = int(input("Enter a key: "))
    cipherText = ' '
    matrix = [['' for i in range(len(plainText))] for j in range(key)]

    direction = False

    r,c = 0, 0
    for i in range(len(plainText)):
        direction = not direction if r == 0 or r == key - 1 else direction
        addValue = 1 if direction == True else -1
        matrix[r][c] = plainText[i]
        c += 1
        r += addValue

    for i in matrix:
        while '' in i:
            i.remove('')
        cipherText += ''.join(map(str, i))

    print("\nEncrypted string is: ",cipherText)

def railfenceDecrypt():
    cipherText = input("Enter a string: ")
    key = int(input("Enter a key: "))
    plainText = ' '
    matrix = [['@' for i in range(len(cipherText))] for j in range(key)]

    direction = False
    r,c = 0, 0
    for i in range(len(cipherText)):
        direction = not direction if r == 0 or r == key - 1 else direction
        addValue = 1 if direction == True else -1
        matrix[r][c] = '+'
        c += 1
        r += addValue
        
    counter = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if(matrix[i][j] == '+'):
                matrix[i][j] = cipherText[counter]
                counter += 1           

    direction = False
    r,c = 0, 0
    for i in range(len(cipherText)):
        direction = not direction if r == 0 or r == key - 1 else direction
        addValue = 1 if direction == True else -1
        plainText += matrix[r][c]
        c += 1
        r += addValue

    print("\nDecrypted string is: ",plainText)

while(True):
    
    print("\n1.Ceaser Cipher (Encrypt)\n2.Ceaser Cipher (Decrypt)\n3.PlayFair Cipher (Encrypt)\n4.PlayFair Cipher (Decrypt)\n5.Rail Fence Cipher (Encrypt)\n6.Rail Fence Cipher (Decrypt)\n7.Exit")
    choice = int(input("\nEnter a choice: "))

    if(choice == 1):
        ceaserEncrypt()
    elif (choice == 2):
        ceaserDecrypt()
    elif (choice == 3):
        playfairEncrypt()
    elif (choice == 4):
        playfairDecrypt()
    elif (choice == 5):
        railfenceEncrypt()
    elif (choice == 6):
        railfenceDecrypt()
    elif (choice == 7):
        sys.exit()
    else:
        print("Invalid choice!")
    

