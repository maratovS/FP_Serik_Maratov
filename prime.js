let { range } = rxjs;

function isPrime(num) {
    var sqrtnum=Math.floor(Math.sqrt(num));
    var prime = num != 1;
    for(var i=2; i<sqrtnum+1; i++) {
        if(num % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
  }

function generate() {
    let numbers = range(0, 100)
    let prime_numbers = []

    numbers.subscribe(item => {
        if (isPrime(item)) {
            prime_numbers.push(item)
        }
    });
    return prime_numbers
}

let btn = document.getElementById("thread_button");

btn.onclick = function() {
    console.log(generate()) 
}
  