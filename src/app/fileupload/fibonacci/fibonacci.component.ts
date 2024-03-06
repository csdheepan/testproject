import { Component } from '@angular/core';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent {


  position !: number;
  fibValue !: number;

  constructor(){}

  
  calculateFibonacci() {
    if (this.position !== undefined && this.position !== null) {
      this.fibValue = this.fibonacci(this.position);
    }
  }

  fibonacci(n: number): number {
    let a = 0, b = 1;
    if (n <= 1) return n;
    for (let i = 2; i <= n; i++) {  // Fibonacci numbers increases linearly with the input size n => o(n)
      let temp = b;
      b = a + b;
      a = temp;
    }
    return b;
  }
}
