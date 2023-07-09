#include <assert.h>

/*
 * Exercise 2-6.
 * Write a function setbits(x,p,n,y) that returns x with the n bits
 * that begin at position p set to the rightmost n bits of y,
 * leaving the other bits unchanged.
 */

#define NDEBUG

unsigned getbits(unsigned num, int start, int bits);
unsigned setbits(unsigned source, int start, int bits, unsigned destination);

int main() {

    unsigned x = 0362;
    unsigned y = 0342;

    assert(setbits(x, 4, 3, y) ==  0344);

    return 0;
}

/* getbits: get n bits from position p */
unsigned getbits(unsigned x, int p, int n) {
    assert(p > 0);
    assert(x > 0);
    assert(p >= n);

    return (x >> (p + 1 - n)) & ~(~0 << n);
}

/* setbits: sets n bits in y based on bits from x starting from p */
unsigned setbits(unsigned x, int p, int n, unsigned y) {
    assert(p > 0);
    assert(n > 0);

    return getbits(x, p, n) | (y & (~0 << n));
}
