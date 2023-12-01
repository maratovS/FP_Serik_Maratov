while(true){
    let input = prompt("Insert word:");
    switch(input) {
        case '':
            alert("insert something")
            break
        default:
            if (input.toUpperCase().split("").reverse().join("") == input.toUpperCase()) {
                alert("palindrome printed")
            } else {
                alert("not a palindrome printed")
            }
            break
    }  
}
