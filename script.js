const display=document.querySelector('.display')
const buttons=document.querySelectorAll('button') 
buttons.forEach((btn)=> {
    btn.addEventListener('click',()=> {
        handlebutton(btn.innerText)
    })
})
let expression=''
function handlebutton(value) {
    if(value=='AC') {
        expression=''
        display.value=''
    } else if(value=='CLR') {
        expression=expression.slice(0,-1)
        display.value=expression
    } else if(value=='=') {
        let result=evaluate(expression)
        display.value=result
        expression=result.toString()
    } else {
        expression+=value
        display.value=expression
    }
}
function tokenize(expr) {
    let tokens=[]
    let number=''
    for(let ch of expr) {
        if((ch>='0' && ch<='9') || ch=='.') {
            number+=ch;
        } else {
            if(number!='') {
                tokens.push(number)
                number=''
            }
            tokens.push(ch)
        }
    }
    if(number!='') tokens.push(number)
        return tokens
}
function processMD(tokens) {
    let i=0
    let newTokens=[]
    while(i<tokens.length) {
        if(tokens[i]=='*') {
            let last=newTokens.pop()
            let next=tokens[i+1]
            newTokens.push((parseFloat(last)*parseFloat(next)).toString())
            i+=2
        } else if(tokens[i]=='/') {
            let last=newTokens.pop()
            let next=tokens[i+1]
            newTokens.push((parseFloat(last)/parseFloat(next)).toString())
            i+=2
        } else {
            newTokens.push(tokens[i])
            i++
        }
    }
    return newTokens
}
function processAS(tokens) {
    let result=parseFloat(tokens[0])
    for(let i=1;i<tokens.length;i+=2) {
        let op=tokens[i]
        let num=parseFloat(tokens[i+1])
        if(op=='+') result+=num
        if(op=='-') result-=num
    }
    return result
}
function evaluate(expr) {
    let tokens=tokenize(expr)
    let ntokens=processMD(tokens)
    let answer=processAS(ntokens)
    return answer
}