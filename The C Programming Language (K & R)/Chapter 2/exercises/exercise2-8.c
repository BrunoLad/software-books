#include <assert.h>
#include <stdio.h>

/*
 * Exercise 2-8.
 * Write a function rightrot(x,n) that returns the value of the
 * integer x rotated to the right by n positions.
 */

#define NDEBUG

unsigned rightrot(unsigned num, int bits);

int main() {

    int x = 0356;

    printf("%o\n", ~(x | x));
    assert(rightrot(x, 3) == 0335);
    assert(rightrot(x, 8) == 0356);

    return 0;
}

/* rightrot: returns x rotated to the right by n positions  */
unsigned rightrot(unsigned x, int n) {
    assert(n > 0);
    int len = 0;
    int num = x;

    while(num > 0) {
        num = num >> 1; // divides by 2
        len++;
    }

    return (x >> n) | ((x & ~(~0 << n)) << (len - n));
}
