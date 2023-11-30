while(true){
    let input = prompt("Insert word:");
    switch(input) {
        case '':
            alert("insert something")
            break
        default:
            if (input.split("").reverse().join("") == input) {
                alert("palindrome printed")
            } else {
                alert("not a palindrome printed")
            }
            break
    }  
}
