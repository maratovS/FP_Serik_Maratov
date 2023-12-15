let { Observable } = rxjs;

const observable = new Observable((observer) => {
    let count = 5;
    const interval = setInterval(() => {
      observer.next(count);
      count--;
  
      if (count == 0) {
        clearInterval(interval);
        observer.error('Complete with error');
        observer.complete();
      }
    }, 1000);
  });

const observer = {
    next: (value) => console.log(value),
    error: (error) => alert(error),
    complete: () => console.log('Completed'),
};

let btn2 = document.getElementById("observable_button");

btn2.onclick = function() {
  observable.subscribe(observer);
}